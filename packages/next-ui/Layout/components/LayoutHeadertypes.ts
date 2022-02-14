type Matrix<T extends string, M extends string> = `${T}${Capitalize<M>}`

// Possible configurations for the LayoutHeader
export type Variant = 'floating'
export type Size = 'sm' | 'md'

// Matrix
export type VariantSize = Matrix<Variant, Size>

export type FloatingProps = Partial<Record<Matrix<Variant, Size>, boolean>>
