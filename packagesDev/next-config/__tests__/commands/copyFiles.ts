import fs from 'fs/promises'
import path from 'path'
import { copyFiles } from '../../src/commands/copyFiles'
import { resolveDependenciesSync } from '../../src/utils/resolveDependenciesSync'

// Mock fs/promises
jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  mkdir: jest.fn(),
  readdir: jest.fn(),
  stat: jest.fn(),
  unlink: jest.fn(),
  rmdir: jest.fn(),
}))

// Mock fast-glob
jest.mock('fast-glob', () => ({
  __esModule: true,
  default: jest.fn(),
}))

// Mock resolveDependenciesSync
jest.mock('../../src/utils/resolveDependenciesSync', () => ({
  resolveDependenciesSync: jest.fn(),
}))

// Mock performance.now
const mockPerformanceNow = jest.fn()
global.performance = { now: mockPerformanceNow } as unknown as typeof performance

// Mock process.cwd
const mockCwd = '/mock/cwd'
const originalCwd = process.cwd
beforeAll(() => {
  process.cwd = jest.fn().mockReturnValue(mockCwd)
})

afterAll(() => {
  process.cwd = originalCwd
})

describe('copyFiles', () => {
  let consoleLog: jest.SpyInstance
  let consoleError: jest.SpyInstance
  let processExit: jest.SpyInstance
  let originalDebug: string | undefined

  beforeEach(() => {
    jest.clearAllMocks()
    originalDebug = process.env.DEBUG
    process.env.DEBUG = undefined
    ;(resolveDependenciesSync as jest.Mock).mockReturnValue(
      new Map([
        ['@graphcommerce/package1', 'packages/package1'],
        ['@graphcommerce/package2', 'packages/package2'],
      ]),
    )
    consoleLog = jest.spyOn(console, 'log').mockImplementation(() => {})
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    processExit = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never)

    // Setup default .gitignore mock
    ;(fs.readFile as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent')
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    // Setup performance.now mock
    let time = 0
    mockPerformanceNow.mockImplementation(() => {
      time += 50 // Increment by 50ms each call
      return time
    })
  })

  afterEach(() => {
    process.env.DEBUG = originalDebug
    consoleLog.mockRestore()
    consoleError.mockRestore()
    processExit.mockRestore()
  })

  it('should handle empty source directories', async () => {
    const fg = jest.requireMock('fast-glob').default as jest.Mock
    fg.mockResolvedValue([])

    await copyFiles()

    expect(fg).toHaveBeenCalledWith('**/*', {
      cwd: mockCwd,
      dot: true,
      ignore: ['**/dist/**', '**/build/**', '**/.next/**', '**/.git/**', '**/node_modules/**'],
      onlyFiles: true,
    })
  })

  it('should copy files and add management comments', async () => {
    const fg = jest.requireMock('fast-glob').default as jest.Mock
    fg.mockResolvedValueOnce([]) // First scan for existing files
      .mockResolvedValueOnce(['file.ts']) // Second scan for package files
    ;(fs.readFile as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath === path.join('packages/package1/copy', 'file.ts')) {
        return Promise.resolve(Buffer.from('content'))
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent')
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    const mockStat = fs.stat as jest.Mock
    mockStat.mockResolvedValue({ isDirectory: () => false })

    await copyFiles()

    // Verify file was written with management comments
    const writeCall = (fs.writeFile as jest.Mock).mock.calls.find(
      (call) => call[0] === path.join(mockCwd, 'file.ts'),
    )
    expect(writeCall).toBeTruthy()
    const content = writeCall[1].toString()
    expect(content).toContain('// managed by: graphcommerce')
    expect(content).toContain('// to modify this file, change it to managed by: local')
    expect(content).toContain('content')

    // Verify .gitignore was updated
    const gitignoreCall = (fs.writeFile as jest.Mock).mock.calls.find(
      (call) => call[0] === path.join(mockCwd, '.gitignore'),
    )
    expect(gitignoreCall).toBeTruthy()
    const gitignoreContent = gitignoreCall[1].toString()
    expect(gitignoreContent).toContain('# managed by: graphcommerce')
    expect(gitignoreContent).toContain('file.ts')
    expect(gitignoreContent).toContain('# end managed by: graphcommerce')
  })

  it('should handle existing managed files with identical content', async () => {
    const fg = jest.requireMock('fast-glob').default as jest.Mock
    fg.mockResolvedValueOnce([]) // First scan for existing files
      .mockResolvedValueOnce(['file.ts']) // Second scan for package files

    const sourceContent = Buffer.from('content')
    const managedContent = Buffer.concat([
      Buffer.from(
        '// managed by: graphcommerce\n// to modify this file, change it to managed by: local\n\n',
      ),
      sourceContent,
    ])

    ;(fs.readFile as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath === path.join('packages/package1/copy', 'file.ts')) {
        return Promise.resolve(sourceContent)
      }
      if (filePath === path.join(mockCwd, 'file.ts')) {
        return Promise.resolve(managedContent)
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent')
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    await copyFiles()

    // Should not write to the file since content is identical
    expect(fs.writeFile).toHaveBeenCalledTimes(1) // Only .gitignore should be written
    expect(fs.writeFile).toHaveBeenCalledWith(path.join(mockCwd, '.gitignore'), expect.any(String))
  })

  it('should update existing managed files with different content', async () => {
    const fg = jest.requireMock('fast-glob').default as jest.Mock
    fg.mockResolvedValueOnce([]) // First scan for existing files
      .mockResolvedValueOnce(['file.ts']) // Second scan for package files

    const sourceContent = Buffer.from('new content')
    const oldContent = Buffer.concat([
      Buffer.from(
        '// managed by: graphcommerce\n// to modify this file, change it to managed by: local\n\n',
      ),
      Buffer.from('old content'),
    ])

    ;(fs.readFile as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath === path.join('packages/package1/copy', 'file.ts')) {
        return Promise.resolve(sourceContent)
      }
      if (filePath === path.join(mockCwd, 'file.ts')) {
        return Promise.resolve(oldContent)
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent')
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    await copyFiles()

    // Should write the new content
    const writeCall = (fs.writeFile as jest.Mock).mock.calls.find(
      (call) => call[0] === path.join(mockCwd, 'file.ts'),
    )
    expect(writeCall).toBeTruthy()
    const content = writeCall[1].toString()
    expect(content).toContain('new content')
    expect(consoleLog).toHaveBeenCalledWith('Updated managed file: file.ts')
  })

  it('should create new files with management comments', async () => {
    const fg = jest.requireMock('fast-glob').default as jest.Mock
    fg.mockResolvedValueOnce([]) // First scan for existing files
      .mockResolvedValueOnce(['new-file.ts']) // Second scan for package files
    ;(fs.readFile as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath === path.join('packages/package1/copy', 'new-file.ts')) {
        return Promise.resolve(Buffer.from('content'))
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent')
      }
      if (filePath === path.join(mockCwd, 'new-file.ts')) {
        return Promise.reject(new Error('ENOENT: no such file or directory'))
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    await copyFiles()

    expect(consoleLog).toHaveBeenCalledWith(
      'Creating new file: new-file.ts\nSource: packages/package1/copy/new-file.ts',
    )
    expect(fs.writeFile).toHaveBeenCalledWith(path.join(mockCwd, 'new-file.ts'), expect.any(Buffer))
  })

  it('should handle locally managed files', async () => {
    const fg = jest.requireMock('fast-glob').default as jest.Mock
    fg.mockResolvedValueOnce([]) // First scan for existing files
      .mockResolvedValueOnce(['file.ts']) // Second scan for package files
    ;(fs.readFile as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath === path.join('packages/package1/copy', 'file.ts')) {
        return Promise.resolve(Buffer.from('content'))
      }
      if (filePath === path.join(mockCwd, 'file.ts')) {
        return Promise.resolve(Buffer.from('// managed by: local\ncontent'))
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent')
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    await copyFiles()

    // Should not overwrite locally managed files
    expect(fs.writeFile).toHaveBeenCalledTimes(1) // Only .gitignore should be written
    expect(fs.writeFile).toHaveBeenCalledWith(path.join(mockCwd, '.gitignore'), expect.any(String))
  })

  it('should create destination directory if it does not exist', async () => {
    const fg = jest.requireMock('fast-glob').default as jest.Mock
    fg.mockResolvedValueOnce([]) // First scan for existing files
      .mockResolvedValueOnce(['nested/file.ts']) // Second scan for package files
    ;(fs.readFile as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath === path.join('packages/package1/copy', 'nested/file.ts')) {
        return Promise.resolve(Buffer.from('content'))
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent')
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    const mockMkdir = fs.mkdir as jest.Mock
    mockMkdir.mockResolvedValue(undefined)

    await copyFiles()

    expect(mockMkdir).toHaveBeenCalledWith(path.join(mockCwd, 'nested'), { recursive: true })
  })

  it('should handle errors gracefully', async () => {
    const fg = jest.requireMock('fast-glob').default as jest.Mock
    fg.mockResolvedValueOnce([]) // First scan for existing files
      .mockResolvedValueOnce(['file.ts']) // Second scan for package files
    ;(fs.readFile as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath === path.join('packages/package1/copy', 'file.ts')) {
        return Promise.reject(new Error('Read error'))
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent')
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    await copyFiles()

    expect(consoleError).toHaveBeenCalledWith(
      expect.stringContaining(
        'Error copying file file.ts: Read error\nSource: packages/package1/copy/file.ts',
      ),
    )
    expect(processExit).toHaveBeenCalledWith(1)
  })

  it('should detect file conflicts between packages', async () => {
    const fg = jest.requireMock('fast-glob').default as jest.Mock
    fg.mockResolvedValueOnce([]) // First scan for existing files
      .mockResolvedValueOnce(['conflict.ts']) // Package 1 files
      .mockResolvedValueOnce(['conflict.ts']) // Package 2 files

    await copyFiles()

    expect(consoleError).toHaveBeenCalledWith(
      expect.stringContaining("Error: File conflict detected for 'conflict.ts'"),
    )
    expect(processExit).toHaveBeenCalledWith(1)
  })

  it('should remove files that are no longer provided', async () => {
    const fg = jest.requireMock('fast-glob').default as jest.Mock
    fg.mockResolvedValueOnce(['old-file.ts']) // First scan finds existing managed file
      .mockResolvedValueOnce([]) // Second scan finds no files in packages

    // Mock existing managed file
    ;(fs.readFile as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath === path.join(mockCwd, 'old-file.ts')) {
        return Promise.resolve(Buffer.from('// managed by: graphcommerce\ncontent'))
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent')
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    // Mock directory checks
    const mockReaddir = fs.readdir as jest.Mock
    mockReaddir.mockImplementation((dirPath: string) => {
      if (dirPath === mockCwd) {
        return Promise.resolve(['old-file.ts'])
      }
      return Promise.resolve([])
    })

    await copyFiles()

    // Verify file was removed
    expect(fs.unlink).toHaveBeenCalledWith(path.join(mockCwd, 'old-file.ts'))

    // Verify directory was checked
    expect(mockReaddir).toHaveBeenCalledWith(mockCwd)

    // Verify .gitignore was updated
    expect(fs.writeFile).toHaveBeenCalledWith(
      path.join(mockCwd, '.gitignore'),
      expect.stringContaining('existing\ngitignore\ncontent'),
    )
  })

  it('should handle debug mode', async () => {
    process.env.DEBUG = 'true'
    const fg = jest.requireMock('fast-glob').default as jest.Mock
    fg.mockResolvedValueOnce([]) // First scan for existing files
      .mockResolvedValueOnce(['file.ts']) // Second scan for package files
    ;(fs.readFile as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath === path.join('packages/package1/copy', 'file.ts')) {
        return Promise.resolve(Buffer.from('content'))
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent')
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    await copyFiles()

    expect(consoleLog).toHaveBeenCalledWith('[copy-files]', 'Starting copyFiles')
    expect(consoleLog).toHaveBeenCalledWith('[copy-files]', expect.stringContaining('Found'))
  })

  it('should handle unmanaged files', async () => {
    const fg = jest.requireMock('fast-glob').default as jest.Mock
    fg.mockResolvedValueOnce([]) // First scan for existing files
      .mockResolvedValueOnce(['file.ts']) // Second scan for package files
    ;(fs.readFile as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath === path.join('packages/package1/copy', 'file.ts')) {
        return Promise.resolve(Buffer.from('content'))
      }
      if (filePath === path.join(mockCwd, 'file.ts')) {
        return Promise.resolve(Buffer.from('unmanaged content'))
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent')
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    await copyFiles()

    expect(consoleLog).toHaveBeenCalledWith(
      expect.stringContaining('Note: File file.ts has been modified'),
    )
  })

  it('should cleanup nested empty directories', async () => {
    const fg = jest.requireMock('fast-glob').default as jest.Mock
    fg.mockResolvedValueOnce(['nested/deeply/file.ts']) // First scan finds existing managed file
      .mockResolvedValueOnce([]) // Second scan finds no files in packages

    // Mock existing managed file
    ;(fs.readFile as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath === path.join(mockCwd, 'nested/deeply/file.ts')) {
        return Promise.resolve(Buffer.from('// managed by: graphcommerce\ncontent'))
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent')
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    // Mock directory checks to simulate empty directories
    ;(fs.readdir as jest.Mock).mockReturnValue(Promise.resolve([]))

    await copyFiles()

    // Verify file was removed
    expect(fs.unlink).toHaveBeenCalledWith(path.join(mockCwd, 'nested/deeply/file.ts'))

    // Verify directories were checked and removed in the correct order
    const readdirCalls = (fs.readdir as jest.Mock).mock.calls.map((call) => call[0])
    const rmdirCalls = (fs.rmdir as jest.Mock).mock.calls.map((call) => call[0])

    // Both directories should have been checked
    expect(readdirCalls).toContain(path.join(mockCwd, 'nested/deeply'))
    expect(readdirCalls).toContain(path.join(mockCwd, 'nested'))

    // Both directories should have been removed
    expect(rmdirCalls).toContain(path.join(mockCwd, 'nested/deeply'))
    expect(rmdirCalls).toContain(path.join(mockCwd, 'nested'))

    // Verify the order: deeply should be processed before nested
    const deeplyReadIndex = readdirCalls.indexOf(path.join(mockCwd, 'nested/deeply'))
    const nestedReadIndex = readdirCalls.indexOf(path.join(mockCwd, 'nested'))
    expect(deeplyReadIndex).toBeLessThan(nestedReadIndex)
  })

  it('should handle partial directory cleanup', async () => {
    const fg = jest.requireMock('fast-glob').default as jest.Mock
    fg.mockResolvedValueOnce(['nested/remove.ts']) // First scan finds existing managed file
      .mockResolvedValueOnce([]) // Second scan finds no files in packages

    // Mock existing managed file
    ;(fs.readFile as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath === path.join(mockCwd, 'nested/remove.ts')) {
        return Promise.resolve(Buffer.from('// managed by: graphcommerce\nremove content'))
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent')
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    // Mock directory check to show directory is not empty
    ;(fs.readdir as jest.Mock).mockReturnValue(Promise.resolve(['other-file.ts']))

    await copyFiles()

    // Verify file removal
    expect(fs.unlink).toHaveBeenCalledTimes(1)
    expect(fs.unlink).toHaveBeenCalledWith(path.join(mockCwd, 'nested/remove.ts'))

    // Verify directory was checked but not removed (since it's not empty)
    expect(fs.readdir).toHaveBeenCalledWith(path.join(mockCwd, 'nested'))
    expect(fs.rmdir).not.toHaveBeenCalled()
  })

  it('should handle directory removal errors gracefully', async () => {
    const fg = jest.requireMock('fast-glob').default as jest.Mock
    fg.mockResolvedValueOnce(['nested/file.ts']) // First scan finds existing managed file
      .mockResolvedValueOnce([]) // Second scan finds no files in packages

    // Mock existing managed file
    ;(fs.readFile as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath === path.join(mockCwd, 'nested/file.ts')) {
        return Promise.resolve(Buffer.from('// managed by: graphcommerce\ncontent'))
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent')
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    // Mock directory is empty but removal fails with EACCES
    ;(fs.readdir as jest.Mock).mockReturnValue(Promise.resolve([]))
    ;(fs.rmdir as jest.Mock).mockImplementation(() => {
      const error = new Error('EACCES: permission denied') as NodeJS.ErrnoException
      error.code = 'EACCES'
      return Promise.reject(error)
    })

    await copyFiles()

    // Verify file removal still succeeded
    expect(fs.unlink).toHaveBeenCalledWith(path.join(mockCwd, 'nested/file.ts'))

    // Verify error was logged but didn't crash the process
    expect(consoleError).toHaveBeenCalledWith(
      expect.stringContaining('Error cleaning up directory'),
    )
    expect(processExit).toHaveBeenCalledWith(1)
  })
})
