import React from 'react'
import { Container, ContainerProps, makeStyles, Theme } from '@material-ui/core'
import RichText from 'components/RichText'
import { UseRichTextStyles } from 'components/RichText/useRichTextStyles'
import { UseStyles } from 'components/Theme'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      marginBottom: theme.spacings.xl,
    },
  }),
  { name: 'RowColumnOne' },
)

export type RowColumnOneProps = GQLRowColumnOneFragment &
  UseStyles<typeof useStyles> &
  Omit<ContainerProps, 'children'> & {
    richTextOneClasses?: UseRichTextStyles['classes']
  }

const RowColumnOne: React.FC<RowColumnOneProps> = (props) => {
  const { colOne, colOneIcon, richTextOneClasses, ...containerProps } = props
  const classes = useStyles(props)

  return (
    <Container {...containerProps} className={classes.root}>
      <div>
        <RichText {...colOne} classes={richTextOneClasses} />
      </div>
    </Container>
  )
}

export default RowColumnOne
