import { Theme } from '@emotion/react'
import { SxProps, ButtonBase, Box } from '@mui/material'
import React, { FormEvent } from 'react'

type ActionCardProps = {
  sx?: SxProps<Theme>
  title?: string
  image?: React.ReactNode
  action?: React.ReactNode
  details?: React.ReactNode
  secondaryAction?: React.ReactNode
  onClick?: (e: FormEvent<HTMLButtonElement>, v: string) => void
  onChange?: (e: FormEvent<HTMLButtonElement>, v: string) => void
  selected?: boolean
  hidden?: boolean | (() => boolean)
  value: string
  reset?: React.ReactNode
}

export function ActionCard(props: ActionCardProps) {
  const {
    title,
    image,
    action,
    details,
    secondaryAction,
    sx = [],
    onChange,
    onClick,
    value,
    selected,
    hidden,
    reset,
  } = props

  // TODO
  // 1. Selected state for Actioncard
  // 2. In ActionCardList make other options dissapear
  //  2.1 Change selected ActionCard primary action to 'Change'
  //  2.2 Animations
  // 3. Mutations for setting shipping/billing address
  // 4. Statemanagement (geen usestate hier lijkt me maar form/local-storage dingen)

  const handleChange = (event: FormEvent<HTMLButtonElement>) => onChange?.(event, value)
  const handleClick = (event: FormEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event, value)
      if (event.isDefaultPrevented()) return
    }
    handleChange(event)
  }

  return (
    <ButtonBase
      component='button'
      className='ActionCard-root'
      onClick={handleClick}
      onChange={handleChange}
      value={value}
      sx={[
        {
          display: 'grid',
          width: '100%',
          gridTemplateColumns: 'min-content',
          gridTemplateAreas: `
        "image title action"
        "image details secondaryDetails"
        "image secondaryAction additionalDetails"
        "additionalContent additionalContent additionalContent"
        `,
          justifyContent: 'unset',
        },
        (theme) => ({
          typography: 'body1',
          textAlign: 'left',
          background: theme.palette.background.paper,
          padding: `calc(${theme.spacings.xs} + 1px)`,
          columnGap: theme.spacings.xxs,
          border: `1px solid ${theme.palette.divider}`,
          borderBottomColor: `transparent`,
          '&:first-child': {
            borderTopLeftRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius,
          },
          '&:last-child': {
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
            padding: theme.spacings.xs,
          })),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {image && <Box sx={{ gridArea: 'image', justifySelf: 'center', padding: 1 }}>{image}</Box>}
      {title && <Box sx={{ gridArea: 'title', fontWeight: 'bold' }}>{title}</Box>}
      {action && (
        <Box sx={{ gridArea: 'action', textAlign: 'right' }}>{!selected ? action : reset}</Box>
      )}
      {details && <Box sx={{ gridArea: 'details' }}>{details}</Box>}
      {secondaryAction && <Box sx={{ gridArea: 'secondaryAction' }}>{secondaryAction}</Box>}
    </ButtonBase>
  )
}
