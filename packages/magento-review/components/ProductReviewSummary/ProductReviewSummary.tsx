import { IconSvg, extendableComponent, iconStar } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import type { ProductReviewSummaryFragment } from './ProductReviewSummary.gql'

export type ProductReviewSummaryProps = ProductReviewSummaryFragment & { sx?: SxProps<Theme> }

const name = 'ProductReviewSummary'
const parts = ['root', 'rating', 'iconStar', 'iconStarDisabled'] as const
const { classes } = extendableComponent(name, parts)

export function ProductReviewSummary(props: ProductReviewSummaryProps) {
  const { rating_summary, sx = [] } = props

  if (!rating_summary) return null

  const disabledStar = (
    <IconSvg
      src={iconStar}
      size='xs'
      className={classes.iconStarDisabled}
      sx={(theme) => ({ stroke: 'none', fill: theme.palette.grey[300] })}
    />
  )

  const star = (
    <IconSvg
      src={iconStar}
      size='xs'
      className={classes.iconStar}
      sx={{ stroke: 'none', fill: '#FFDA1C' }}
    />
  )

  return (
    <Box
      className={classes.root}
      sx={[
        {
          width: 'max-content',
          position: 'relative',
          '& > div': {
            lineHeight: 0,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <div>
        {disabledStar}
        {disabledStar}
        {disabledStar}
        {disabledStar}
        {disabledStar}
      </div>
      <Box
        className={classes.rating}
        style={{ width: `${rating_summary}%` }}
        sx={{
          position: 'absolute',
          top: 0,
          overflow: 'hidden',
          '& > div': { whiteSpace: 'nowrap' },
        }}
      >
        <div>
          {star}
          {star}
          {star}
          {star}
          {star}
        </div>
      </Box>
    </Box>
  )
}
