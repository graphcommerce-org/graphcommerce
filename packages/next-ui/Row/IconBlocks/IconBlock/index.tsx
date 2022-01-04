import { Theme, Typography } from '@mui/material'
import { makeStyles } from '@graphcommerce/next-ui'
import React from 'react'
import Button from '../../../Button'
import { UseStyles } from '../../../Styles'

const useStyles = makeStyles()(
  (theme: Theme) => ({
    block: {
      border: `1px solid ${theme.palette.divider}`,
      padding: `${theme.spacings.sm}`,
      borderRadius: '6px',
      textAlign: 'center',
      color: theme.palette.text.primary,
      '& > * > *': {
        display: 'grid',
        gridAutoFlow: 'row',
        justifyItems: 'center',
        gap: `${theme.spacings.xxs}`,
      },
    },
    link: {
      textDecoration: 'none',
    },
    title: {
      fontWeight: theme.typography.fontWeightBold,
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
  const { classes } = useStyles(props)

  const content = (
    <>
      {icon}
      <Typography variant='subtitle1' className={classes.title}>
        {title}
      </Typography>
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
