import React from 'react'
import { Theme, makeStyles } from '@material-ui/core'
import { UseStyles, vpCalc } from 'components/Theme'

const useReviewStyles = makeStyles(
  (theme: Theme) => ({
    review: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      alignItems: 'center',
      paddingTop: theme.spacings.md,
      paddingBottom: theme.spacings.md,
      borderBottom: `1px solid ${theme.palette.divider}`,
      ...theme.typography.body1,

      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '1fr 30%',
      },

      '& blockquote': {
        paddingLeft: vpCalc(10, 30),
        borderLeft: `4px solid ${theme.palette.primary.mutedText}`,
        color: '#777',
        margin: '0 0 20px',

        [theme.breakpoints.up('md')]: {
          marginBottom: 0,
          paddingRight: theme.spacings.md,
        },
      },
    },
    customer: {
      fontStyle: 'italic',
      [theme.breakpoints.up('md')]: {
        marginLeft: 30,
      },
    },
    stars: {
      color: '#ffd800',
    },
    customerName: {
      fontStyle: 'italic',
    },
  }),
  { name: 'Review' },
)

export type RowReviewProps = GQLReviewFragment & UseStyles<typeof useReviewStyles>

const Rating: React.FC<RowReviewProps> = (props) => {
  const { customerName, rating, quote } = props
  const classes = useReviewStyles()

  return (
    <div className={classes.review}>
      <blockquote>{quote}</blockquote>
      <div className={classes.customer}>
        <span className={classes.stars}>{'★'.repeat(Math.max(0, rating))}</span> -{' '}
        <span className={classes.customerName}>{customerName}</span>
      </div>
    </div>
  )
}

export default Rating
