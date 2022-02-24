/* eslint-disable class-methods-use-this */
import path from 'path'
import { remark } from 'remark'
import strip from 'strip-markdown'
import { toVFile as vfile } from 'to-vfile'
import { matter } from 'vfile-matter'
import { FileNode, findByUrl, getDirectoryPaths, getDirectoryTree } from './files'
import { indexName } from './instantSearch'
import { BaseDocument, SearchIndexer } from './typesense/SearchIndexer'

export type DocumentationDocument = BaseDocument & {
  url: string
  content: string
  name: string
}

export class DocumentIndexer extends SearchIndexer<DocumentationDocument> {
  #root: string

  constructor(root: string) {
    super({
      name: indexName,
      fields: {
        id: { type: 'string' },
        name: { type: 'string' },
        url: { type: 'string' },
        content: { type: 'string' },
      },
    })
    this.#root = root
  }

  // load a single document
  async #loadDocument(node?: FileNode | false): Promise<DocumentationDocument> {
    if (!node) throw Error('Node not found')

    const file = path.join(process.cwd(), this.#root, node.path)
    const res = matter(await vfile.read(file), { strip: true })
    const content = (await remark().use(strip).process(res)).value.toString()

    if (!content) throw Error('Can not load file')

    const { name, url } = node
    return { id: node.path, content, url, name: node.matter.menu ?? name }
  }

  async *all() {
    const paths = await getDirectoryPaths(this.#root)
    const menuData = await getDirectoryTree(this.#root)
    if (!menuData) return false

    for (const path of paths) {
      yield this.#loadDocument(findByUrl(path.split('/'), menuData))
    }

    return true
  }
}
