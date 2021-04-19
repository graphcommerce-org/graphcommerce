import { Typography } from '@material-ui/core'
import React from 'react'
import { CategoryDescriptionFragment } from './CategoryDescription.gql'
import useCategoryPageStyles from './useCategoryPageStyles'

type CategoryTitleDescriptionProps = CategoryDescriptionFragment & JSX.IntrinsicElements['div']

export default function CategoryTitleDescription(props: CategoryTitleDescriptionProps) {
  const { name, description, display_mode, ...divProps } = props
  const classes = useCategoryPageStyles(props)

  return (
    <div {...divProps} className={classes.description}>
      <Typography variant='h2' component='h1' align='center'>
        {name}
      </Typography>
      {/* todo: replace with proper content renderer */}
      {/* eslint-disable-next-line react/no-danger */}
      {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
    </div>
  )
}
