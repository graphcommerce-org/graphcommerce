import React from 'react'
import { makeStyles, Theme, Container, ContainerProps } from '@material-ui/core'
import RichText from 'components/RichText'
import { UseStyles, vpCalc } from 'components/Theme'
import { UseRichTextStyles } from 'components/RichText/useRichTextStyles'
import ContactFormLoader from 'components/ContactForm'

const useStyles = makeStyles(
  (theme: Theme) => ({
    boxed: {
      padding: vpCalc(24, 80),
      boxShadow: theme.shadows[24],

      '& h3': {
        marginTop: 0,
      },
    },
  }),
  { name: 'RowContactBoxed' },
)

const useRichTextStyles = makeStyles((theme: Theme) => ({
  h3: { color: theme.palette.primary.main, marginBottom: 0 },
}))

export type RowContactProps = GQLRowContactFragment &
  UseStyles<typeof useStyles> &
  ContainerProps & {
    richTextClasses?: UseRichTextStyles['classes']
  }

const RowContactBoxed: React.FC<RowContactProps> = (props) => {
  const { text, richTextClasses, ...containerProps } = props
  const { boxed } = useStyles(props)
  const richTextClassesAdded = useRichTextStyles()

  return (
    <Container {...containerProps}>
      <div className={boxed}>
        <ContactFormLoader>
          <RichText {...text} classes={{ ...richTextClasses, ...richTextClassesAdded }} />
        </ContactFormLoader>
      </div>
    </Container>
  )
}

export default RowContactBoxed
