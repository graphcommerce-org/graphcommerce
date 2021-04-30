import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    block: {
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
  { name: 'IconBlock' },
)

type IconBlockProps = UseStyles<typeof useStyles> & {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

export default function IconBlock(props: IconBlockProps) {
  const { title, children, icon } = props
  const classes = useStyles(props)

  return (
    <div className={classes.block}>
      {icon}
      <Typography variant='h6'>{title}</Typography>
      {children}
    </div>
  )
}
