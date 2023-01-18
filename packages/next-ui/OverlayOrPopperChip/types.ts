import React, { PropsWithChildren } from 'react'

export type PanelProps = PropsWithChildren<{
  label?: React.ReactNode
  onApply: () => void
  onClose: () => void
  /** When onReset is provided, the reset button will be shown */
  onReset?: () => void
  maxLength?: number
  closeOnAction?: boolean
  activeEl: HTMLElement | null
}>
