import React from 'react'

type TypeObject = { __typename: string; [index: string]: unknown }

type FilterTypeByTypename<A extends TypeObject, Typename extends string> = A extends unknown
  ? A['__typename'] extends Typename
    ? A
    : never
  : never

type TypeRenderMethod<P> = (props: P) => React.ReactElement<any, any> | null

type EventTypeMap<
  T extends TypeObject,
  TypeNames extends string,
  A extends Record<string, unknown>
> = {
  [K in TypeNames]: TypeRenderMethod<FilterTypeByTypename<T, K> & A>
}

/**
 * Example
 */
export default function typeRenderer<
  T extends TypeObject,
  A extends Record<string, unknown> = Record<string, unknown>
>(types: Partial<EventTypeMap<T, T['__typename'], A>>) {
  return function get(object: T): TypeRenderMethod<FilterTypeByTypename<T, T['__typename']> & A> {
    return types[object.__typename]
      ? types[object.__typename]
      : () => <div>{object.__typename}</div>
  }
}
