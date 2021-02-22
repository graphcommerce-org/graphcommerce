import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { ProductPageDescriptionFragment } from './ProductPageDescription.gql'

const useStyles = makeStyles((theme: Theme) => ({
  description: {
    gridArea: 'description',
    '& p:first-of-type': {
      marginTop: 0,
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
