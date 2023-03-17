/* eslint-disable react/forbid-foreign-prop-types */
import { LoadingButton as Button, LoadingButtonProps, LoadingButtonTypeMap } from '@mui/lab'

export type ButtonProps<
  D extends React.ElementType = LoadingButtonTypeMap['defaultComponent'],
  P = object,
> = LoadingButtonProps<D, P>

export { Button }
