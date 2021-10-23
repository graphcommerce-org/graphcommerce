import { UseStyles } from '@graphcommerce/next-ui'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { CategoryDescriptionFragment } from './CategoryDescription.gql'

type CategoryDescriptionProps = Omit<CategoryDescriptionFragment, 'uid'> &
  JSX.IntrinsicElements['div'] &
  UseStyles<typeof useStyles>

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      gridArea: 'description',
      margin: '0 auto',
      textAlign: 'center',
      maxWidth: 732,
      marginTop: theme.spacings.md,
      marginBottom: theme.spacings.sm,
      ...theme.typography.body1,
    },
  }),
  { name: 'CategoryDescription' },
)

export default function CategoryDescription(props: CategoryDescriptionProps) {
  const { name, description, display_mode, ...divProps } = props
  const classes = useStyles(props)

  return (
    <div {...divProps} className={classes.root}>
      {/* todo: replace with proper content renderer */}
      {/* eslint-disable-next-line react/no-danger */}
      {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
    </div>
  )
}
