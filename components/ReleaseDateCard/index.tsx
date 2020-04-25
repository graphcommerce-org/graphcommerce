import React from 'react'
import { makeStyles, Theme, Avatar } from '@material-ui/core'
import Asset from '../Asset'
import { vpCalc } from '../Theme'

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: '20px',
  },
  releasecard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vpCalc(23, 80),
    padding: '10px 30px',
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
}))

interface ReleaseDateCardProps {
  author: GQLPersonFragment
  releaseDate: string
}

const ReleaseDateCard: React.FC<ReleaseDateCardProps> = ({ author, releaseDate }) => {
  const classes = useStyles()

  return (
    <div className={classes.releasecard}>
      <Avatar alt={author.name} className={classes.image}>
        {author.avatar && <Asset alt={author.name} asset={author.avatar} width={56} />}
      </Avatar>
      <div className={classes.info}>
        <div className={classes.date}>{releaseDate}</div>
        <div className={classes.authorName}>Door {author.name}</div>
      </div>
    </div>
  )
}

export default ReleaseDateCard
