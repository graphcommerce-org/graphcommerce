/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react'

export function isHTMLElement(node: Node): node is HTMLElement {
  return node instanceof HTMLElement
}

const alignmentToFlex = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
}

/** Retrieve vertical alignment from a master format node */
export function getVerticalAlignment(node: HTMLElement): VerticalAlignment {
  let verticalAlignment = null
  if (node.style.justifyContent) {
    verticalAlignment = flexToVerticalAlignment(node.style.justifyContent)
  }

  return { verticalAlignment }
}

export type VerticalAlignment = {
  verticalAlignment: 'top' | 'middle' | 'bottom' | null
}

/** Convert vertical alignment values to flex values */
export function verticalAlignmentToFlex(alignment: string) {
  return alignmentToFlex[alignment]
}

/** Convert flex to vertical alignment values */
export function flexToVerticalAlignment(flex: string) {
  const flexToAlignment = Object.assign(
    {},
    ...Object.entries(alignmentToFlex).map(([a, b]) => ({ [b]: a })),
  )
  return flexToAlignment[flex]
}

export type AdvancedProps = PaddingProps &
  MarginProps &
  BorderProps &
  TextAlignProps &
  CssClassesProps &
  IsHiddenProps

export function stripEmpty<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      acc[key] = value
    }
    return acc
  }, {})
}

/** Retrieve advanced props from content type node */
export function getAdvanced(node: HTMLElement): AdvancedProps {
  return {
    ...getPadding(node),
    ...getMargin(node),
    ...getBorder(node),
    ...getTextAlign(node),
    ...getCssClasses(node),
    ...getIsHidden(node),
  }
}

export function extractAdvancedProps<P extends AdvancedProps>(props: P) {
  const [padding, remainging] = extractPaddingProps(props)
  const [margin, remainging2] = extractMarginProps(remainging)
  const [border, remainging3] = extractBorderProps(remainging2)
  const [textAlign, remainging4] = extractTextAlignProps(remainging3)
  const [cssClasses, remainging5] = extractCssClassesProps(remainging4)
  const [isHidden, remainging6] = extractIsHiddenProps(remainging5)

  return [
    { ...padding, ...margin, ...border, ...textAlign },
    cssClasses,
    isHidden,
    remainging6,
  ] as const
}

export type PaddingProps = Pick<
  React.CSSProperties,
  'paddingTop' | 'paddingRight' | 'paddingBottom' | 'paddingLeft'
>

/** Retrieve the padding from a content type node */
export function getPadding(node: HTMLElement): PaddingProps {
  return {
    paddingTop: node.style.paddingTop,
    paddingRight: node.style.paddingRight,
    paddingBottom: node.style.paddingBottom,
    paddingLeft: node.style.paddingLeft,
  }
}

export function extractPaddingProps<P extends PaddingProps>(
  props: P,
): [PaddingProps, Omit<P, keyof PaddingProps>] {
  const { paddingTop, paddingRight, paddingBottom, paddingLeft, ...remaining } = props
  return [stripEmpty({ paddingTop, paddingRight, paddingBottom, paddingLeft }), remaining]
}

export type MarginProps = Pick<
  React.CSSProperties,
  'marginTop' | 'marginRight' | 'marginBottom' | 'marginLeft'
>

/** Retrieve the margin from a content type node */
export function getMargin(node: HTMLElement): MarginProps {
  return {
    marginTop: node.style.marginTop,
    marginRight: node.style.marginRight,
    marginBottom: node.style.marginBottom,
    marginLeft: node.style.marginLeft,
  }
}

export function extractMarginProps<P extends MarginProps>(
  props: P,
): [Partial<MarginProps>, Omit<P, keyof MarginProps>] {
  const { marginTop, marginLeft, marginBottom, marginRight, ...remaining } = props
  return [stripEmpty({ marginTop, marginLeft, marginBottom, marginRight }), remaining]
}

export type BorderProps = Pick<
  React.CSSProperties,
  'border' | 'borderColor' | 'borderWidth' | 'borderRadius'
>

/** Retrieve the border from a content type node */
export function getBorder(node: HTMLElement): BorderProps {
  return {
    border: node.style.borderStyle,
    borderColor: node.style.borderColor,
    borderWidth: node.style.borderWidth,
    borderRadius: node.style.borderRadius,
  }
}

export function extractBorderProps<P extends BorderProps>(
  props: P,
): [BorderProps, Omit<P, keyof BorderProps>] {
  const { border, borderColor, borderRadius, borderWidth, ...remaining } = props
  return [stripEmpty({ border, borderColor, borderRadius, borderWidth }), remaining]
}

export type TextAlignProps = Pick<React.CSSProperties, 'textAlign'>

/** Retrieve the text align from a content type node */
export function getTextAlign(node: HTMLElement): TextAlignProps {
  return {
    textAlign: node.style.textAlign as React.CSSProperties['textAlign'],
  }
}

export function extractTextAlignProps<P extends TextAlignProps>(
  props: P,
): [TextAlignProps, Omit<P, keyof TextAlignProps>] {
  const { textAlign, ...remaining } = props
  return [stripEmpty({ textAlign }), remaining]
}

export type CssClassesProps = {
  cssClasses?: string[]
}

/** Retrieve the CSS classes from a content type node */
export function getCssClasses(node: HTMLElement): CssClassesProps {
  return {
    cssClasses: node.getAttribute('class') ? node.getAttribute('class')?.split(' ') : [],
  }
}

export function extractCssClassesProps<P extends CssClassesProps>(
  props: P,
): [string[], Omit<P, keyof CssClassesProps>] {
  const { cssClasses = [], ...remaining } = props
  return [cssClasses, remaining]
}

export type IsHiddenProps = {
  isHidden: boolean
}

/** Retrieve if CSS display property is set to none from a content type node */
export function getIsHidden(node: HTMLElement): IsHiddenProps {
  return {
    isHidden: node.style.display === 'none',
  }
}

export function extractIsHiddenProps<P extends IsHiddenProps>(
  props: P,
): [boolean, Omit<P, keyof IsHiddenProps>] {
  const { isHidden = false, ...remaining } = props
  return [isHidden, remaining]
}

/**
 * Converts a CSS string style into a JSX object inline style
 *
 * @param {String} style
 * @returns {Object}
 */
export function cssToJSXStyle(style: string): React.CSSProperties {
  const toCamelCase = (str: string) => str.replace(/-(.)/g, (_, p) => p.toUpperCase())
  const result = {}
  style.split(';').forEach((el) => {
    const [prop, value] = el.split(':')
    if (prop) {
      result[toCamelCase(prop.trim())] = value.trim()
    }
  })

  return result
}

/**
 * Retrieve media queries from a master format node
 *
 * @param node
 * @param {Array} mediaQueries
 * @returns {{ mediaQueries: { media: string; style: string } }}
 */
export function getMediaQueries(node: HTMLElement) {
  const response = []
  const dataset = Object.keys(node.dataset)

  const medias = dataset.filter((key) => key.match(/media-/)).map((key) => node.dataset[key])

  const styles = dataset.filter((key) => key.match(/mediaStyle/)).map((key) => node.dataset[key])

  medias.forEach((media, i) => {
    response.push({
      media,
      style: cssToJSXStyle(styles[i]),
    })
  })

  return { mediaQueries: response }
}
