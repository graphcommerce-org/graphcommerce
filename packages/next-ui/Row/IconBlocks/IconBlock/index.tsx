import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import Button from '../../../Button'
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
      textAlign: 'center',
      color: theme.palette.primary.contrastText,
    },
    link: {
      textDecoration: 'none',
    },
  }),
  { name: 'IconBlock' },
)

type IconBlockProps = UseStyles<typeof useStyles> & {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  href?: string
}

export default function IconBlock(props: IconBlockProps) {
  const { title, children, icon, href } = props
  const classes = useStyles(props)

  const content = (
    <>
      {icon}
      <Typography variant='h6'>{title}</Typography>
      {children}
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes.link}>
        <Button variant='text' color='primary' className={classes.block}>
          <div>{content}</div>
        </Button>
      </a>
    )
  }

  return <div className={classes.block}>{content}</div>
}
