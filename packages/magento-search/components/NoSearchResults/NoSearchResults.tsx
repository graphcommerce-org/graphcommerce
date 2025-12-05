import { extendableComponent, sxx } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box, Typography } from '@mui/material'

export type NoSearchResultsProps = { sx?: SxProps<Theme> }

const name = 'NoSearchResults'
const parts = ['root'] as const
const { classes } = extendableComponent(name, parts)

/**
 * @deprecated
 * @public
 */
export function NoSearchResults(props: NoSearchResultsProps) {
  const { sx = [] } = props

  return (
    <Box
      className={classes.root}
      sx={sxx(
        (theme) => ({
          marginTop: theme.spacings.md,
          marginBottom: theme.spacings.sm,
          textAlign: 'center',
        }),
        sx,
      )}
    >
      <Typography variant='h5' align='center'>
        <Trans>We couldn't find any products.</Trans>
      </Typography>
      <p>
        <Trans>Try a different search</Trans>
      </p>
    </Box>
  )
}
