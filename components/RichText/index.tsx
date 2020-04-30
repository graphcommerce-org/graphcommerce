import React from 'react'
import { Typography, TypographyProps } from '@material-ui/core'
import Link from '../Link'
import Asset, { MimeTypes } from '../Asset'
import useRichTextStyles, { RichTextStylesProps } from './useRichTextStyles'
import { UseStyles } from '../Theme'

export interface ValueJSON {
  document: DocumentJSON
  object?: 'value'
}

type NodeJSON = DocumentJSON | InlineJSON | TextJSON | BlockJSON

interface DocumentJSON {
  nodes: NodeJSON[]
  data?: { [key: string]: unknown }
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
  data?: { [key: string]: unknown }
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

const RenderInline: React.FC<InlineJSON & RichTextClasses> = ({ classes, ...inline }) => {
  const childNodes = <RenderNodes nodes={inline.nodes} classes={classes} />

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
      // eslint-disable-next-line no-console
      console.log(`UNKOWNN MARK TYPE ${mark.type}`, mark)
      return <>{mark.children}</>
  }
}

const RenderBlock: React.FC<BlockJSON & RichTextClasses> = ({ classes, ...block }) => {
  const { asset, ...typographyClasses } = classes

  switch (block.type) {
    case 'heading-one':
      return (
        <Typography variant='h1' classes={typographyClasses}>
          <RenderNodes nodes={block.nodes} classes={classes} />
        </Typography>
      )
    case 'heading-two':
      return (
        <Typography variant='h2' classes={typographyClasses}>
          <RenderNodes nodes={block.nodes} classes={classes} />
        </Typography>
      )
    case 'heading-three':
      return (
        <Typography variant='h3' classes={typographyClasses}>
          <RenderNodes nodes={block.nodes} classes={classes} />
        </Typography>
      )
    case 'heading-four':
      return (
        <Typography variant='h4' classes={typographyClasses}>
          <RenderNodes nodes={block.nodes} classes={classes} />
        </Typography>
      )
    case 'heading-five':
      return (
        <Typography variant='h5' classes={typographyClasses}>
          <RenderNodes nodes={block.nodes} classes={classes} />
        </Typography>
      )
    case 'heading-six':
      return (
        <Typography variant='h6' classes={typographyClasses}>
          <RenderNodes nodes={block.nodes} classes={classes} />
        </Typography>
      )
    case 'paragraph':
      return (
        <Typography variant='body1' classes={typographyClasses}>
          <RenderNodes nodes={block.nodes} classes={classes} />
        </Typography>
      )
    case 'bulleted-list':
      return (
        <Typography component='ul' classes={typographyClasses}>
          <RenderNodes nodes={block.nodes} classes={classes} />
        </Typography>
      )
    case 'numbered-list':
      return (
        <Typography component='ol' classes={typographyClasses}>
          <RenderNodes nodes={block.nodes} classes={classes} />
        </Typography>
      )
    case 'list-item':
      return (
        <li>
          <RenderNodes nodes={block.nodes} classes={classes} />
        </li>
      )
    case 'list-item-child':
      return <RenderNodes nodes={block.nodes} classes={classes} />
    case 'block-quote':
      return (
        <Typography component='blockquote' classes={typographyClasses}>
          <RenderNodes nodes={block.nodes} classes={classes} />
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
                <RenderNodes nodes={block.nodes.slice(0, 1)} classes={classes} />
              </thead>
              <tbody>
                <RenderNodes nodes={block.nodes.slice(1)} classes={classes} />
              </tbody>
            </>
          ) : (
            <tbody>
              <RenderNodes nodes={block.nodes} classes={classes} />
            </tbody>
          )}
        </table>
      )
    case 'table_row':
      return (
        <tr>
          <RenderNodes nodes={block.nodes} classes={classes} />
        </tr>
      )
    case 'table_cell':
      return (
        <td>
          <RenderNodes nodes={block.nodes} classes={classes} />
        </td>
      )
    default:
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return <div>UNKOWNN BLOCK TYPE {block.type}</div>
  }
}

const RenderNodes: React.FC<{ nodes: NodeJSON[] } & RichTextClasses> = ({ nodes, classes }) => {
  return (
    <>
      {nodes.map((node, key) => (
        // Since we don't know any unique identifiers of the element and since this doesn't rerender often this is fine.
        // eslint-disable-next-line react/no-array-index-key
        <RenderNode {...node} key={key} classes={classes} />
      ))}
    </>
  )
}

const RenderNode: React.FC<NodeJSON & RichTextClasses> = (node) => {
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      throw Error(`RenderNode object ${node.object} not implemented`)
  }
}

type RichTextClasses = Required<UseStyles<typeof useRichTextStyles>>

type RichTextProps = { raw: ValueJSON } & Partial<RichTextStylesProps> &
  UseStyles<typeof useRichTextStyles> &
  TypographyProps

const RichText: React.FC<RichTextProps> = ({ raw, ...props }) => {
  const classes = useRichTextStyles({ condensed: false, ...props })
  return <RenderNodes classes={classes} {...raw.document} />
}

export default RichText
