import { ColumnTwoWithTop, ColumnTwoWithTopProps, UseStyles } from '@graphcommerce/next-ui'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { ProductPageDescriptionFragment } from './ProductPageDescription.gql'
import decode from 'decode-html'

const useStyles = makeStyles((theme: Theme) => ({
  /* nested styles because we don't know beforehand which elements the description contains */
  description: {
    '& p:first-of-type': {
      marginTop: 0,
    },
    '& p, & li': {
      // ...theme.typography.body1,
      fontWeight: 400,

      [theme.breakpoints.up('md')]: {
        // ...theme.typography.h3,
        fontWeight: 400,
        '@supports (font-variation-settings: normal)': {
          fontVariationSettings: "'wght' 420",
        },
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

export type ProductPageDescriptionProps = UseStyles<typeof useStyles> &
  ProductPageDescriptionFragment &
  Omit<ColumnTwoWithTopProps, 'top' | 'left'>

export default function ProductPageDescription(props: ProductPageDescriptionProps) {
  const classes = useStyles(props)
  const { description, name, right } = props

  return (
    <ColumnTwoWithTop
      top={
        <Typography variant='h1' component='h2'>
          {name}
        </Typography>
      }
      left={
        description && (
          <div
            className={classes.description}
            // eslint-disable-next-line react/no-danger
            style={{ minWidth: '90%' }}
            dangerouslySetInnerHTML={{ __html: decode(description.html) }}
          />
        )
      }
      right={''}
    />
  )
}
