import { Button, ButtonProps, styled } from '@mui/material'
import PageLink from 'next/link'
import React from 'react'
import { IconSvg } from '../../IconSvg'
import { iconChevronRight } from '../../icons'

export type ButtonLinkListItemProps = { url: string; endIcon?: React.ReactNode } & ButtonProps

const ButtonItem = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  padding: `${theme.spacings.xs} 0`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  borderRadius: 0,
  justifyContent: 'space-between',
  typography: 'body1',
}))

export function ButtonLinkListItem(props: ButtonLinkListItemProps) {
  const { children, url, endIcon = <IconSvg src={iconChevronRight} />, ...buttonProps } = props

  return (
    <PageLink href={url} passHref>
      <ButtonItem {...buttonProps} endIcon={endIcon} LinkComponent='h3'>
        {children}
      </ButtonItem>
    </PageLink>
  )
}
