import { CSSProperties } from 'react'
import { SheetSize } from '../types'

export default function variantSizeCss(
  size: SheetSize,
): CSSProperties['height'] | CSSProperties['width'] {
  let css: CSSProperties['height'] | CSSProperties['width']
  if (size === 'max') css = '100%'
  if (size !== 'min' && size !== 'max') css = size
  return css
}
