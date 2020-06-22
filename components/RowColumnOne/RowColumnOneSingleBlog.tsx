import React from 'react'
import { makeStyles, Container, ContainerProps } from '@material-ui/core'
import RichText from 'components/RichText'
import { UseStyles } from 'components/Theme'
import { UseRichTextStyles } from 'components/RichText/useRichTextStyles'

const useStyles = makeStyles(
  {
    colOne: { maxWidth: 800, margin: '0 auto' },
  },
  { name: 'RowColumnOneSingleBlog' },
)

export type RowColumnOneProps = GQLRowColumnOneFragment &
  UseStyles<typeof useStyles> &
  Omit<ContainerProps, 'children'> & {
    richTextOneClasses?: UseRichTextStyles['classes']
  }

const RowColumnOneSingleBlog: React.FC<RowColumnOneProps> = (props) => {
  const { colOne, colOneIcon, richTextOneClasses, ...containerProps } = props
  const classes = useStyles(props)

  return (
    <Container {...containerProps}>
      <div className={classes.colOne}>
        <RichText {...colOne} classes={richTextOneClasses} />
      </div>
    </Container>
  )
}

export default RowColumnOneSingleBlog
