import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx'
import PageLink from 'next/link'
import React from 'react'
import Button, { ButtonProps } from '../../Button'
import { UseStyles } from '../../Styles'
import SvgImageSimple from '../../SvgImage/SvgImageSimple'
import { iconChevronRight } from '../../icons'

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
  children: React.ReactNode
  url: string
  endIcon?: React.ReactNode
} & ButtonProps &
  UseStyles<typeof useStyles>

export function ButtonLinkListItem(props: ButtonLinkProps) {
  const { children, url, endIcon, className, ...buttonProps } = props
  const classes = useStyles(props)

  return (
    <PageLink href={url} passHref>
      <Button {...buttonProps} className={clsx(classes.buttonLink, className)}>
        <span>{children}</span>
        {endIcon ?? <SvgImageSimple src={iconChevronRight} />}
      </Button>
    </PageLink>
  )
}
