import { Link, LinkProps, useForkRef } from '@mui/material'
import React, { useRef } from 'react'
import { ConditionalExcept } from 'type-fest'
import { Button, ButtonProps } from './Button'

type OmitNever<T extends Record<string, unknown>> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K]
}
type SharedProperties<A, B> = OmitNever<
  ConditionalExcept<Pick<A & B, keyof A & keyof B>, Record<string, unknown> | undefined>
>

export type LinkOrButtonProps = {
  button?: ButtonProps
  link?: LinkProps
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
} & SharedProperties<
  Omit<ButtonProps, 'sx'>,
  Omit<LinkProps, 'color' | 'sx'> & Pick<ButtonProps, 'endIcon' | 'startIcon' | 'color' | 'loading'>
>

type RefElement = HTMLButtonElement & HTMLAnchorElement

/** Renders a Link until the breakpoint is reached and will then render a button. */
export const LinkOrButton = React.forwardRef<RefElement, LinkOrButtonProps>((props, ref) => {
  const {
    breakpoint = 'md',
    button,
    link,
    loading,

    children,
    startIcon,
    endIcon,
    color,

    ...sharedProps
  } = props

  return (
    <>
      <Button
        sx={{ display: { xs: 'none', [breakpoint]: 'inline-flex' }, ...button?.sx }}
        ref={useForkRef<HTMLButtonElement>(ref, useRef(null))}
        startIcon={startIcon}
        endIcon={endIcon}
        color={color}
        loading={loading}
        {...sharedProps}
        {...button}
      >
        {children}
      </Button>

      <Link
        sx={{
          display: { xs: 'inline-flex', [breakpoint]: 'none' },
          alignItems: 'center',
          ...link?.sx,
        }}
        ref={useForkRef<HTMLAnchorElement>(ref, useRef(null))}
        color={loading ? 'text.disabled' : color}
        underline='none'
        aria-disabled={loading}
        variant='body2'
        {...sharedProps}
        {...link}
      >
        {startIcon}
        <span>{children}</span>
        {endIcon}
      </Link>
    </>
  )
})
