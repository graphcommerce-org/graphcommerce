import fs from 'fs'
import path from 'path'
import { toVFile as vfile } from 'to-vfile'
import { matter } from 'vfile-matter'

type MatterFields = {
  menu?: string
  order?: string[]
}

type BaseFields = {
  type: 'folder' | 'file'
  path: string
  name: string
  childNodes?: FileOrFolderNode[]
  matter?: MatterFields
}

export type FolderNode = BaseFields & { type?: 'folder' }
export type FileNode = BaseFields & { type?: 'file'; url: string; matter: MatterFields }

export type FileOrFolderNode = FolderNode | FileNode

async function dirTree(dir: string, root: string): Promise<FileOrFolderNode> {
  const stats = await fs.promises.lstat(dir)

  let name = path.basename(dir)
  name = name.replace('.mdx', '')
  name = name.replace('.md', '')

  const filePath = path.relative(root, dir)

  const info: Partial<FileOrFolderNode> = { path: filePath, name }

  if (stats.isDirectory()) {
    info.type = 'folder'
    info.childNodes = await Promise.all(
      (await fs.promises.readdir(dir)).map((child) => dirTree(`${dir}/${child}`, root)),
    )
  } else {
    info.type = 'file'
  }

  if (info.type === 'file') {
    let url = path.relative(root, dir)
    url = url.replace('.mdx', '')
    url = url.replace('.md', '')
    url = url.endsWith('/') ? url.slice(0, -1) : url

    info.url = url
    info.matter = matter(await vfile.read(dir)).data.matter as Record<string, string>
  }

  return info as FileOrFolderNode
}

// Replace the path of the parent with the path of the child having index.mdx as name and remove from children.
// Do this recursively for each child.
// Remove type from tree
function hoistIndex(tree: FileOrFolderNode): FileOrFolderNode {
  let newTree: FileOrFolderNode = tree

  if (newTree.type === 'folder') {
    const index = newTree.childNodes?.find(
      (child) =>
        child.path.endsWith('index.mdx') ||
        (child.path.endsWith('index.md') && child.type === 'file'),
    ) as FileNode | undefined

    if (index) {
      newTree = { ...index, url: index.url.slice(0, -6) }
      newTree.childNodes = tree.childNodes?.filter((child) => child !== index)

      const order = index.matter?.order
      if (order) {
        newTree.childNodes = newTree.childNodes?.sort((a, b) =>
          order.indexOf(a.name) === -1 ? 1 : order.indexOf(a.name) - order.indexOf(b.name),
        )
      }

      newTree.childNodes = newTree.childNodes?.map((child) => hoistIndex(child))
    }
  }
  return newTree
}

export async function getDirectoryTree(dir: string): Promise<false | FileOrFolderNode> {
  const absDir = path.join(process.cwd(), dir)

  const tree = await dirTree(absDir, absDir)

  return hoistIndex(tree)
}

export async function getDirectoryPaths(dir: string) {
  const menuData = await getDirectoryTree(dir)

  const paths: string[] = []
  const addPathsFromTree = (tree: FileOrFolderNode) => {
    paths.push(tree.path)
    if (tree.childNodes?.length) {
      tree.childNodes.forEach((child) => addPathsFromTree(child))
    }
  }
  if (menuData) addPathsFromTree(menuData)

  return paths
}

/**
 * Recursively traverse the tree and return the aggregated path of of each node.
 *
 * Each URL segment should reference a path (except for the index.md/index.mdx file)
 */
export function urlToPath(url: string[], node: FileOrFolderNode): string | false {
  if (node.childNodes?.length) {
    const child = node.childNodes?.reduce<string | false>((prev, curr) => {
      if (prev) return prev
      const childPath = urlToPath(url, curr)
      return childPath ?? prev
    }, false)

    if (child) return child
  }

  if (node.type === 'file' && node.url === url.join('/')) return node.path

  return false
}

/** Get the contens of the requested file. */
export function getFileContents(dir: string, filePath: string) {
  const absDir = path.join(process.cwd(), dir, filePath)
  try {
    return fs.promises.readFile(absDir, 'utf8')
  } catch (e) {
    return false
  }
}
