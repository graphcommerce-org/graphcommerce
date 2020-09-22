import { Typography } from '@material-ui/core'
import React from 'react'

type CategoryDescriptionProps = GQLCategoryDescriptionFragment & JSX.IntrinsicElements['div']

export default function CategoryDescription(props: CategoryDescriptionProps) {
  const { name, description, ...divProps } = props
  return (
    <div {...divProps}>
      <Typography variant='h2' component='h1'>
        {name}
      </Typography>
      {/* todo: replace with proper content renderer */}
      {/* eslint-disable-next-line react/no-danger */}
      {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
    </div>
  )
}
