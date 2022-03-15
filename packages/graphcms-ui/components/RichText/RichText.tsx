/* eslint-disable @typescript-eslint/no-use-before-define */
import { SxProps, Theme } from '@mui/material'
import { defaultRenderers } from './defaultRenderers'
import { defaultSxRenderer } from './defaultSxRenderer'
import {
  AdditionalProps,
  Renderers,
  SxRenderer,
  TextNode,
  ElementOrTextNode,
  ElementNode,
} from './types'

function RenderText({ text, renderers, sxRenderer, ...textProps }: TextNode & AdditionalProps) {
  let type: 'bold' | 'italic' | 'underlined' | undefined
  if (textProps.bold) type = 'bold'
  if (textProps.italic) type = 'italic'
  if (textProps.underlined) type = 'underlined'

  if (!type) return <>{text}</>

  const Component = renderers[type]
  const sx = sxRenderer?.[type] ?? []

  return (
    <Component type={type} sx={sx}>
      {text}
    </Component>
  )
}

export function isTextNode(node: ElementOrTextNode): node is TextNode {
  return (node as TextNode).text !== undefined
}

export function isElementNode(node: ElementOrTextNode): node is ElementNode {
  return (node as ElementNode).children !== undefined
}

function RenderNode(node: ElementOrTextNode & AdditionalProps) {
  if (isTextNode(node)) {
    return <RenderText {...node} />
  }
  if (isElementNode(node)) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return <RenderElement {...node} />
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(node)
    throw Error(`RichText: Node not recognized`)
  }

  return null
}

function RenderChildren({
  childNodes,
  ...props
}: { childNodes: ElementNode['children'] } & AdditionalProps) {
  return (
    <>
      {childNodes.map((node, key) => (
        // Since we don't know any unique identifiers of the element and since this doesn't rerender often this is fine.
        // eslint-disable-next-line react/no-array-index-key
        <RenderNode {...node} {...props} key={key} />
      ))}
    </>
  )
}

function RenderElement(element: ElementNode & AdditionalProps) {
  const { type, children, sxRenderer, renderers, ...props } = element

  // todo: this has the any type, could be improved
  const Component = renderers[type]
  const sx = sxRenderer?.[type] ?? []

  if (Component) {
    return (
      <Component {...props} sx={[sxRenderer.all, ...(Array.isArray(sx) ? sx : [sx])]}>
        <RenderChildren childNodes={children} sxRenderer={sxRenderer} renderers={renderers} />
      </Component>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(element)
    throw Error(`RichText: Unknown Element: ${element.type}`)
  }
  return <RenderChildren childNodes={children} sxRenderer={sxRenderer} renderers={renderers} />
}

export type RichTextProps = { raw: ElementNode } & {
  renderers?: Partial<Renderers>
  /**
   * Allows you to theme all the types of components
   *
   * ```tsx
   * function MyComponent()f {
   *   return <RichText
   *     sxRenderer={{
   *       paragraph: (theme) => ({
   *         columnCount: { xs: 1, md: getColumnCount(props, 2) },
   *         columnGap: theme.spacings.md,
   *       }),
   *       //other props here
   *     }}
   *   />
   * }
   * ```
   */
  sxRenderer?: SxRenderer
}

export function mergeSxRenderer(base: SxRenderer, sxRenderer?: SxRenderer) {
  if (!sxRenderer) return base

  return Object.fromEntries(
    Object.entries<SxProps<Theme>>(base).map(([key, sx]) => {
      const sxOverride: SxProps<Theme> = sxRenderer?.[key]

      return sxOverride
        ? [
            key,
            [
              ...(Array.isArray(sx) ? sx : [sx]),
              ...(Array.isArray(sxOverride) ? sxOverride : [sxOverride]),
            ],
          ]
        : [key, sx]
    }),
  ) as SxRenderer
}

export function RichText({ raw, sxRenderer, renderers }: RichTextProps) {
  return (
    <RenderChildren
      childNodes={raw.children}
      sxRenderer={mergeSxRenderer(defaultSxRenderer, sxRenderer)}
      renderers={{ ...defaultRenderers, ...renderers }}
    />
  )
}
