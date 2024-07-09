import { extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, SxProps, Theme, Typography } from '@mui/material'

export type NoSearchResultsProps = { sx?: SxProps<Theme> }

const name = 'NoSearchResults' as const
const parts = ['root'] as const
const { classes } = extendableComponent(name, parts)

export function NoSearchResults(props: NoSearchResultsProps) {
  const { sx = [] } = props

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
        <Trans id="We couldn't find any products." />
      </Typography>
      <p>
        <Trans id='Try a different search' />
      </p>
    </Box>
  )
}
