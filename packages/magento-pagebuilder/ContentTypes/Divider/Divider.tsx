import { Divider as DividerBase } from '@mui/material'
import { extractAdvancedProps } from '../../utils'
import type { DividerContentType } from './types'

/**
 * Page Builder Divider component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 */
export const Divider: DividerContentType['component'] = (props) => {
  const [cssProps, cssClasses, additional] = extractAdvancedProps(props)

  const { width, color, thickness } = additional

  return (
    <DividerBase
      variant={width !== '100%' ? 'middle' : 'fullWidth'}
      sx={(theme) => ({
        my: theme.spacings.sm,
        ...cssProps,
        borderColor: color,
        borderBottomWidth: thickness,
      })}
    />
  )
}
