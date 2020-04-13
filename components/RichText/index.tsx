import React from 'react'
import { Typography } from '@material-ui/core'
import { ImageMimeTypes } from '../PictureResponsive'
import FilestackPicture from '../FilestackPicture'
import Link from '../Link'

interface ValueJSON {
  document: DocumentJSON
  object?: 'value'
}

type NodeJSON = DocumentJSON | BlockJSON | InlineJSON | TextJSON | IframeJSON

interface DocumentJSON {
  nodes: NodeJSON[]
  data?: { [key: string]: any }
  object: 'document'
}

interface BlockJSON {
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
    | 'table'
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

interface ImageJSON {
  type: 'image'
  nodes: NodeJSON[]
  data: {
    src: string
    width: number
    height: number
    mimeType: ImageMimeTypes
  }
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
  data: {
    href: string
  }
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

const RenderBlock: React.FC<BlockJSON | IframeJSON | ImageJSON> = (block) => {
  const childNodes = <RenderNodes nodes={block.nodes} />

  switch (block.type) {
    case 'heading-one':
      return <Typography variant='h1'>{childNodes}</Typography>
    case 'heading-two':
      return <Typography variant='h2'>{childNodes}</Typography>
    case 'heading-three':
      return <Typography variant='h3'>{childNodes}</Typography>
    case 'heading-four':
      return <Typography variant='h4'>{childNodes}</Typography>
    case 'heading-five':
      return <Typography variant='h5'>{childNodes}</Typography>
    case 'heading-six':
      return <Typography variant='h6'>{childNodes}</Typography>
    case 'paragraph':
      return <Typography variant='body1'>{childNodes}</Typography>
    case 'bulleted-list':
      return <Typography component='ul'>{childNodes}</Typography>
    case 'numbered-list':
      return <Typography component='ol'>{childNodes}</Typography>
    case 'list-item':
      return <li>{childNodes}</li>
    case 'list-item-child':
      return <>{childNodes}</>
    case 'block-quote':
      return <Typography component='blockquote'>{childNodes}</Typography>
    case 'iframe':
      // todo(paales) add security attributes to iframe
      // todo(paales) make iframe responsive
      return <iframe src={block.data.src} title='embedded content' />
    case 'image':
      return (
        <FilestackPicture
          alt=''
          src={[
            ...block.data.src.split('/').slice(0, 3),
            ...block.data.src.split('/').slice(-1),
          ].join('/')}
          type={block.data.mimeType}
          width={block.data.width}
          height={block.data.height}
        />
      )
    default:
      console.log(`UNKOWNN BLOCK TYPE ${block.type}`, block)
      return <></>
  }
}

const RenderNodes: React.FC<{ nodes: NodeJSON[] }> = ({ nodes }) => {
  return (
    <>
      {nodes.map((node, key) => (
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
      return <RenderDocument {...node} />
    case 'inline':
      return <RenderInline {...node} />
    case 'text':
      return <RenderText {...node} />
    default:
      // @ts-ignore
      throw Error(`RenderDocument object ${node.object} not implemented`)
  }
}

const RenderDocument: React.FC<DocumentJSON> = (props) => <RenderNodes {...props} />

const RichText: React.FC<{ raw: ValueJSON }> = ({ raw }) => <RenderDocument {...raw.document} />

export default RichText
