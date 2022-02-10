import fs from 'fs'
import path from 'path'

type FolderType = { type?: 'file' | 'folder' }
type Fields = { path: string; name: string }
type FileTree = FolderType & Fields & { children?: FileTree[] }

export type ContentTree = Fields & { children?: ContentTree[] }

async function dirTree(dir: string, clean: (path: string) => string): Promise<FileTree> {
  const stats = await fs.promises.lstat(dir)
  const info: Partial<FileTree> = {
    path: clean(dir),
    name: path.basename(dir),
  }

  if (stats.isDirectory()) {
    info.type = 'folder'
    info.children = await Promise.all(
      (await fs.promises.readdir(dir)).map((child) => dirTree(`${dir}/${child}`, clean)),
    )
  } else {
    info.type = 'file'
  }

  return info as FileTree
}

// Replace the path of the parent with the path of the child having index.mdx as name and remove from children.
// Do this recursively for each child.
// Remove type from tree
function hoistIndex(tree: FileTree): false | ContentTree {
  if (tree.type === 'folder') {
    const index = tree.children?.find((child) => child.name === 'index.mdx')
    if (index) {
      tree.path = index.path
      tree.children = tree.children?.filter((child) => child !== index)
      tree.children?.map((child) => hoistIndex(child))
    }
  }
  if (!tree.children) return false
  delete tree.type
  return tree
}

export async function getDirectoryTree(dir: string): Promise<false | ContentTree> {
  const absDir = path.join(process.cwd(), dir)

  const clean = (p: string) => {
    let relDir = path.relative(absDir, p)
    relDir = relDir.replace('index.mdx', '')
    relDir = relDir.endsWith('/') ? relDir.slice(0, -1) : relDir
    return relDir
  }

  const tree = await dirTree(absDir, clean)
  tree.name = 'Docs'

  return hoistIndex(tree)
}

export async function getDirectoryPaths(dir: string) {
  const menuData = await getDirectoryTree(dir)

  const paths: string[] = []
  const addPathsFromTree = (tree: ContentTree) => {
    paths.push(tree.path)
    if (tree.children?.length) {
      tree.children.forEach((child) => addPathsFromTree(child))
    }
  }
  if (menuData) addPathsFromTree(menuData)

  return paths
}

export function sluggify(path: string) {}
