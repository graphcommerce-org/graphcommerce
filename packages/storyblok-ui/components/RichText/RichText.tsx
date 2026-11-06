import type { SxProps, Theme } from '@mui/material'
import { Fragment, type ReactElement, type ReactNode } from 'react'
import type { StoryblokRichtextData } from '../../types'
import { defaultRenderers } from './defaultRenderers'
import { defaultSxRenderer } from './defaultSxRenderer'
import type { AdditionalProps, Renderer, Renderers, RichTextNodeType, SxRenderer } from './types'

const sxArr = (sx?: SxProps<Theme> | false): SxProps<Theme>[] => {
  if (!sx) return []
  return Array.isArray(sx) ? (sx as SxProps<Theme>[]) : [sx]
}

function computeSx(
  { first, last, sxRenderer }: Pick<AdditionalProps, 'first' | 'last' | 'sxRenderer'>,
  type: RichTextNodeType,
): SxProps<Theme> {
  return [
    ...sxArr(sxRenderer.all),
    ...sxArr(sxRenderer[type]),
    ...sxArr(first && sxRenderer.first),
    ...sxArr(last && sxRenderer.last),
  ] as SxProps<Theme>
}

function resolveType(node: StoryblokRichtextData): RichTextNodeType | null {
  if (node.type === 'heading') {
    const level = (node.attrs?.level as number | undefined) ?? 1
    return `h${level}` as RichTextNodeType
  }
  return node.type as RichTextNodeType
}

function RenderText(props: { node: StoryblokRichtextData } & AdditionalProps): ReactNode {
  const { node, renderers, sxRenderer, first, last } = props
  const text = node.text ?? ''

  const parts = text.split('\n')
  const withBreaks: ReactNode =
    parts.length === 1 ? (
      text
    ) : (
      <>
        {parts.map((part, i) => (
          <Fragment key={i}>
            {part}
            {i < parts.length - 1 ? <br /> : null}
          </Fragment>
        ))}
      </>
    )

  const marks = node.marks ?? []
  return marks.reduce<ReactNode>((child, mark) => {
    const type = mark.type as RichTextNodeType
    const MarkRenderer = renderers[type] as Renderer<Record<string, unknown>> | undefined
    if (!MarkRenderer) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(mark)
        throw new Error(`RichText: Unknown mark type: ${mark.type}`)
      }
      return child
    }
    const sx = computeSx({ first, last, sxRenderer }, type)
    const attrs = (mark.attrs ?? {}) as Record<string, unknown>
    return (
      <MarkRenderer sx={sx} {...attrs}>
        {child}
      </MarkRenderer>
    )
  }, withBreaks)
}

function RenderNode(props: { node: StoryblokRichtextData } & AdditionalProps): ReactNode {
  const { node } = props
  if (node.type === 'text') return <RenderText {...props} />

  const { renderers, sxRenderer, first, last } = props
  const type = resolveType(node)
  if (!type) return null

  const NodeRenderer = renderers[type] as Renderer<Record<string, unknown>> | undefined
  if (!NodeRenderer) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(node)
      throw new Error(`RichText: Unknown node type: ${node.type}`)
    }
    return null
  }

  const sx = computeSx({ first, last, sxRenderer }, type)
  const attrs = (node.attrs ?? {}) as Record<string, unknown>
  const children = node.content ? (
    <RenderChildren childNodes={node.content} renderers={renderers} sxRenderer={sxRenderer} />
  ) : null

  return (
    <NodeRenderer sx={sx} {...attrs}>
      {children}
    </NodeRenderer>
  )
}

function RenderChildren(
  props: { childNodes: StoryblokRichtextData[]; noMargin?: boolean } & Pick<
    AdditionalProps,
    'renderers' | 'sxRenderer'
  >,
): ReactElement {
  const { childNodes, noMargin, renderers, sxRenderer } = props
  return (
    <>
      {childNodes.map((node, key) => (
        <RenderNode
          // eslint-disable-next-line react/no-array-index-key
          key={key}
          node={node}
          renderers={renderers}
          sxRenderer={sxRenderer}
          first={noMargin && key === 0}
          last={noMargin && key === childNodes.length - 1}
        />
      ))}
    </>
  )
}

function mergeSxRenderer(base: SxRenderer, override?: SxRenderer): SxRenderer {
  if (!override) return base
  const keys = new Set([...Object.keys(base), ...Object.keys(override)])
  const result: SxRenderer = {}
  for (const key of keys) {
    const k = key as keyof SxRenderer
    const baseSx = base[k]
    const overrideSx = override[k]
    if (baseSx && overrideSx) {
      result[k] = [...sxArr(baseSx), ...sxArr(overrideSx)] as SxProps<Theme>
    } else {
      result[k] = baseSx ?? overrideSx
    }
  }
  return result
}

export type RichTextProps = {
  content: StoryblokRichtextData
  renderers?: Partial<Renderers>
  /**
   * Per-element theming. Keys are Storyblok node/mark types (e.g. `paragraph`, `h1`,
   * `link`, `bold`). Merges with the built-in defaults.
   *
   * @example
   * ```tsx
   * <RichText
   *   content={blok.copy}
   *   sxRenderer={{
   *     paragraph: (theme) => ({ columnGap: theme.spacings.md }),
   *   }}
   * />
   * ```
   */
  sxRenderer?: SxRenderer
  /** When true, preserves the first/last element's outer margins. Defaults to false (stripped). */
  withMargin?: boolean
}

export function RichText({ content, renderers, sxRenderer, withMargin = false }: RichTextProps) {
  if (!content?.content) return null
  return (
    <RenderChildren
      childNodes={content.content}
      renderers={{ ...defaultRenderers, ...renderers }}
      sxRenderer={mergeSxRenderer(defaultSxRenderer, sxRenderer)}
      noMargin={!withMargin}
    />
  )
}
