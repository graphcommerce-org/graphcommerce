import { Avatar, Chip, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import Row from '../../Row'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      display: 'flex',
      justifyContent: 'left',
      maxWidth: 800,
      margin: `0 auto`,
      marginBottom: theme.spacings.md,
      '& > div': {
        height: 52,
        borderRadius: 30,
        '& > div': {
          width: '44px !important',
          height: '44px !important',
        },
      },
    },
    date: {
      color: theme.palette.text.disabled,
    },
    author: {},
  }),
  { name: 'BlogAuthor' },
)

export type BlogAuthorProps = UseStyles<typeof useStyles> & {
  author: string
  date: string
  locale: string
}

export default function BlogAuthor(props: BlogAuthorProps) {
  const { author, date, locale } = props
  const classes = useStyles()

  const formatter = new Intl.DateTimeFormat(locale, {
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className={classes.wrapper}>
      <Chip
        variant='outlined'
        avatar={<Avatar>{author.charAt(0).toUpperCase()}</Avatar>}
        label={
          <section>
            <div className={classes.author}>{author}</div>
            <div className={classes.date}>{formatter.format(new Date(date))}</div>
          </section>
        }
      />
    </div>
  )
}
