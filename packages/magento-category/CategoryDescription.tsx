import { Typography } from '@material-ui/core'
import React from 'react'
import { CategoryDescriptionFragment } from './CategoryDescription.gql'

type CategoryDescriptionProps = CategoryDescriptionFragment & JSX.IntrinsicElements['div']

export default function CategoryDescription(props: CategoryDescriptionProps) {
  const { name, description, display_mode, ...divProps } = props

  return (
    <div {...divProps}>
      <Typography variant='h2' component='h1' align='center'>
        {name}
      </Typography>
      {/* todo: replace with proper content renderer */}
      {/* eslint-disable-next-line react/no-danger */}
      {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
    </div>
  )
}
