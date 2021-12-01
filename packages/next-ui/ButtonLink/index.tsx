import { makeStyles, Theme } from '@material-ui/core'
import PageLink from 'next/link'
import React from 'react'
import Button, { ButtonProps } from '../Button'
import { UseStyles } from '../Styles'
import SvgImageSimple from '../SvgImage/SvgImageSimple'
import { iconChevronRight } from '../icons'

const useStyles = makeStyles((theme: Theme) => ({
  buttonLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    padding: `${theme.spacings.xs} 0`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderRadius: 0,
    ...theme.typography.body1,
    '& > *': {
      display: 'grid',
      gridAutoFlow: 'column',
      justifyContent: 'space-between',
      gap: `${theme.spacings.xs}`,
    },
  },
}))

export type ButtonLinkProps = {
  title: string | React.ReactNode
  url: string
  endIcon?: React.ReactNode
} & ButtonProps &
  UseStyles<typeof useStyles>

export default function ButtonLink(props: ButtonLinkProps) {
  const { title, url, endIcon, ...buttonProps } = props
  const classes = useStyles(props)

  return (
    <PageLink href={url} passHref>
      <Button {...buttonProps} className={classes.buttonLink}>
        <span>{title}</span>
        {endIcon ?? <SvgImageSimple src={iconChevronRight} />}
      </Button>
    </PageLink>
  )
}
