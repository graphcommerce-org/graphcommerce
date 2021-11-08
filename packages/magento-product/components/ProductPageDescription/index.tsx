import { ColumnTwoWithTop, ColumnTwoWithTopProps } from '@graphcommerce/next-ui'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { ProductPageDescriptionFragment } from './ProductPageDescription.graphql'

const useStyles = makeStyles((theme: Theme) => ({
  /* nested styles because we don't know beforehand which elements the description contains */
  description: {
    ...theme.typography.body2,
    fontWeight: 400,
    [theme.breakpoints.up('md')]: {
      ...theme.typography.h4,
      lineHeight: 1.7,
      fontWeight: 400,
    },
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

export type ProductPageDescriptionProps = ProductPageDescriptionFragment &
  Omit<ColumnTwoWithTopProps, 'top' | 'left'>

export default function ProductPageDescription(props: ProductPageDescriptionProps) {
  const classes = useStyles()
  const { description, name, right } = props

  return (
    <>
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
              dangerouslySetInnerHTML={{ __html: description.html }}
            />
          )
        }
        right={right}
      />
    </>
  )
}
