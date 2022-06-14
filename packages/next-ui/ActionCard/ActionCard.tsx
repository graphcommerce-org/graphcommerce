import { SxProps, ButtonBase, Box, Theme } from '@mui/material'
import React, { FormEvent } from 'react'

export type ActionCardProps = {
  sx?: SxProps<Theme>
  title?: string | React.ReactNode
  image?: React.ReactNode
  action?: React.ReactNode
  details?: React.ReactNode
  price?: React.ReactNode
  after?: React.ReactNode
  secondaryAction?: React.ReactNode
  onClick?: (e: FormEvent<HTMLElement>, v: string | number) => void
  selected?: boolean
  hidden?: boolean
  value: string | number
  reset?: React.ReactNode
  disabled?: boolean
}

export function ActionCard(props: ActionCardProps) {
  const {
    title,
    image,
    action,
    details,
    price,
    after,
    secondaryAction,
    sx = [],
    onClick,
    value,
    selected = false,
    hidden = false,
    reset,
    disabled = false,
  } = props

  const handleClick = (event: FormEvent<HTMLElement>) => onClick?.(event, value)

  return (
    <ButtonBase
      component='div'
      className='ActionCard-root'
      onClick={handleClick}
      disabled={disabled}
      sx={[
        (theme) => ({
          display: 'grid',
          width: '100%',
          gridTemplateColumns: 'min-content auto auto',
          gridTemplateAreas: `
            "image title action"
            "image details ${price ? 'price' : 'details'}"
            "image secondaryAction additionalDetails"
            "after after after"
          `,
          justifyContent: 'unset',
          typography: 'body1',
          // textAlign: 'left',
          background: theme.palette.background.paper,
          padding: `calc(${theme.spacings.xxs} + 1px) calc(${theme.spacings.xs} + 1px)`,
          columnGap: theme.spacings.xxs,
          border: `1px solid ${theme.palette.divider}`,
          borderBottomColor: `transparent`,
          '&:first-of-type': {
            borderTopLeftRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius,
          },
          '&:last-of-type': {
            borderBottomLeftRadius: theme.shape.borderRadius,
            borderBottomRightRadius: theme.shape.borderRadius,
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
        }),
        !image && {
          gridTemplateColumns: 'auto auto',
          gridTemplateAreas: `
            "title action"
            "details ${price ? 'price' : 'details'}"
            "secondaryAction additionalDetails"
            "after after"
          `,
        },
        hidden && {
          display: 'none',
        },
        selected &&
          ((theme) => ({
            border: `2px solid ${theme.palette.secondary.main} !important`,
            borderTopLeftRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius,
            borderBottomLeftRadius: theme.shape.borderRadius,
            borderBottomRightRadius: theme.shape.borderRadius,
            padding: `${theme.spacings.xxs} ${theme.spacings.xs}`,
          })),
        disabled &&
          ((theme) => ({
            background: theme.palette.background.default,
          })),

        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {image && <Box sx={{ gridArea: 'image', justifySelf: 'center', padding: 1 }}>{image}</Box>}
      {title && <Box sx={{ gridArea: 'title', fontWeight: 'bold' }}>{title}</Box>}
      {action && (
        <Box
          sx={{
            gridArea: 'action',
            textAlign: 'right',
          }}
        >
          {!selected ? action : reset}
        </Box>
      )}
      {details && <Box sx={{ gridArea: 'details', color: 'text.secondary' }}>{details}</Box>}

      {price && <Box sx={{ gridArea: 'price', textAlign: 'right', typography: 'h5' }}>{price}</Box>}

      {secondaryAction && (
        <Box
          sx={{
            gridArea: 'secondaryAction',
          }}
        >
          {secondaryAction}
        </Box>
      )}
      {after && <Box sx={{ gridArea: 'after' }}>{after}</Box>}
    </ButtonBase>
  )
}
