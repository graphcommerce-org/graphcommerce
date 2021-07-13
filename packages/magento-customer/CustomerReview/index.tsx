import { useQuery } from '@apollo/client'
import { makeStyles, Theme } from '@material-ui/core'
import { Image } from '@reachdigital/image'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import { responsiveVal } from '@reachdigital/next-ui'
import { CustomerReviewFragment } from './CustomerReview.gql'
import filledStar from './review_star_filled.svg'
import outlinedStar from './review_star_outlined.svg'

type CustomerReviewProps = CustomerReviewFragment

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      padding: `${theme.spacings.md} 0 ${theme.spacings.md} 0`,
      display: 'grid',
      gridTemplateAreas: `
      'image stars'
      'image title'
      'image text'
      'image date'`,
      gridTemplateColumns: `${responsiveVal(96, 196)} 1fr`,
      gridColumnGap: theme.spacings.md,
      gridRowGap: theme.spacings.sm,
      alignItems: 'start',
      ...theme.typography.body1,
      borderBottom: `1px solid ${theme.palette.divider}`,
      [theme.breakpoints.up('sm')]: {
        gridRowGap: theme.spacings.xxs,
      },
    },
    image: {
      gridArea: 'image',
      '& img': {
        width: '100%',
        height: 'auto',
      },
    },
    stars: {
      gridArea: 'stars',
      margin: '-6px 0 -6px -6px',
    },
    title: {
      gridArea: 'title',
      fontWeight: theme.typography.fontWeightBold,
    },
    text: {
      gridArea: 'text',
    },
    date: {
      gridArea: 'date',
      fontStyle: 'italic',
      color: theme.palette.primary.mutedText,
    },
  }),
  { name: 'CustomerReview' },
)

export default function CustomerReview(props: CustomerReviewProps) {
  const { product, text, average_rating, created_at } = props
  const classes = useStyles()

  const maxAverageRating = 100
  const totalStars = 5
  const valuePerStar = maxAverageRating / totalStars
  const totalFilledStars = (average_rating / maxAverageRating / valuePerStar) * 100

  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale?.replace('_', '-')

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className={classes.container}>
      <div className={classes.image}>
        {product && product.thumbnail && (
          <Image
            src={product.thumbnail?.url ?? ''}
            width={196}
            height={196}
            alt={product.thumbnail?.label ?? ''}
          />
        )}
      </div>
      <div className={classes.stars}>
        {[...new Array(totalStars)].map((value, index) => (
          <Image
            src={index < totalFilledStars ? filledStar : outlinedStar}
            alt='star'
            loading='eager'
          />
        ))}
      </div>
      <div className={classes.title}>{product?.name}</div>
      <div className={classes.text}>{text}</div>
      <div className={classes.date}>{dateFormatter.format(new Date(created_at ?? ''))}</div>
    </div>
  )
}
