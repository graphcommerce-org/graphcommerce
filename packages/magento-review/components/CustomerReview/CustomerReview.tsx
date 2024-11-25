import { Image } from '@graphcommerce/image'
import { DateTimeFormat, IconSvg, extendableComponent, responsiveVal } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import type { CustomerReviewFragment } from './CustomerReview.gql'
import filledStar from './review_star_filled.svg'
import outlinedStar from './review_star_outlined.svg'

type CustomerReviewProps = CustomerReviewFragment & { sx?: SxProps<Theme> }

const { classes } = extendableComponent('ScrollerDots', [
  'container',
  'image',
  'stars',
  'title',
  'text',
  'date',
] as const)

export function CustomerReview(props: CustomerReviewProps) {
  const { product, text, average_rating, created_at, sx = [] } = props

  const maxAverageRating = 100
  const totalStars = 5
  const valuePerStar = maxAverageRating / totalStars
  const totalFilledStars = (average_rating / maxAverageRating / valuePerStar) * 100

  return (
    <Box
      className={classes.container}
      sx={[
        (theme) => ({
          padding: `${theme.spacings.md} 0 ${theme.spacings.md} 0`,
          display: 'grid',
          gridTemplateAreas: `
            "image stars"
            "image title"
            "image text"
            "image date"`,
          gridTemplateColumns: `${responsiveVal(96, 196)} 1fr`,
          gridColumnGap: theme.spacings.md,
          gridRowGap: theme.spacings.sm,
          alignItems: 'start',
          typography: 'body1',
          borderBottom: `1px solid ${theme.palette.divider}`,
          [theme.breakpoints.up('sm')]: {
            gridRowGap: theme.spacings.xxs,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        className={classes.image}
        sx={{
          gridArea: 'image',
          '& img': {
            width: '100%',
            height: 'auto',
          },
        }}
      >
        {product && product.thumbnail && (
          <Image
            src={product.thumbnail?.url ?? ''}
            width={196}
            height={196}
            alt={product.thumbnail?.label ?? ''}
          />
        )}
      </Box>
      <Box className={classes.stars} sx={{ gridArea: 'stars', margin: '-6px 0 -6px -6px' }}>
        {[...new Array(totalStars)].map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <IconSvg key={index} src={index < totalFilledStars ? filledStar : outlinedStar} />
        ))}
      </Box>
      <Box
        className={classes.title}
        sx={(theme) => ({ gridArea: 'title', fontWeight: theme.typography.fontWeightBold })}
      >
        {product?.name}
      </Box>
      <Box className={classes.text} sx={{ gridArea: 'text' }}>
        {text}
      </Box>
      <Box
        className={classes.date}
        sx={(theme) => ({
          gridArea: 'date',
          fontStyle: 'italic',
          color: theme.palette.text.disabled,
        })}
      >
        <DateTimeFormat date={created_at} />
      </Box>
    </Box>
  )
}
