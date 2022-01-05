import { Image } from '@graphcommerce/image'
import { useMergedClasses } from '@graphcommerce/next-ui/Styles/tssReact'
import { Link, Typography } from '@mui/material'
import PageLink from 'next/link'
import React from 'react'
import useRichTextStyles, { UseRichTextStyles } from './useRichTextStyles'

export interface Element {
  children: Node[]
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
    | 'table'
    | 'table_head'
    | 'table_header_cell'
    | 'table_body'
    | 'table_row'
    | 'table_cell'
    | string
  [key: string]: unknown
}

export interface Text {
  text: string
  bold?: true
  italic?: true
  underlined?: true
  [key: string]: unknown
}

interface LinkElement extends Element {
  type: 'link'
  href: string
}

interface ImageElement extends Element {
  type: 'image'
  src: string
  title: string
  width: number
  height: number
  mimeType: string
}

interface VideoElement extends Element {
  type: 'image'
  src: string
  title: string
  width: number
  height: number
  mimeType: string
}

interface LinkElement extends Element {
  type: 'link'
  href: string
}

interface IframeElement extends Element {
  type: 'iframe'
  src: string
}

export type ElementNode =
  | Element
  | LinkElement
  | ImageElement
  | VideoElement
  | IframeElement
  | LinkElement

export type Node = ElementNode | Text

const RenderText = ({ classes, text, ...textProps }: Text & Required<UseRichTextStyles>) => {
  let result = <>{text}</>
  if (textProps.bold) result = <strong>{result}</strong>
  if (textProps.italic) result = <em>{result}</em>
  if (textProps.underlined) result = <em>{result}</em>

  return result
}

export function isTextNode(node: Node): node is Text {
  return (node as Text).text !== undefined
}

export function isElementNode(node: Node): node is ElementNode {
  return (node as ElementNode).children !== undefined
}

function RenderNode({ classes, ...node }: Node & Required<UseRichTextStyles>) {
  if (isTextNode(node)) {
    return <RenderText {...node} classes={classes} />
  }
  if (isElementNode(node)) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return <RenderElement {...node} classes={classes} />
  }

  console.error(node)
  throw Error(`RichText: Node not recognized`)
}

function RenderChildren({ children, classes }: { children: Node[] } & Required<UseRichTextStyles>) {
  return (
    <>
      {children.map((node, key) => (
        // Since we don't know any unique identifiers of the element and since this doesn't rerender often this is fine.
        // eslint-disable-next-line react/no-array-index-key
        <RenderNode {...node} key={key} classes={classes} />
      ))}
    </>
  )
}

function RenderElement({ classes, ...element }: ElementNode & Required<UseRichTextStyles>) {
  const {
    root,
    asset,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    paragraph,
    ul,
    ol,
    blockQuote,
    code,
    iframe,
    aspectContainer,
    table,
    link,
  } = classes

  switch (element.type) {
    case 'heading-one':
      return (
        <Typography variant='h1' classes={{ root, h1 }}>
          <RenderChildren {...element} classes={classes} />
        </Typography>
      )
    case 'heading-two':
      return (
        <Typography variant='h2' classes={{ root, h2 }}>
          <RenderChildren {...element} classes={classes} />
        </Typography>
      )
    case 'heading-three':
      return (
        <Typography variant='h3' classes={{ root, h3 }}>
          <RenderChildren {...element} classes={classes} />
        </Typography>
      )
    case 'heading-four':
      return (
        <Typography variant='h4' classes={{ root, h4 }}>
          <RenderChildren {...element} classes={classes} />
        </Typography>
      )
    case 'heading-five':
      return (
        <Typography variant='h5' classes={{ root, h5 }}>
          <RenderChildren {...element} classes={classes} />
        </Typography>
      )
    case 'heading-six':
      return (
        <Typography variant='h6' classes={{ root, h6 }}>
          <RenderChildren {...element} classes={classes} />
        </Typography>
      )
    case 'paragraph':
      return element.children[0].code ? (
        <pre className={classes.code}>
          <code>
            <RenderChildren {...element} classes={classes} />
          </code>
        </pre>
      ) : (
        <Typography variant='body1' paragraph classes={{ root, paragraph }}>
          <RenderChildren {...element} classes={classes} />
        </Typography>
      )

    case 'bulleted-list':
      return (
        <Typography component='ul' classes={{ root: ul }}>
          <RenderChildren {...element} classes={classes} />
        </Typography>
      )
    case 'numbered-list':
      return (
        <Typography component='ol' classes={{ root: ol }}>
          <RenderChildren {...element} classes={classes} />
        </Typography>
      )
    case 'list-item':
      return (
        <li>
          <RenderChildren {...element} classes={classes} />
        </li>
      )
    case 'list-item-child':
      return <RenderChildren {...element} classes={classes} />
    case 'block-quote':
      return (
        <Typography component='blockquote' classes={{ root: blockQuote }}>
          <RenderChildren {...element} classes={classes} />
        </Typography>
      )
    case 'iframe':
      // eslint-disable-next-line no-case-declarations
      const iframeElement = element as IframeElement
      // todo(paales) add security attributes to iframe
      // todo(paales) make iframe responsive
      return (
        <div className={aspectContainer}>
          <iframe
            src={iframeElement.src}
            title='embedded content'
            className={iframe}
            loading='lazy'
          />
        </div>
      )
    case 'image':
      // eslint-disable-next-line no-case-declarations
      const imageElement = element as ImageElement
      return (
        <Image
          src={imageElement.src}
          width={imageElement.width}
          height={imageElement.height}
          alt={imageElement.title}
          className={asset}
        />
      )
    case 'video':
      // eslint-disable-next-line no-case-declarations
      const videoElement = element as VideoElement
      return (
        <div>IMPLEMENT VIDEO</div>
        // <Asset
        //   asset={{ url: videoElement.src, mimeType: videoElement.mimeType }}
        //   autoPlay
        //   loop
        //   muted
        //   playsInline
        //   width={380}
        //   className={asset}
        // />
      )
    case 'link':
      // eslint-disable-next-line no-case-declarations
      const linkElement = element as LinkElement
      return (
        <PageLink href={linkElement.href} passHref>
          <Link classes={{ root: link }} underline='hover'>
            <RenderChildren {...element} classes={classes} />
          </Link>
        </PageLink>
      )
    case 'table':
      return (
        <table className={table}>
          <RenderChildren {...element} classes={classes} />
        </table>
      )
    case 'table_head':
      return (
        <thead>
          <RenderChildren {...element} classes={classes} />
        </thead>
      )
    case 'table_header_cell':
      return (
        <th>
          <RenderChildren {...element} classes={classes} />
        </th>
      )
    case 'table_body':
      return (
        <tbody>
          <RenderChildren {...element} classes={classes} />
        </tbody>
      )
    case 'table_row':
      return (
        <tr>
          <RenderChildren {...element} classes={classes} />
        </tr>
      )
    case 'table_cell':
      return (
        <td>
          <RenderChildren {...element} classes={classes} />
        </td>
      )
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.error(element)
        throw Error(`RichText: Unknown Element: ${element.type}`)
      }
      return <RenderChildren {...element} classes={classes} />
  }
}

export type RichTextProps = { raw: ElementNode } & UseRichTextStyles

export default function RichText({ raw, ...props }: RichTextProps) {
  const classes = useMergedClasses(useRichTextStyles().classes, props.classes)
  return <RenderChildren classes={classes} {...raw} />
}
