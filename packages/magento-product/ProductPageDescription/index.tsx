import { makeStyles, Container, Theme, Typography } from '@material-ui/core'
import React, { PropsWithChildren } from 'react'
import { ProductPageDescriptionFragment } from './ProductPageDescription.gql'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    gap: `${theme.spacings.lg} 0`,
    gridTemplateAreas: `"title"
    "description"
    "usps"`,
    marginTop: theme.spacings.xxl,
    marginBottom: theme.spacings.xxl,
    [theme.breakpoints.up('md')]: {
      gridTemplateAreas: `"title ."
      "description usps"`,
      gridTemplateColumns: '3fr 1fr',
      gap: `${theme.spacings.lg} ${theme.spacings.xl}`,
    },
  },
  description: {
    gridArea: 'description',
    '& p:first-of-type': {
      marginTop: 0,
    },
    '& p, & li': {
      ...theme.typography.h4,
      fontWeight: 400,
      [theme.breakpoints.up('md')]: {
        ...theme.typography.h3,
        fontWeight: 400,
      },
    },
    '& ul': {
      padding: 0,
      margin: 0,
      display: 'inline',
      listStyleType: 'none',
    },
    '& li': {
      display: 'inline',
    },
  },
}))

type ProductPageDescriptionProps = PropsWithChildren<unknown> & ProductPageDescriptionFragment

export default function ProductPageDescription(props: ProductPageDescriptionProps) {
  const classes = useStyles()
  const { description, name, children } = props
  return (
    <Container className={classes.root}>
      <Typography variant='h2'>{name ?? ''}</Typography>
      {/* eslint-disable-next-line react/no-danger */}
      {description && (
        <div
          className={classes.description}
          dangerouslySetInnerHTML={{ __html: description.html }}
        />
      )}
      {children && children}
    </Container>
  )
}
