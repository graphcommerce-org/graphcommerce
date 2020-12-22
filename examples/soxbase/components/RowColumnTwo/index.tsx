import { makeStyles, Theme, Container, ContainerProps } from '@material-ui/core'
import RichText from '@reachdigital/graphcms-ui/RichText'
import { UseRichTextStyles } from '@reachdigital/graphcms-ui/RichText/useRichTextStyles'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import React from 'react'
import { RowColumnTwoFragment } from './RowColumnTwo.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      gridColumnGap: theme.spacings.md,
      gridRowGap: theme.spacings.lg,
      marginBottom: theme.spacings.lg,
      display: `grid`,
      gridTemplateColumns: `1fr`,
      gridTemplateAreas: `"one" "two"`,

      '& h2, & h3': {
        ...theme.typography.h4,
      },

      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: `1fr 1fr`,
        gridTemplateAreas: `"one two"`,
      },
    },
    colOne: { gridArea: 'one' },
    colTwo: { gridArea: 'two' },
  }),
  { name: 'RowColumnTwo' },
)

export type RowColumnTwoProps = RowColumnTwoFragment &
  UseStyles<typeof useStyles> &
  Omit<ContainerProps, 'children'> & {
    richTextOneClasses?: UseRichTextStyles['classes']
    richTextTwoClasses?: UseRichTextStyles['classes']
  }

export default function RowColumnTwo(props: RowColumnTwoProps) {
  const { colOne, colTwo, richTextOneClasses, richTextTwoClasses, ...containerProps } = props
  const classes = useStyles(props)

  return (
    <Container maxWidth='lg' {...containerProps} className={classes.root}>
      <div className={classes.colOne}>
        <RichText {...colOne} classes={richTextOneClasses} />
      </div>
      <div className={classes.colTwo}>
        <RichText {...colTwo} classes={richTextTwoClasses} />
      </div>
    </Container>
  )
}
