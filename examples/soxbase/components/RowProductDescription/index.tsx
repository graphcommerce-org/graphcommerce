import { makeStyles, Container, Theme, Typography } from '@material-ui/core'
import ProductPageDescription, {
  ProductPageDescriptionProps,
} from '@reachdigital/magento-product/ProductPageDescription'
import React, { PropsWithChildren } from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    gap: `${theme.spacings.lg} 0`,
    gridTemplateAreas: `"title"
    "description"
    "usps"`,
    marginBottom: theme.spacings.xl,
    [theme.breakpoints.up('md')]: {
      gridTemplateAreas: `"title ."
      "description usps"`,
      gridTemplateColumns: '3fr 1fr',
      gap: `${theme.spacings.sm} ${theme.spacings.xl}`,
    },
  },
  name: {
    ...theme.typography.h1,
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

type RowProductDescriptionProps = ProductPageDescriptionProps & PropsWithChildren<unknown>

export default function RowProductPageDescription(props: RowProductDescriptionProps) {
  const classes = useStyles()
  const { children, name, description } = props
  return (
    <Container className={classes.root}>
      <Typography variant='h2' className={classes.name}>
        {name ?? ''}
      </Typography>
      {/* eslint-disable-next-line react/no-danger */}
      <ProductPageDescription description={description} />
      {children && children}
    </Container>
  )
}
