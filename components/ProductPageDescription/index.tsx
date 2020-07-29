import { Typography } from '@material-ui/core'
import React from 'react'

export default function ProductPageDescription(props: GQLProductPageDescriptionFragment) {
  const { name, short_description, description } = props
  return (
    <>
      <Typography variant='h1'>{name}</Typography>
      {/* eslint-disable-next-line react/no-danger */}
      {short_description && <div dangerouslySetInnerHTML={{ __html: short_description.html }} />}
      {/* eslint-disable-next-line react/no-danger */}
      {description && <div dangerouslySetInnerHTML={{ __html: description.html }} />}
    </>
  )
}
