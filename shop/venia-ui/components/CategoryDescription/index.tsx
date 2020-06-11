import React from 'react'
import { Typography } from '@material-ui/core'

export default function CategoryDescription(props: GQLCategoryDescriptionFragment) {
  const { name, description } = props
  return (
    <div>
      <Typography variant='h1'>{name}</Typography>
      {/* todo: replace with proper content renderer */}
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  )
}
