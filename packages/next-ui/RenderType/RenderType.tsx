import React from 'react'

/** To make renderers customizable we need to be able to provide renders for all types */
type TypeObject = { __typename: string; [index: string]: unknown }

type FilterTypeByTypename<A extends TypeObject, Typename extends string> = A extends unknown
  ? A['__typename'] extends Typename
    ? A
    : never
  : never

type TypeRenderMethod<P> = (props: P) => React.ReactNode

type TypeRenderMap<
  T extends TypeObject,
  TypeNames extends string,
  TAdd extends Record<string, unknown>,
> = {
  [K in TypeNames]: TypeRenderMethod<FilterTypeByTypename<T, K> & TAdd>
}

export type TypeRenderer<
  T extends TypeObject,
  TAdd extends Record<string, unknown> = Record<string, unknown>,
> = TypeRenderMap<T, T['__typename'], TAdd>

/**
 * A simple array with renderers but with strict typing that validates of the provided Renderer is
 * actually able to render the Type
 */
export function RenderType<
  T extends TypeObject,
  A extends Record<string, unknown> = Record<string, unknown>,
>(props: { renderer: TypeRenderer<T, A> } & FilterTypeByTypename<T, T['__typename']> & A) {
  const { renderer, __typename, ...typeItemProps } = props
  const TypeItem: TypeRenderMethod<typeof typeItemProps> = renderer[__typename]
    ? renderer[__typename]
    : () => <>{process.env.NODE_ENV !== 'production' ? __typename : ''}</>

  return <TypeItem {...typeItemProps} __typename={__typename} />
}

export function findByTypename<T extends TypeObject, Typename extends T['__typename']>(
  type: (T | undefined | null)[] | undefined | null,
  typename: Typename,
): FilterTypeByTypename<T, Typename> | undefined {
  return type?.find((item) => item?.__typename === typename) as FilterTypeByTypename<T, Typename>
}

export function isTypename<T extends TypeObject, Typenames extends T['__typename'][]>(
  type: FilterTypeByTypename<T, T['__typename']>,
  typename: Typenames,
): type is FilterTypeByTypename<T, Typenames[number]> {
  return typename.includes(type.__typename)
}

export function filterByTypename<T extends TypeObject, Typename extends T['__typename']>(
  type: (T | undefined | null)[] | undefined | null,
  typename: Typename,
): FilterTypeByTypename<T, Typename>[] | undefined {
  return type?.filter((item) => item?.__typename === typename) as FilterTypeByTypename<
    T,
    Typename
  >[]
}
