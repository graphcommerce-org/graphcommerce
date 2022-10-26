/* eslint-disable react/forbid-foreign-prop-types */
import { LoadingButton, LoadingButtonProps, LoadingButtonTypeMap } from '@mui/lab'
import PageLink from 'next/link'

export type ButtonProps<
  D extends React.ElementType = LoadingButtonTypeMap['defaultComponent'],
  P = {},
> = Omit<LoadingButtonProps<D, P>, 'LinkComponent'>

export function Button(props: ButtonProps) {
  return <LoadingButton LinkComponent={PageLink} {...props} />
}
