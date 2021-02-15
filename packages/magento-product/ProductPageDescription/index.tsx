import { makeStyles, Container, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { ProductPageDescriptionFragment } from './ProductPageDescription.gql'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    gap: theme.spacings.lg,
    marginTop: theme.spacings.xxl,
    marginBottom: theme.spacings.xxl,
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '3fr 1fr',
    },
  },
  description: {
    '& p': {
      ...theme.typography.h3,
      fontWeight: 400,
    },
    '& ul': {
      padding: 0,
      margin: 0,
      display: 'inline',
      listStyleType: 'none',
    },
    '& li': {
      display: 'inline',
      ...theme.typography.h3,
      fontWeight: 400,
    },
  },
}))

export default function ProductPageDescription(props: ProductPageDescriptionFragment) {
  const classes = useStyles()
  const { description, name } = props
  return (
    <Container className={classes.root}>
      <div className={classes.description}>
        <Typography variant='h2'>{name ?? ''}</Typography>
        {/* eslint-disable-next-line react/no-danger */}
        {description && <div dangerouslySetInnerHTML={{ __html: description.html }} />}
      </div>
    </Container>
  )
}
