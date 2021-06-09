import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { ProductPageDescriptionFragment } from './ProductPageDescription.gql'

const useStyles = makeStyles((theme: Theme) => ({
  /* nested styles because we don't know beforehand which elements the description contains */
  description: {
    ...theme.typography.h4,
    fontWeight: 400,
    [theme.breakpoints.up('md')]: {
      ...theme.typography.h3,
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

export type ProductPageDescriptionProps = ProductPageDescriptionFragment

export default function ProductPageDescription(props: ProductPageDescriptionProps) {
  const classes = useStyles()
  const { description } = props

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      {description && (
        <div
          className={classes.description}
          dangerouslySetInnerHTML={{ __html: description.html }}
        />
      )}
    </>
  )
}
