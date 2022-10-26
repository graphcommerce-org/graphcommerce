import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'
import NextLink from 'next/link'
import React from 'react'

export type LinkProps = Omit<MuiLinkProps<typeof NextLink>, 'component'>

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <MuiLink ref={ref} component={NextLink} {...props} />
))
