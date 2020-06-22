import React from 'react'
import { Container, ContainerProps } from '@material-ui/core'
import RichText from 'components/RichText'
import { UseRichTextStyles } from 'components/RichText/useRichTextStyles'

export type RowColumnOneProps = GQLRowColumnOneFragment &
  Omit<ContainerProps, 'children'> & {
    richTextOneClasses?: UseRichTextStyles['classes']
  }

const RowColumnOne: React.FC<RowColumnOneProps> = (props) => {
  const { colOne, colOneIcon, richTextOneClasses, ...containerProps } = props

  return (
    <Container {...containerProps}>
      <div>
        <RichText {...colOne} classes={richTextOneClasses} />
      </div>
    </Container>
  )
}

export default RowColumnOne
