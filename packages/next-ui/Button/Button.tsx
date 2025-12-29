/* eslint-disable react/forbid-foreign-prop-types */
import type { ButtonTypeMap, ButtonProps as MuiButtonProps } from '@mui/material'
import { Button } from '@mui/material'

export type ButtonProps<
  D extends React.ElementType = ButtonTypeMap['defaultComponent'],
  P = object,
> = MuiButtonProps<D, P>

export { Button }
