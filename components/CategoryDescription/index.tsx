import React from 'react'
import { Typography } from '@material-ui/core'

type CategoryDescriptionProps = GQLCategoryDescriptionFragment & JSX.IntrinsicElements['div']

export default function CategoryDescription(props: CategoryDescriptionProps) {
  const { name, description, ...divProps } = props
  return (
    <div {...divProps}>
      <Typography variant='h1'>{name}</Typography>
      {/* todo: replace with proper content renderer */}
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  )
}
