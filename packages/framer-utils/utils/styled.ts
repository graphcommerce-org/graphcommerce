import type { CSSProperties } from 'react'

type AnyKey = string | number | symbol

export type Classes<T extends AnyKey> = Record<T, string>
export type Styles<T extends AnyKey> = Record<T, CSSProperties>

export type Styled<T extends AnyKey> = WithStyles<T> | WithClasses<T>

type WithStyles<T extends AnyKey> = {
  styles: Styles<T>
  classes?: Partial<Classes<T>>
}
type WithClasses<T extends AnyKey> = {
  styles?: Partial<Styles<T>>
  classes: Classes<T>
}
