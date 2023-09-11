import { Box, SxProps, Theme } from '@mui/material'

export type UseFormLayoutProps<T> = Pick<FormLayoutProps<T>, 'children'>

export type FormLayoutProps<T> = {
  form: T
  original: React.ReactNode
  children?: (
    props: {
      original: React.ReactNode
    } & T,
  ) => React.ReactNode
  sx?: SxProps<Theme>
}

export function FormLayout<T>(props: FormLayoutProps<T>) {
  const { children, original, form, sx } = props
  return <Box sx={sx}>{children ? children({ original, ...form }) : original}</Box>
}
