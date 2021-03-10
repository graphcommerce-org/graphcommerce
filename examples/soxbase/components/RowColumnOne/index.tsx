import { Container, ContainerProps, makeStyles, Theme } from '@material-ui/core'
import RichText from '@reachdigital/graphcms-ui/RichText'
import { UseRichTextStyles } from '@reachdigital/graphcms-ui/RichText/useRichTextStyles'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import React from 'react'
import type { RowColumnOneFragment } from './RowColumnOne.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      maxWidth: 820,
      marginBottom: theme.spacings.lg,
    },
  }),
  { name: 'RowColumnOne' },
)

export type RowColumnOneProps = RowColumnOneFragment &
  UseStyles<typeof useStyles> &
  Omit<ContainerProps, 'children'> & {
    richTextOneClasses?: UseRichTextStyles['classes']
  }

export default function RowColumnOne(props: RowColumnOneProps) {
  const { colOne, richTextOneClasses, ...containerProps } = props
  const classes = useStyles(props)

  return (
    <Container maxWidth='md' {...containerProps} className={classes.root}>
      <div>
        <RichText {...colOne} classes={richTextOneClasses} />
      </div>
    </Container>
  )
}
