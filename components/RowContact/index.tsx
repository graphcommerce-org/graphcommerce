import React from 'react'
import { makeStyles, Theme, Container, ContainerProps } from '@material-ui/core'
import RichText from 'components/RichText'
import { UseStyles } from 'components/Theme'
import { UseRichTextStyles } from 'components/RichText/useRichTextStyles'
import ContactFormLoader from 'components/ContactForm'

const useStyles = makeStyles({}, { name: 'RowContact' })

const useRichTextStyles = makeStyles((theme: Theme) => ({
  h3: { color: theme.palette.primary.main, marginBottom: 0 },
}))

export type RowContactProps = GQLRowContactFragment &
  UseStyles<typeof useStyles> &
  ContainerProps & {
    richTextClasses?: UseRichTextStyles['classes']
  }

const RowContact: React.FC<RowContactProps> = (props) => {
  const { text, richTextClasses, ...containerProps } = props
  const { ...containerClasses } = useStyles(props)
  const richTextClassesAdded = useRichTextStyles()

  return (
    <Container {...containerProps} classes={containerClasses}>
      <RichText {...text} classes={{ ...richTextClasses, ...richTextClassesAdded }} />
      <ContactFormLoader />
    </Container>
  )
}

export default RowContact
