import React from 'react'
import FullPageShellBase, { FullPageShellBaseProps } from './FullPageShellBase'

export type MinimalPageShellBaseProps = FullPageShellBaseProps

export default function MinimalPageShellBase(props: MinimalPageShellBaseProps) {
  return <FullPageShellBase {...props} />
}
