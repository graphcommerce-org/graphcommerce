import React from 'react'
import { Typography } from '@material-ui/core'
import Link from '../Link'
import Asset, { MimeTypes } from '../Asset'
import useRichTextStyles from './useRichTextStyles'

export interface ValueJSON {
  document: DocumentJSON
  object?: 'value'
}

type NodeJSON = DocumentJSON | InlineJSON | TextJSON | BlockJSON

interface DocumentJSON {
  nodes: NodeJSON[]
  data?: { [key: string]: any }
  object: 'document'
}

type BlockJSON =
  | SimpleBlockJSON
  | IframeJSON
  | ImageJSON
  | VideoJSON
  | TableJSON
  | TableRowJSON
  | TableCellJSON

interface SimpleBlockJSON {
  type:
    | 'heading-one'
    | 'heading-two'
    | 'heading-three'
    | 'heading-four'
    | 'heading-five'
    | 'heading-six'
    | 'paragraph'
    | 'numbered-list'
    | 'bulleted-list'
    | 'block-quote'
    | 'paragraph'
    | 'list-item'
    | 'list-item-child'
  nodes: NodeJSON[]
  data?: { [key: string]: any }
  object: 'block'
}

interface IframeJSON {
  type: 'iframe'
  nodes: NodeJSON[]
  data: { src: string }
  object: 'block'
}

interface VideoJSON {
  type: 'video'
  nodes: NodeJSON[]
  data: { src: string; title: string; handle: string; mimeType: string }
  object: 'block'
}

interface ImageJSON {
  type: 'image'
  nodes: NodeJSON[]
  data: {
    src: string
    width: number
    height: number
    mimeType: MimeTypes
    title: string
  }
  object: 'block'
}

interface TableJSON {
  type: 'table'
  nodes: NodeJSON[]
  data: { rows: number; header: boolean; columns: number }
  object: 'block'
}

interface TableRowJSON {
  type: 'table_row'
  nodes: NodeJSON[]
  data: { cells: number; index: number }
  object: 'block'
}
interface TableCellJSON {
  type: 'table_cell'
  nodes: NodeJSON[]
  data: { index: number }
  object: 'block'
}

interface TextJSON {
  marks: Mark[]
  text: string
  object: 'text'
}

interface Mark {
  object: 'mark'
  type: 'bold' | 'italic' | 'underlined' | 'code'
  // data: Immutable.Map<string, any>
}

type InlineJSON = LinkJSON

interface LinkJSON {
  object: 'inline'
  nodes: NodeJSON[]
  type: 'link'
  data: { href: string }
}

const RenderInline: React.FC<InlineJSON> = (inline) => {
  const childNodes = <RenderNodes nodes={inline.nodes} />

  switch (inline.type) {
    case 'link':
      return (
        // todo(paales) make sure the meta robots are set to nofollow when the link is external?
        <Link href={inline.data.href} metaRobots='INDEX_FOLLOW'>
          {childNodes}
        </Link>
      )
    default:
      console.error(`UNKOWNN INLINE TYPE ${inline.type}`, inline)
      return <>{childNodes}</>
  }
}

const RenderText: React.FC<TextJSON> = (text) => {
  const result = text.marks.reduce(
    (val, mark) => <RenderMark {...mark}>{val}</RenderMark>,
    <>{text.text}</>,
  )
  return <>{result}</>
}

const RenderMark: React.FC<Mark> = (mark) => {
  switch (mark.type) {
    case 'bold':
      return <strong>{mark.children}</strong>
    case 'italic':
      return <em>{mark.children}</em>
    case 'underlined':
      return <u>{mark.children}</u>
    case 'code':
      return <code>{mark.children}</code>
    default:
      console.log(`UNKOWNN MARK TYPE ${mark.type}`, mark)
      return <>{mark.children}</>
  }
}

