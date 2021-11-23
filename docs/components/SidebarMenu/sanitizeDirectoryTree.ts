import { DirectoryTree } from '../../util/files'

export type FileNameUrlKeyPair = {
  name: string
  urlKey: string
}

export function sanitizeFileName(filename: string) {
  const nameParts = filename.split('-')

  return {
    order: nameParts.shift(),
    name: nameParts.join(' '),
  }
}

export function sanitizeDirectoryTree(menuData: DirectoryTree): [string, FileNameUrlKeyPair[]][] {
  return menuData.map(([dirName, filenames]: [string, string[]]) => {
    const { order: dirNameOrder, name: dirNameSanitized } = sanitizeFileName(dirName)

    return [
      `${dirNameOrder}. ${dirNameSanitized}`,
      filenames.map((filename) => {
        const filenameNoExt = filename.split('.')[0]
        const { name: fileNameSanitized } = sanitizeFileName(filenameNoExt)
        const dirNameParts = dirName.split('-')
        const fileNameParts = filenameNoExt.split('-')

        return {
          name: fileNameSanitized,
          urlKey: `${dirNameParts.shift()}-${fileNameParts.shift()}/${dirNameParts.join(
            '-',
          )}/${fileNameParts.join('-')}`,
        }
      }),
    ]
  })
}
