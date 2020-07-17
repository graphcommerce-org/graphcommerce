import React from 'react'
import { NextPage } from 'next'
import { SetRequired } from 'type-fest'

export function isLayoutPage<P = Record<string, unknown>, IP = P>(
  Component: NextPage<P, IP> | SetRequired<LayoutPage<P, IP>, 'Layout'>,
): Component is SetRequired<LayoutPage<P, IP>, 'Layout'> {
  return (Component as LayoutPage<P, IP>).Layout !== undefined
}

export type LayoutPage<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  Layout?: React.FC<IP>
}
