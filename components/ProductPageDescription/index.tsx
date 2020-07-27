import React from 'react'
import { Typography } from '@material-ui/core'

export function ProductPageDescription(props: GQLProductPageDescriptionFragment) {
  const { name, short_description, description } = props
  return (
    <>
      <Typography variant='h1'>{name}</Typography>
      {short_description && <div dangerouslySetInnerHTML={{ __html: short_description.html }} />}
      {description && <div dangerouslySetInnerHTML={{ __html: description.html }} />}
    </>
  )
}
