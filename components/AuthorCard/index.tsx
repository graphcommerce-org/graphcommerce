import React from 'react'
import { makeStyles, Theme, Avatar, createStyles } from '@material-ui/core'
import Asset from '../Asset'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      marginRight: theme.spacing(2),
    },
    authorcard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.gridSpacing.gutter,
    },
    info: {
      color: 'inherit',
    },
    date: {
      color: theme.palette.secondary.light,
    },
    authorName: {
      ...theme.typography.body1,
      lineHeight: 1,
      marginTop: theme.spacing(1),
    },
  }),
)

interface AuthorProps {
  author: GQLPersonFragment
  date: string
}

const AuthorCard: React.FC<AuthorProps> = ({ author, date }) => {
  const classes = useStyles()

  return (
    <div className={classes.authorcard}>
      <Avatar alt={author.name} className={classes.image}>
        <Asset alt={author.name} asset={author.avatar} width={56} />
      </Avatar>
      <div className={classes.info}>
        <div className={classes.date}>{date}</div>
        <div className={classes.authorName}>Door {author.name}</div>
      </div>
    </div>
  )
}

export default AuthorCard
