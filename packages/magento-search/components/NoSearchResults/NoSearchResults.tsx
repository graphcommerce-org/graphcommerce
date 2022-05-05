import { Trans } from '@graphcommerce/lingui-next'
import { extendableComponent } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme, Typography } from '@mui/material'

export type NoSearchResultsProps = { search: string; sx?: SxProps<Theme> }

const name = 'NoSearchResults' as const
const parts = ['root'] as const
const { classes } = extendableComponent(name, parts)

export function NoSearchResults(props: NoSearchResultsProps) {
  const { search, sx = [] } = props

  const term = `'${search}'`

  return (
    <Box
      className={classes.root}
      sx={[
        (theme) => ({
          marginTop: theme.spacings.md,
          marginBottom: theme.spacings.sm,
          textAlign: 'center',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography variant='h5' align='center'>
        <Trans>We couldn&apos;t find any results for {term}</Trans>
      </Typography>
      <p>
        <Trans>Try a different search</Trans>
      </p>
    </Box>
  )
}
