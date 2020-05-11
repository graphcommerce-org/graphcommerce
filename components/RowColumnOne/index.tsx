import React from 'react'
import { makeStyles, Theme, Container, ContainerProps } from '@material-ui/core'
import RichText from 'components/RichText'
import { UseStyles } from 'components/Theme'
import { UseRichTextStyles } from 'components/RichText/useRichTextStyles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      padding: `${theme.gridSpacing.row} ${theme.gridSpacing.column}`,
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr',
    },
    colOne: { gridArea: 'one' },
  }),
  { name: 'RowColumnOne' },
)

export type RowColumnOneProps = GQLRowColumnOneFragment &
  UseStyles<typeof useStyles> &
  ContainerProps & {
    richTextOneClasses?: UseRichTextStyles['classes']
  }

const RowColumnOne: React.FC<RowColumnOneProps> = (props) => {
  const { colOne, colOneIcon, richTextOneClasses, ...containerProps } = props
  const classes = useStyles(props)

  return (
    <Container className={classes.root} {...containerProps}>
      <div className={classes.colOne}>
        <RichText {...colOne} classes={richTextOneClasses} />
      </div>
    </Container>
  )
}

export default RowColumnOne
