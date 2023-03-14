import Box from '@mui/material/Box'
import React from 'react'
import { extractAdvancedProps } from '../../utils'
import { ButtonsContentType } from './types'

/**
 * Page Builder Buttons component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page
 * Builder.
 */
export const Buttons: ButtonsContentType['component'] = (props) => {
  const [cssProps, cssClasses, additional] = extractAdvancedProps(props)

  const { isSameWidth, children, appearance } = additional

  const justify = {
    left: 'start',
    center: 'center',
    right: 'end',
  }

  const textAlign = (cssProps.textAlign ?? 'left') as 'left' | 'center' | 'right'

  const buttons = isSameWidth
    ? children
    : React.Children.map(children, (child) => <div>{child}</div>)

  return (
    <Box
      sx={[
        cssProps,
        (theme) => ({
          display: 'grid',
          alignItems: 'center',
          justifyContent: justify[textAlign],
          gap: theme.spacings.xs,
        }),
        appearance === 'inline' && {
          gridAutoFlow: 'column',
        },
      ]}
    >
      {buttons}
    </Box>
  )
}
