import React from 'react'
import { makeStyles, Theme, Container, ContainerProps } from '@material-ui/core'
import RichText from 'components/RichText'
import { UseStyles } from 'components/Theme'
import { UseRichTextStyles } from 'components/RichText/useRichTextStyles'
import Asset from 'components/Asset'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      padding: `${theme.gridSpacing.row} ${theme.gridSpacing.column}`,
      gridColumnGap: theme.gridSpacing.column,
      gridRowGap: theme.gridSpacing.row,
      gridTemplateColumns: `1fr`,
      gridTemplateAreas: `
      "one"
      "two"
      "three"
    `,
      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: `1fr 1fr`,
        gridTemplateAreas: `
        "one two"
        "three three"
      `,
      },
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: `1fr 1fr 1fr`,
        gridTemplateAreas: '"one two three"',
      },
    },
    colOne: { gridArea: 'one' },
    colTwo: { gridArea: 'two' },
    colThree: { gridArea: 'three' },
  }),
  { name: 'RowColumnThree' },
)

export type RowColumnThreeProps = GQLRowColumnThreeFragment &
  UseStyles<typeof useStyles> &
  ContainerProps & {
    richTextOneClasses?: UseRichTextStyles['classes']
    richTextTwoClasses?: UseRichTextStyles['classes']
    richTextTheeClasses?: UseRichTextStyles['classes']
  }

const RowColumnThree: React.FC<RowColumnThreeProps> = (props) => {
  const {
    colOne,
    colOneIcon,
    colTwo,
    colTwoIcon,
    colThree,
    colThreeIcon,
    richTextOneClasses,
    richTextTwoClasses,
    richTextTheeClasses,
    ...containerProps
  } = props
  const classes = useStyles(props)

  return (
    <Container className={classes.root} {...containerProps}>
      <div className={classes.colOne}>
        {colOneIcon?.width && <Asset asset={colOneIcon} width={colOneIcon.width / 2} />}
        <RichText {...colOne} classes={richTextOneClasses} />
      </div>
      <div className={classes.colTwo}>
        {colTwoIcon?.width && <Asset asset={colTwoIcon} width={colTwoIcon.width / 2} />}
        <RichText {...colTwo} classes={richTextTwoClasses} />
      </div>
      <div className={classes.colThree}>
        {colThreeIcon?.width && <Asset asset={colThreeIcon} width={colThreeIcon.width / 2} />}
        <RichText {...colThree} classes={richTextTheeClasses} />
      </div>
    </Container>
  )
}

export default RowColumnThree
