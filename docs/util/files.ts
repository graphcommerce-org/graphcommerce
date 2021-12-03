import fs from 'fs'
import path from 'path'

export type DirectoryTree = [string, string[]][]

export const getAbsoluteFilePath = (file: string) => path.join(process.cwd(), file)

export const getFilesInDir = (dir: string): string[] => {
  const dirPath = getAbsoluteFilePath(dir)

  if (!fs.existsSync(dirPath)) {
    console.error(`[files.getFilesInDir]: dir "${dirPath}" not found`)
    return []
  }

  const filenames = fs.readdirSync(dirPath)

  return filenames
}

export const getDirectoryTree = (
  directory: string,
  options?: { includeFilesAsKeys: string },
): DirectoryTree => {
  const filenames = getFilesInDir(directory)
  const filteredFilenames = options?.includeFilesAsKeys
    ? filenames
    : filenames.filter((filename: string) => !filename.includes('.'))

  const tree: [string, string[]][] = []

  filteredFilenames.forEach((dirName: string) => {
    const currentDir = path.join(process.cwd(), `${directory}/${dirName}`)
    const files = fs.readdirSync(currentDir)

    const dirContents: [string, string[]] = [
      dirName,
      files.sort((a, b) => a.localeCompare(b, 'nl', { numeric: true })),
    ]
    tree.push(dirContents)
  })

  return tree
}
