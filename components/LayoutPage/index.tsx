import React from 'react'
import { NextPage } from 'next'
import { SetRequired } from 'type-fest'

export function assertLayoutPage<P = Record<string, unknown>, IP = P>(
  Component: NextPage<P, IP> | SetRequired<LayoutPage<P, IP>, 'Layout'>,
): asserts Component is SetRequired<LayoutPage<P, IP>, 'Layout'> {
  if ((Component as LayoutPage<P, IP>).Layout === undefined) {
    throw new Error('Page must implement a layout')
  }
}

export type LayoutPage<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  Layout?: React.FC<IP>
}
