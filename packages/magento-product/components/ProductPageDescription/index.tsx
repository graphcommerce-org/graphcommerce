import { ColumnTwoWithTop, ColumnTwoWithTopProps } from '@graphcommerce/next-ui'
import { Theme, Typography } from '@mui/material'
import { makeStyles } from '@graphcommerce/next-ui'
import React from 'react'
import { ProductPageDescriptionFragment } from './ProductPageDescription.gql'

const useStyles = makeStyles()((theme: Theme) => ({
  /* nested styles because we don't know beforehand which elements the description contains */
  description: {
    '& p:first-of-type': {
      marginTop: 0,
    },
    '& p, & li': {
      ...theme.typography.body1,
      fontWeight: 400,

      [theme.breakpoints.up('md')]: {
        ...theme.typography.h3,
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

export type ProductPageDescriptionProps = ProductPageDescriptionFragment &
  Omit<ColumnTwoWithTopProps, 'top' | 'left'>

export default function ProductPageDescription(props: ProductPageDescriptionProps) {
  const { classes } = useStyles()
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
            dangerouslySetInnerHTML={{ __html: description.html }}
          />
        )
      }
      right={right}
    />
  )
}
