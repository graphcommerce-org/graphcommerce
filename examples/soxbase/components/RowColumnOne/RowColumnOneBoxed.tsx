import { Container, ContainerProps, makeStyles, Theme } from '@material-ui/core'
import RichText from '@reachdigital/graphcms-ui/RichText'
import { UseRichTextStyles } from '@reachdigital/graphcms-ui/RichText/useRichTextStyles'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import React from 'react'
import { RowColumnOneFragment } from './RowColumnOne.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      marginBottom: theme.spacings.lg,
    },
    boxed: {
      padding: theme.spacings.lg,
      boxShadow: theme.shadows[24],
      '& h1, & h2, & h3': {
        marginTop: 0,
      },
    },
  }),
  { name: 'RowColumnOneBoxed' },
)

export type RowColumnOneBoxedProps = RowColumnOneFragment &
  UseStyles<typeof useStyles> &
  Omit<ContainerProps, 'children'> & {
    richTextOneClasses?: UseRichTextStyles['classes']
  }

function RowColumnOneBoxed(props: RowColumnOneBoxedProps) {
  const { colOne, richTextOneClasses, ...containerProps } = props
  const classes = useStyles(props)

  return (
    <Container {...containerProps} className={classes.root}>
      <div className={classes.boxed}>
        <RichText {...colOne} classes={richTextOneClasses} />
      </div>
    </Container>
  )
}

export default RowColumnOneBoxed
