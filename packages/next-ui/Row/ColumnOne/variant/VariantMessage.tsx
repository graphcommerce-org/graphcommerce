import { Portal } from '@mui/material'
import { DismissibleSnackbar, DismissibleSnackbarProps } from '../../../Snackbar/DismissibleSnackbar'

export type VariantMessageProps = DismissibleSnackbarProps

export function VariantMessage(props: VariantMessageProps) {
  const { sx, ...rest } = props

  return (
    <Portal>
      <DismissibleSnackbar
        open
        variant='pill'
        severity='info'
        {...rest}
        sx={[
          {
            pointerEvents: 'none',
            '& > *': { pointerEvents: 'auto' },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      />
    </Portal>
  )
}
