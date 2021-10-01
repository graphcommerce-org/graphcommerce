import { Theme, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'
import Row from '../../Row'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      maxWidth: 800,
      margin: `0 auto`,
    },
  }),
  { name: 'BlogTitle' },
)

export type BlogTitleProps = UseStyles<typeof useStyles> & {
  title: string
}

export default function BlogTitle(props: BlogTitleProps) {
  const { title } = props
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <Typography variant='h1'>{title}</Typography>
    </div>
  )
}
