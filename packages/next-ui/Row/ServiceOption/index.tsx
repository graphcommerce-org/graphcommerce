import { makeStyles, Theme, Typography } from '@material-ui/core'
import { Chat, Email, Phone } from '@material-ui/icons'
import React from 'react'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    contactOption: {
      display: 'grid',
      gridAutoFlow: 'row',
      justifyItems: 'center',
      gap: `${theme.spacings.xs}`,
      border: `1px solid ${theme.palette.grey[300]}`,
      padding: `${theme.spacings.sm}`,
      borderRadius: '6px',
      cursor: 'pointer',
      textAlign: 'center',
    },
  }),
  { name: 'ServiceOption' },
)

const useRichTextOne = makeStyles((theme: Theme) => ({
  paragraph: {
    fontSize: responsiveVal(10, 16),
  },
}))

type ServiceOptionsProps = UseStyles<typeof useStyles & typeof useRichTextOne> & {
  title: string
  RichContent?: (props) => React.ReactElement
}

export default function ServiceOptions(props: ServiceOptionsProps) {
  const { title, RichContent } = props
  const classes = useStyles(props)
  const richTextOneClasses = useRichTextOne(props)
  const optionTitle = title.toLowerCase()

  return (
    <div className={classes.contactOption}>
      {optionTitle === 'e-mail' && <Phone color='inherit' />}
      {optionTitle === 'phone' && <Email color='inherit' />}
      {optionTitle === 'chat' && <Chat color='inherit' />}

      <Typography variant='h6'>{title}</Typography>

      {RichContent && <RichContent classes={richTextOneClasses} />}
    </div>
  )
}
