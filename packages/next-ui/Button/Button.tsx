/* eslint-disable react/forbid-foreign-prop-types */
import type { LoadingButtonProps, LoadingButtonTypeMap } from '@mui/lab'
import { LoadingButton as Button } from '@mui/lab'

export type ButtonProps<
  D extends React.ElementType = LoadingButtonTypeMap['defaultComponent'],
  P = object,
> = LoadingButtonProps<D, P>

export { Button }
