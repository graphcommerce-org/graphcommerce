import { Box, type SxProps, type Theme } from '@mui/material'
import type { UseIntlDisplayNamesOptions } from './useIntlDisplayNames'
import { useIntlDisplayNames } from './useIntlDisplayNames'

export type DisplayNamesProps = UseIntlDisplayNamesOptions & {
  code: string
  sx?: SxProps<Theme>
}

/** @public */
export function DisplayNames(props: DisplayNamesProps) {
  const { code, sx, ...options } = props
  const formatter = useIntlDisplayNames(options)

  return (
    <Box component='span' suppressHydrationWarning sx={sx}>
      {formatter.of(code)}
    </Box>
  )
}
