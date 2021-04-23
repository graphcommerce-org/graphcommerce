import { Container, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginBottom: `${theme.spacings.xl}`,
      display: 'grid',
      justifyItems: 'center',
      '& > *': {
        width: '100%',
        maxWidth: 800,
      },
    },
    title: {
      ...theme.typography.caption,
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingBottom: theme.spacings.sm,
    },
  }),
  { name: 'ProductReview' },
)

type ProductReviewProps = UseStyles<typeof useStyles> & {
  title: string
  reviews: React.ReactNode
}

export default function ProductReviews(props: ProductReviewProps) {
  const { title, reviews } = props
  const classes = useStyles(props)

  return (
    <Container className={classes.container}>
      <Typography variant='h3' className={classes.title}>
        {title}
      </Typography>
      {reviews}
    </Container>
  )
}
