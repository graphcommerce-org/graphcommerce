import { Button, ButtonProps, styled } from '@mui/material'
import PageLink from 'next/link'
import React from 'react'
import { SvgIcon } from '../../SvgIcon/SvgIcon'
import { iconChevronRight } from '../../icons'

export type ButtonLinkProps = { url: string; endIcon?: React.ReactNode } & ButtonProps

const ButtonItem = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  padding: `${theme.spacings.xs} 0`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  borderRadius: 0,
  justifyContent: 'space-between',
  typography: 'body1',
}))

export function ButtonLinkListItem(props: ButtonLinkProps) {
  const { children, url, endIcon = <SvgIcon src={iconChevronRight} />, ...buttonProps } = props

  return (
    <PageLink href={url} passHref>
      <ButtonItem {...buttonProps} endIcon={endIcon}>
        {children}
      </ButtonItem>
    </PageLink>
  )
}
