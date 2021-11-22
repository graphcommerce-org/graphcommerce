import { capitalize } from '@material-ui/core'
import clsx from 'clsx'

type PartialMatrix<T, M extends string> = T extends string ? T | `${T}${Capitalize<M>}` : T

type Matrix<T extends string, M extends string> = `${T}${Capitalize<M>}`

// Possible configurations for the AppShellHeader
export type Variant = 'floating'
export type Size = 'sm' | 'md'

// Matrix
export type VariantSize = Matrix<Variant, Size>

export type FloatingProps = Partial<Record<Matrix<Variant, Size>, boolean>>

export type VariantSizeMatrix<T extends string> = PartialMatrix<T, PartialMatrix<Size, Variant>>
