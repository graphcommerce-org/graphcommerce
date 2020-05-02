import React from 'react'
import { makeStyles, Theme, Container, ContainerProps } from '@material-ui/core'
import RichText from '../RichText'
import Asset from '../Asset'
import { UseStyles } from '../Theme'
import { UseRichTextStyles } from '../RichText/useRichTextStyles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      gridColumnGap: theme.gridSpacing.column,
      gridRowGap: theme.gridSpacing.row,
      marginBottom: theme.spacings.xl,
      display: `grid`,
      gridTemplateColumns: `1fr`,
      gridTemplateAreas: `
        "one"
        "two"
      `,
      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: `1fr 1fr`,
        gridTemplateAreas: `
          "one two"
        `,
      },
    },
    colOne: { gridArea: 'one' },
    colTwo: { gridArea: 'two' },
  }),
  { name: 'RowColumnTwo' },
)

export type RowColumnTwoProps = GQLRowColumnTwoFragment &
  UseStyles<typeof useStyles> &
  ContainerProps & {
    richTextOneClasses?: UseRichTextStyles['classes']
    richTextTwoClasses?: UseRichTextStyles['classes']
  }

const RowColumnTwo: React.FC<RowColumnTwoProps> = (props) => {
  const {
    colOne,
    colOneIcon,
    colTwo,
    colTwoIcon,
    richTextOneClasses: richTextOne,
    richTextTwoClasses: richTextTwo,
    ...containerProps
  } = props
  const classes = useStyles(props)

  return (
    <Container maxWidth='lg' {...containerProps} className={classes.root}>
      <div className={classes.colOne}>
        {colOneIcon?.width && <Asset asset={colOneIcon} width={60} />}
        <RichText {...colOne} classes={richTextOne} />
      </div>
      <div className={classes.colTwo}>
        {colTwoIcon?.width && <Asset asset={colTwoIcon} width={60} />}
        <RichText {...colTwo} classes={richTextTwo} />
      </div>
    </Container>
  )
}

export default RowColumnTwo
