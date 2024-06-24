import { extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, SxProps, Theme, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export type NoSearchResultsProps = { search: string; sx?: SxProps<Theme> }

const name = 'NoSearchResults' as const
const parts = ['root'] as const
const { classes } = extendableComponent(name, parts)

export function NoSearchResults(props: NoSearchResultsProps) {
  const { search, sx = [] } = props

  const term = search ? `'${search}'` : 'DIT NOG FIXEN'

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
        <Trans id="We couldn't find any results for {term}" values={{ term }} />
      </Typography>
      <p>
        <Trans id='Try a different search' />
      </p>
    </Box>
  )
}