const RenderBlock: React.FC<BlockJSON> = (block) => {
  const { asset, ...typographyClasses } = useRichTextStyles()
  switch (block.type) {
    case 'heading-one':
      return (
        <Typography variant='h1' classes={typographyClasses}>
          <RenderNodes nodes={block.nodes} />
        </Typography>
      )
    case 'heading-two':
      return (
        <Typography variant='h2' classes={typographyClasses}>
          <RenderNodes nodes={block.nodes} />
        </Typography>
      )
    case 'heading-three':
      return (
        <Typography variant='h3' classes={typographyClasses}>
          <RenderNodes nodes={block.nodes} />
        </Typography>
      )
    case 'heading-four':
      return (
        <Typography variant='h4' classes={typographyClasses}>
          <RenderNodes nodes={block.nodes} />
        </Typography>
      )
    case 'heading-five':
      return (
        <Typography variant='h5' classes={typographyClasses}>
          <RenderNodes nodes={block.nodes} />
        </Typography>
      )
    case 'heading-six':
      return (
        <Typography variant='h6' classes={typographyClasses}>
          <RenderNodes nodes={block.nodes} />
        </Typography>
      )
    case 'paragraph':
      return (
        <Typography variant='body1' classes={typographyClasses}>
          <RenderNodes nodes={block.nodes} />
        </Typography>
      )
    case 'bulleted-list':
      return (
        <Typography component='ul' classes={typographyClasses}>
          <RenderNodes nodes={block.nodes} />
        </Typography>
      )
    case 'numbered-list':
      return (
        <Typography component='ol' classes={typographyClasses}>
          <RenderNodes nodes={block.nodes} />
        </Typography>
      )
    case 'list-item':
      return (
        <li>
          <RenderNodes nodes={block.nodes} />
        </li>
      )
    case 'list-item-child':
      return <RenderNodes nodes={block.nodes} />
    case 'block-quote':
      return (
        <Typography component='blockquote' classes={typographyClasses}>
          <RenderNodes nodes={block.nodes} />
        </Typography>
      )
    case 'iframe':
      // todo(paales) add security attributes to iframe
      // todo(paales) make iframe responsive
      return <iframe src={block.data.src} title='embedded content' />
    case 'image':
      return <Asset asset={{ ...block.data, url: block.data.src }} width={380} className={asset} />
    case 'video':
      return (
        <Asset
          asset={{ ...block.data, url: block.data.src }}
          autoPlay
          loop
          muted
          playsInline
          width={380}
          className={asset}
        />
      )
    case 'table':
      return (
        <table>
          {block.data.header ? (
            <>
              <thead>
                <RenderNodes nodes={block.nodes.slice(0, 1)} />
              </thead>
              <tbody>
                <RenderNodes nodes={block.nodes.slice(1)} />
              </tbody>
            </>
          ) : (
            <tbody>
              <RenderNodes nodes={block.nodes} />
            </tbody>
          )}
        </table>
      )
    case 'table_row':
      return (
        <tr>
          <RenderNodes nodes={block.nodes} />
        </tr>
      )
    case 'table_cell':
      return (
        <td>
          <RenderNodes nodes={block.nodes} />
        </td>
      )
    default:
      // @ts-ignore
      return <div>UNKOWNN BLOCK TYPE {block.type}</div>
  }
}

const RenderNodes: React.FC<{ nodes: NodeJSON[] }> = ({ nodes }) => {
  return (
    <>
      {nodes.map((node, key) => (
        // Since we don't know any unique identifiers of the element and since this doesn't rerender often this is fine.
        // eslint-disable-next-line react/no-array-index-key
        <RenderNode {...node} key={key} />
      ))}
    </>
  )
}

const RenderNode: React.FC<NodeJSON> = (node) => {
  switch (node.object) {
    case 'block':
      return <RenderBlock {...node} />
    case 'document':
      return <RenderNodes {...node} />
    case 'inline':
      return <RenderInline {...node} />
    case 'text':
      return <RenderText {...node} />
    default:
      // @ts-ignore
      throw Error(`RenderNode object ${node.object} not implemented`)
  }
}

const RichText: React.FC<GQLRichTextFragment & { raw: ValueJSON }> = ({ raw }) => (
  <RenderNodes {...raw.document} />
)

export default RichText
