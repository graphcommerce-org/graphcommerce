import React from 'react'
import { makeStyles, Theme, Avatar, createStyles } from '@material-ui/core'
import { Url } from 'url'

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
  name: string
  date: string
  imageUrl: string
}

const AuthorCard: React.FC<AuthorProps> = ({ name, date, imageUrl }) => {
  const classes = useStyles()

  return (
    <div className={classes.authorcard}>
      <Avatar alt={name} src={imageUrl} className={classes.image} />
      <div className={classes.info}>
        <div className={classes.date}>{date}</div>
        <div className={classes.authorName}>Door {name}</div>
      </div>
    </div>
  )
}

export default AuthorCard
