import { Breakpoint, Link, LinkProps, useForkRef } from '@mui/material'
import React, { useRef } from 'react'
import type { ConditionalExcept } from 'type-fest'
import { Button, ButtonProps } from './Button'

type OmitNever<T extends Record<string, unknown>> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K]
}
type SharedProperties<A, B> = OmitNever<
  ConditionalExcept<Pick<A & B, keyof A & keyof B>, Record<string, unknown> | undefined>
>

export type LinkOrButtonProps = {
  button?: ButtonProps<'button'>
  link?: LinkProps<'a'>
  breakpoint?: Breakpoint
  disabled?: boolean
} & SharedProperties<
  Omit<ButtonProps<'button'>, 'sx' | 'component'>,
  Omit<LinkProps<'a'>, 'color' | 'sx' | 'component'> &
    Pick<ButtonProps, 'endIcon' | 'startIcon' | 'color' | 'loading'>
>

/** Renders a Link until the breakpoint is reached and will then render a button. */
export const LinkOrButton = React.forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  LinkOrButtonProps
>((props, ref) => {
  const {
    // Own created props
    breakpoint = 'md',
    button,
    link,
    disabled,

    // Shared props
    loading,
    children,
    startIcon,
    endIcon,
    color,
    ...sharedProps
  } = props

  const buttonRef = useForkRef(ref, useRef(null))
  const linkRef = useForkRef(ref, useRef(null))

  const buttonSx = button?.sx ?? []
  const linkSx = link?.sx ?? []
  return (
    <>
      <Button
        startIcon={startIcon}
        endIcon={endIcon}
        {...sharedProps}
        {...button}
        ref={buttonRef}
        color={color}
        loading={loading}
        disabled={disabled}
        sx={[
          {
            display: {
              xs: 'none',
              [breakpoint]: 'inline-flex',
            },
          },
          ...(Array.isArray(buttonSx) ? buttonSx : [buttonSx]),
        ]}
      >
        {children}
      </Button>

      <Link
        ref={linkRef}
        underline='none'
        variant='body2'
        {...sharedProps}
        {...link}
        color={loading || disabled ? 'action.disabled' : color}
        aria-disabled={loading || disabled}
        sx={[
          {
            display: { xs: 'inline-flex', [breakpoint]: 'none' },
            alignItems: 'center',
          },
          !!disabled &&
            ((theme) => ({
              opacity: theme.palette.action.disabledOpacity,
              pointerEvents: 'none',
            })),
          ...(Array.isArray(linkSx) ? linkSx : [linkSx]),
        ]}
      >
        {startIcon}
        <span>{children}</span>
        {endIcon}
      </Link>
    </>
  )
})
