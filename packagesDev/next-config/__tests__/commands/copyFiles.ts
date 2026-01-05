// Import after mocks are defined
import fs from 'fs/promises'
import path from 'path'
import fg from 'fast-glob'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { copyFiles } from '../../src/commands/copyFiles'
import { resolveDependenciesSync } from '../../src/utils/resolveDependenciesSync'

// Mock fs/promises
vi.mock('fs/promises', () => ({
  default: {
    readFile: vi.fn(),
    writeFile: vi.fn(),
    mkdir: vi.fn(),
    readdir: vi.fn(),
    stat: vi.fn(),
    unlink: vi.fn(),
    rmdir: vi.fn(),
    rename: vi.fn(),
  },
  readFile: vi.fn(),
  writeFile: vi.fn(),
  mkdir: vi.fn(),
  readdir: vi.fn(),
  stat: vi.fn(),
  unlink: vi.fn(),
  rmdir: vi.fn(),
  rename: vi.fn(),
}))

// Mock fast-glob
vi.mock('fast-glob', () => ({
  __esModule: true,
  default: vi.fn(),
}))

// Mock resolveDependenciesSync
vi.mock('../../src/utils/resolveDependenciesSync', () => ({
  resolveDependenciesSync: vi.fn(),
}))

// Get mocked versions
const mockFs = vi.mocked(fs)
const mockFg = vi.mocked(fg)
const mockResolveDependenciesSync = vi.mocked(resolveDependenciesSync)

// Mock performance.now
const mockPerformanceNow = vi.fn()
global.performance = { now: mockPerformanceNow } as unknown as typeof performance

// Mock process.cwd
const mockCwd = '/mock/cwd'
// eslint-disable-next-line @typescript-eslint/unbound-method
const originalCwd = process.cwd
beforeAll(() => {
  process.cwd = vi.fn().mockReturnValue(mockCwd)
})

afterAll(() => {
  process.cwd = originalCwd
})

