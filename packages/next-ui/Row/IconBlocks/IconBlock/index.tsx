import { makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useRef } from 'react'
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

export type IconBlockProps = UseStyles<typeof useStyles> & {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  href?: string
}

const IconBlock = React.forwardRef<HTMLAnchorElement, IconBlockProps>((props, ref) => {
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
      <Button href={href} variant='text' color='primary' className={classes.block} ref={ref}>
        <div>{content}</div>
      </Button>
    )
  }

  return <div className={classes.block}>{content}</div>
})

export default IconBlock
