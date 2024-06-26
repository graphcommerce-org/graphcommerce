import {
  useProductFilterProHasFiltersApplied,
  useProductFiltersProClearAllAction,
} from '@graphcommerce/magento-product'
import { extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Box, Link, SxProps, Theme, Typography } from '@mui/material'

export type NoSearchResultsProps = { search: string; sx?: SxProps<Theme> }

const name = 'NoSearchResults' as const
const parts = ['root'] as const
const { classes } = extendableComponent(name, parts)

export function NoSearchResults(props: NoSearchResultsProps) {
  const { search, sx = [] } = props

  const term = search ? `'${search}'` : ''

  const clearAll = useProductFiltersProClearAllAction()
  const hasFilters = useProductFilterProHasFiltersApplied()

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
        {hasFilters ? (
          <Trans>
            Try a different search or{' '}
            <Link
              href='#'
              onClick={(e) => {
                e.preventDefault()
                return clearAll()
              }}
            >
              clear current filters
            </Link>
          </Trans>
        ) : (
          <Trans>Try a different search</Trans>
        )}
      </p>
    </Box>
  )
}
