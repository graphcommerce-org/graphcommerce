import { Avatar, Chip, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { responsiveVal } from '../..'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      display: 'flex',
      justifyContent: 'left',
      maxWidth: 800,
      margin: `0 auto`,
      marginBottom: theme.spacings.md,
    },
    authorChip: {
      height: responsiveVal(44, 66),
      '& .MuiChip-label': {
        paddingLeft: responsiveVal(10, 14),
        paddingRight: responsiveVal(14, 18),
      },
      '& .MuiAvatar-root': {
        width: responsiveVal(28, 44),
        height: responsiveVal(28, 44),
      },
    },
    date: {
      lineHeight: 1.4,
      color: theme.palette.text.disabled,
    },
    author: {
      lineHeight: 1.4,
    },
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
        size='large'
        avatar={<Avatar>{author.charAt(0).toUpperCase()}</Avatar>}
        className={classes.authorChip}
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