describe('copyFiles', () => {
  let consoleLog: ReturnType<typeof vi.spyOn>
  let consoleInfo: ReturnType<typeof vi.spyOn>
  let consoleError: ReturnType<typeof vi.spyOn>
  let processExit: ReturnType<typeof vi.spyOn>
  let originalDebug: string | undefined

  beforeEach(async () => {
    vi.clearAllMocks()
    originalDebug = process.env.DEBUG
    process.env.DEBUG = undefined
    mockResolveDependenciesSync.mockReturnValue(
      new Map([
        ['@graphcommerce/package1', 'packages/package1'],
        ['@graphcommerce/package2', 'packages/package2'],
      ]),
    )
    consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})
    consoleInfo = vi.spyOn(console, 'info').mockImplementation(() => {})
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    processExit = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)

    // Setup default .gitignore mock
    mockFs.readFile.mockImplementation((filePath) => {
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent') as ReturnType<typeof fs.readFile>
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
    mockFg.mockResolvedValue([])

    await copyFiles()

    expect(mockFg).toHaveBeenCalledWith('**/*', {
      cwd: mockCwd,
      dot: true,
      ignore: ['**/dist/**', '**/build/**', '**/.next/**', '**/.git/**', '**/node_modules/**'],
      onlyFiles: true,
    })
  })

  it('should copy files and add management comments', async () => {
    mockFg
      .mockResolvedValueOnce([]) // First scan for existing files
      .mockResolvedValueOnce(['file.ts']) // Second scan for package files
    mockFs.readFile.mockImplementation((filePath) => {
      if (filePath === path.join('packages/package1/copy', 'file.ts')) {
        return Promise.resolve(Buffer.from('content')) as ReturnType<typeof fs.readFile>
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent') as ReturnType<typeof fs.readFile>
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    mockFs.stat.mockResolvedValue({ isDirectory: () => false } as Awaited<
      ReturnType<typeof fs.stat>
    >)

    await copyFiles()

    // Verify file was written with management comments
    const writeCall = mockFs.writeFile.mock.calls.find(
      (call) => call[0] === path.join(mockCwd, 'file.ts'),
    )
    expect(writeCall).toBeTruthy()
    const content = writeCall![1].toString()
    expect(content).toContain('// managed by: graphcommerce')
    expect(content).toContain('// to modify this file, change it to managed by: local')
    expect(content).toContain('content')

    // Verify .gitignore was updated
    const gitignoreCall = mockFs.writeFile.mock.calls.find(
      (call) => call[0] === path.join(mockCwd, '.gitignore'),
    )
    expect(gitignoreCall).toBeTruthy()
    const gitignoreContent = gitignoreCall![1].toString()
    expect(gitignoreContent).toContain('# managed by: graphcommerce')
    expect(gitignoreContent).toContain('file.ts')
    expect(gitignoreContent).toContain('# end managed by: graphcommerce')
  })

  it('should handle existing managed files with identical content', async () => {
    mockFg
      .mockResolvedValueOnce([]) // First scan for existing files
      .mockResolvedValueOnce(['file.ts']) // Second scan for package files

    const sourceContent = Buffer.from('content')
    const managedContent = Buffer.concat([
      Buffer.from(
        '// managed by: graphcommerce\n// to modify this file, change it to managed by: local\n\n',
      ),
      sourceContent,
    ])

    mockFs.readFile.mockImplementation((filePath) => {
      if (filePath === path.join('packages/package1/copy', 'file.ts')) {
        return Promise.resolve(sourceContent) as ReturnType<typeof fs.readFile>
      }
      if (filePath === path.join(mockCwd, 'file.ts')) {
        return Promise.resolve(managedContent) as ReturnType<typeof fs.readFile>
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent') as ReturnType<typeof fs.readFile>
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    await copyFiles()

    // Should not write to the file since content is identical
    expect(mockFs.writeFile).toHaveBeenCalledTimes(1) // Only .gitignore should be written
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      path.join(mockCwd, '.gitignore'),
      expect.any(String),
    )
  })

  it('should update existing managed files with different content', async () => {
    mockFg
      .mockResolvedValueOnce([]) // First scan for existing files
      .mockResolvedValueOnce(['file.ts']) // Second scan for package files

    const sourceContent = Buffer.from('new content')
    const oldContent = Buffer.concat([
      Buffer.from(
        '// managed by: graphcommerce\n// to modify this file, change it to managed by: local\n\n',
      ),
      Buffer.from('old content'),
    ])

    mockFs.readFile.mockImplementation((filePath) => {
      if (filePath === path.join('packages/package1/copy', 'file.ts')) {
        return Promise.resolve(sourceContent) as ReturnType<typeof fs.readFile>
      }
      if (filePath === path.join(mockCwd, 'file.ts')) {
        return Promise.resolve(oldContent) as ReturnType<typeof fs.readFile>
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent') as ReturnType<typeof fs.readFile>
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    await copyFiles()

    // Should write the new content
    const writeCall = mockFs.writeFile.mock.calls.find(
      (call) => call[0] === path.join(mockCwd, 'file.ts'),
    )
    expect(writeCall).toBeTruthy()
    const content = writeCall![1].toString()
    expect(content).toContain('new content')
    expect(consoleInfo).toHaveBeenCalledWith('Updated managed file: file.ts')
  })

  it('should create new files with management comments', async () => {
    mockFg
      .mockResolvedValueOnce([]) // First scan for existing files
      .mockResolvedValueOnce(['new-file.ts']) // Second scan for package files
    mockFs.readFile.mockImplementation((filePath) => {
      if (filePath === path.join('packages/package1/copy', 'new-file.ts')) {
        return Promise.resolve(Buffer.from('content')) as ReturnType<typeof fs.readFile>
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent') as ReturnType<typeof fs.readFile>
      }
      if (filePath === path.join(mockCwd, 'new-file.ts')) {
        return Promise.reject(new Error('ENOENT: no such file or directory'))
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    await copyFiles()

    expect(consoleInfo).toHaveBeenCalledWith(
      'Creating new file: new-file.ts\nSource: packages/package1/copy/new-file.ts',
    )
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      path.join(mockCwd, 'new-file.ts'),
      expect.any(Buffer),
    )
  })

  it('should handle locally managed files', async () => {
    mockFg
      .mockResolvedValueOnce([]) // First scan for existing files
      .mockResolvedValueOnce(['file.ts']) // Second scan for package files
    mockFs.readFile.mockImplementation((filePath) => {
      if (filePath === path.join('packages/package1/copy', 'file.ts')) {
        return Promise.resolve(Buffer.from('content')) as ReturnType<typeof fs.readFile>
      }
      if (filePath === path.join(mockCwd, 'file.ts')) {
        return Promise.resolve(Buffer.from('// managed by: local\ncontent')) as ReturnType<
          typeof fs.readFile
        >
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent') as ReturnType<typeof fs.readFile>
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    await copyFiles()

    // Should not overwrite locally managed files
    expect(mockFs.writeFile).toHaveBeenCalledTimes(1) // Only .gitignore should be written
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      path.join(mockCwd, '.gitignore'),
      expect.any(String),
    )
  })

  it('should create destination directory if it does not exist', async () => {
    mockFg
      .mockResolvedValueOnce([]) // First scan for existing files
      .mockResolvedValueOnce(['nested/file.ts']) // Second scan for package files
    mockFs.readFile.mockImplementation((filePath) => {
      if (filePath === path.join('packages/package1/copy', 'nested/file.ts')) {
        return Promise.resolve(Buffer.from('content')) as ReturnType<typeof fs.readFile>
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent') as ReturnType<typeof fs.readFile>
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    mockFs.mkdir.mockResolvedValue(undefined)

    await copyFiles()

    expect(mockFs.mkdir).toHaveBeenCalledWith(path.join(mockCwd, 'nested'), { recursive: true })
  })

  it('should handle errors gracefully', async () => {
    mockFg
      .mockResolvedValueOnce([]) // First scan for existing files
      .mockResolvedValueOnce(['file.ts']) // Second scan for package files
    mockFs.readFile.mockImplementation((filePath) => {
      if (filePath === path.join('packages/package1/copy', 'file.ts')) {
        return Promise.reject(new Error('Read error'))
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent') as ReturnType<typeof fs.readFile>
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
    mockFg
      .mockResolvedValueOnce([]) // First scan for existing files
      .mockResolvedValueOnce(['conflict.ts']) // Package 1 files
      .mockResolvedValueOnce(['conflict.ts']) // Package 2 files

    await copyFiles()

    expect(consoleError).toHaveBeenCalledWith(
      expect.stringContaining("Error: File conflict detected for 'conflict.ts'"),
    )
    expect(processExit).toHaveBeenCalledWith(1)
  })

  it('should remove files that are no longer provided', async () => {
    mockFg
      .mockResolvedValueOnce(['old-file.ts']) // First scan finds existing managed file
      .mockResolvedValueOnce([]) // Second scan finds no files in packages

    // Mock existing managed file
    mockFs.readFile.mockImplementation((filePath) => {
      if (filePath === path.join(mockCwd, 'old-file.ts')) {
        return Promise.resolve(Buffer.from('// managed by: graphcommerce\ncontent')) as ReturnType<
          typeof fs.readFile
        >
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent') as ReturnType<typeof fs.readFile>
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    // Mock directory checks
    mockFs.readdir.mockImplementation((dirPath) => {
      if (dirPath === mockCwd) {
        return Promise.resolve(['old-file.ts']) as ReturnType<typeof fs.readdir>
      }
      return Promise.resolve([]) as ReturnType<typeof fs.readdir>
    })

    await copyFiles()

    // Verify file was removed
    expect(mockFs.unlink).toHaveBeenCalledWith(path.join(mockCwd, 'old-file.ts'))

    // Verify directory was checked
    expect(mockFs.readdir).toHaveBeenCalledWith(mockCwd)

    // Verify .gitignore was updated
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      path.join(mockCwd, '.gitignore'),
      expect.stringContaining('existing\ngitignore\ncontent'),
    )
  })

  it('should handle debug mode', async () => {
    process.env.DEBUG = 'true'
    mockFg
      .mockResolvedValueOnce([]) // First scan for existing files
      .mockResolvedValueOnce(['file.ts']) // Second scan for package files
    mockFs.readFile.mockImplementation((filePath) => {
      if (filePath === path.join('packages/package1/copy', 'file.ts')) {
        return Promise.resolve(Buffer.from('content')) as ReturnType<typeof fs.readFile>
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent') as ReturnType<typeof fs.readFile>
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    await copyFiles()

    expect(consoleInfo).toHaveBeenCalledWith('[copy-files]', 'Starting copyFiles')
    expect(consoleInfo).toHaveBeenCalledWith('[copy-files]', expect.stringContaining('Found'))
  })

  it('should handle unmanaged files', async () => {
    mockFg
      .mockResolvedValueOnce([]) // First scan for existing files
      .mockResolvedValueOnce(['file.ts']) // Second scan for package files
    mockFs.readFile.mockImplementation((filePath) => {
      if (filePath === path.join('packages/package1/copy', 'file.ts')) {
        return Promise.resolve(Buffer.from('content')) as ReturnType<typeof fs.readFile>
      }
      if (filePath === path.join(mockCwd, 'file.ts')) {
        return Promise.resolve(Buffer.from('unmanaged content')) as ReturnType<typeof fs.readFile>
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent') as ReturnType<typeof fs.readFile>
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })
    mockFs.rename.mockResolvedValue(undefined)

    await copyFiles()

    // Unmanaged files should be renamed to .original and a new managed file created
    expect(mockFs.rename).toHaveBeenCalledWith(
      path.join(mockCwd, 'file.ts'),
      path.join(mockCwd, 'file.original.ts'),
    )
    expect(consoleInfo).toHaveBeenCalledWith(
      expect.stringContaining('Renamed existing file to: file.original.ts'),
    )
  })

  it('should cleanup nested empty directories', async () => {
    mockFg
      .mockResolvedValueOnce(['nested/deeply/file.ts']) // First scan finds existing managed file
      .mockResolvedValueOnce([]) // Second scan finds no files in packages

    // Mock existing managed file
    mockFs.readFile.mockImplementation((filePath) => {
      if (filePath === path.join(mockCwd, 'nested/deeply/file.ts')) {
        return Promise.resolve(Buffer.from('// managed by: graphcommerce\ncontent')) as ReturnType<
          typeof fs.readFile
        >
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent') as ReturnType<typeof fs.readFile>
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    // Mock directory checks to simulate empty directories
    mockFs.readdir.mockReturnValue(Promise.resolve([]) as ReturnType<typeof fs.readdir>)

    await copyFiles()

    // Verify file was removed
    expect(mockFs.unlink).toHaveBeenCalledWith(path.join(mockCwd, 'nested/deeply/file.ts'))

    // Verify directories were checked and removed in the correct order
    const readdirCalls = mockFs.readdir.mock.calls.map((call) => call[0])
    const rmdirCalls = mockFs.rmdir.mock.calls.map((call) => call[0])

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
    mockFg
      .mockResolvedValueOnce(['nested/remove.ts']) // First scan finds existing managed file
      .mockResolvedValueOnce([]) // Second scan finds no files in packages

    // Mock existing managed file
    mockFs.readFile.mockImplementation((filePath) => {
      if (filePath === path.join(mockCwd, 'nested/remove.ts')) {
        return Promise.resolve(
          Buffer.from('// managed by: graphcommerce\nremove content'),
        ) as ReturnType<typeof fs.readFile>
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent') as ReturnType<typeof fs.readFile>
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    // Mock directory check to show directory is not empty
    mockFs.readdir.mockReturnValue(
      Promise.resolve(['other-file.ts']) as ReturnType<typeof fs.readdir>,
    )

    await copyFiles()

    // Verify file removal
    expect(mockFs.unlink).toHaveBeenCalledTimes(1)
    expect(mockFs.unlink).toHaveBeenCalledWith(path.join(mockCwd, 'nested/remove.ts'))

    // Verify directory was checked but not removed (since it's not empty)
    expect(mockFs.readdir).toHaveBeenCalledWith(path.join(mockCwd, 'nested'))
    expect(mockFs.rmdir).not.toHaveBeenCalled()
  })

  it('should handle directory removal errors gracefully', async () => {
    mockFg
      .mockResolvedValueOnce(['nested/file.ts']) // First scan finds existing managed file
      .mockResolvedValueOnce([]) // Second scan finds no files in packages

    // Mock existing managed file
    mockFs.readFile.mockImplementation((filePath) => {
      if (filePath === path.join(mockCwd, 'nested/file.ts')) {
        return Promise.resolve(Buffer.from('// managed by: graphcommerce\ncontent')) as ReturnType<
          typeof fs.readFile
        >
      }
      if (filePath === path.join(mockCwd, '.gitignore')) {
        return Promise.resolve('existing\ngitignore\ncontent') as ReturnType<typeof fs.readFile>
      }
      return Promise.reject(new Error(`ENOENT: no such file or directory, open '${filePath}'`))
    })

    // Mock directory is empty but removal fails with EACCES
    mockFs.readdir.mockReturnValue(Promise.resolve([]) as ReturnType<typeof fs.readdir>)
    mockFs.rmdir.mockImplementation(() => {
      const error = new Error('EACCES: permission denied') as NodeJS.ErrnoException
      error.code = 'EACCES'
      return Promise.reject(error)
    })

    await copyFiles()

    // Verify file removal still succeeded
    expect(mockFs.unlink).toHaveBeenCalledWith(path.join(mockCwd, 'nested/file.ts'))

    // Verify error was logged but didn't crash the process
    expect(consoleError).toHaveBeenCalledWith(
      expect.stringContaining('Error cleaning up directory'),
    )
    expect(processExit).toHaveBeenCalledWith(1)
  })
})
