import { DirectoryTree } from '../../util/files'

export type FileNameUrlKeyPair = {
  name: string
  urlKey: string
}

export default function sanitizeDirectoryTree(
  menuData: DirectoryTree,
): [string, FileNameUrlKeyPair[]][] {
  return menuData.map(([dirName, filenames]: [string, string[]]) => {
    const dirNameParts = dirName.split('-')
    const chapter = dirNameParts.shift()

    return [
      `${chapter}. ${dirNameParts.join(' ')}`,
      filenames.map((filename) => {
        const filenameNoExt = filename.split('.')[0]
        return {
          name: filenameNoExt.split('-').join(' '),
          urlKey: `${dirName}/${filenameNoExt}`,
        }
      }),
    ]
  })
}
