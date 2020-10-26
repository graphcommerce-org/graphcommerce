import { Typography } from '@material-ui/core'
import React from 'react'
import { ProductPageDescriptionFragment } from './ProductPageDescription.graphql'

export default function ProductPageDescription(props: ProductPageDescriptionFragment) {
  const { name, short_description, description } = props
  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      {short_description && <div dangerouslySetInnerHTML={{ __html: short_description.html }} />}
      {/* eslint-disable-next-line react/no-danger */}
      {description && <div dangerouslySetInnerHTML={{ __html: description.html }} />}
    </>
  )
}
