import { SxProps, ButtonBase, Box, Theme } from '@mui/material'
import React, { FormEvent } from 'react'

export type ActionCardProps = {
  sx?: SxProps<Theme>
  title?: string | React.ReactNode
  image?: React.ReactNode
  action?: React.ReactNode
  details?: React.ReactNode
  secondaryAction?: React.ReactNode
  onClick?: (e: FormEvent<HTMLElement>, v: string | number) => void
  selected?: boolean
  hidden?: boolean
  value: string | number
  reset?: React.ReactNode
  disabled?: boolean
}

function actionButtonStyles(spacing: string) {
  return {
    '& .MuiButton-root': {
      '&.MuiButton-textSecondary': {
        margin: `calc(${spacing} * -1 + 1px)`,
        '&:hover': {
          background: 'none',
        },
      },
    },
  }
}

export function ActionCard(props: ActionCardProps) {
  const {
    title,
    image,
    action,
    details,
    secondaryAction,
    sx = [],
    onClick,
    value,
    selected,
    hidden,
    reset,
    disabled,
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
          gridTemplateColumns: 'min-content',
          gridTemplateAreas: {
            xs: `
              "image title action"
              "image details details"
              "image secondaryAction additionalDetails"
              "additionalContent additionalContent additionalContent"
            `,
          },
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
        !!hidden && {
          display: 'none',
        },
        !!selected &&
          ((theme) => ({
            border: `2px solid ${theme.palette.secondary.main} !important`,
            borderTopLeftRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius,
            borderBottomLeftRadius: theme.shape.borderRadius,
            borderBottomRightRadius: theme.shape.borderRadius,
            padding: `${theme.spacings.xxs} ${theme.spacings.xs}`,
          })),
        !!disabled &&
          ((theme) => ({
            background: theme.palette.background.default,
          })),

        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {image && <Box sx={{ gridArea: 'image', justifySelf: 'center', padding: 1 }}>{image}</Box>}
      {title && (
        <Box sx={{ gridArea: 'title', fontWeight: 'bold', marginLeft: !image ? -2 : undefined }}>
          {title}
        </Box>
      )}
      {action && (
        <Box
          sx={(theme) => ({
            gridArea: 'action',
            textAlign: 'right',
            ...actionButtonStyles(theme.spacings.xxs),
          })}
        >
          {!selected ? action : reset}
        </Box>
      )}
      {details && (
        <Box
          sx={{ gridArea: 'details', color: 'text.secondary', marginLeft: !image ? -2 : undefined }}
        >
          {details}
        </Box>
      )}
      {secondaryAction && (
        <Box
          sx={(theme) => ({
            gridArea: 'secondaryAction',
            ...actionButtonStyles(theme.spacings.xxs),
          })}
        >
          {secondaryAction}
        </Box>
      )}
    </ButtonBase>
  )
}
