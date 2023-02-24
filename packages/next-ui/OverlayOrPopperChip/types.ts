import { Theme } from '@emotion/react'
import { SxProps } from '@mui/material'
import React from 'react'

export type PanelActionsProps = {
  children: React.ReactNode
  title: React.ReactNode
  onApply: () => void
  onClose: () => void
  /** When onReset is provided, the reset button will be shown */
  onReset?: () => void

  sx?: SxProps<Theme>

  // maxLength?: number
  // closeOnAction?: boolean
}

export type PanelProps = Omit<PanelActionsProps, 'children'> & {
  children: () => React.ReactNode
  activeEl: HTMLElement | null
}
