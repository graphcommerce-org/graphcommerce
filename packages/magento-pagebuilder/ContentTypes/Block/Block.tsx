import { Box } from '@mui/material'
import React from 'react'
import { RenderChildren } from '../../components/RenderChildren/RenderChildren'
import { extractAdvancedProps } from '../../utils'
import { BlockContentType } from './types'

/**
 * Page Builder Block component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 */
export const Block: BlockContentType['component'] = (props) => {
  const [cssProps, cssClasses, isHidden, additional] = extractAdvancedProps(props)

  const { richContent } = additional

  if (isHidden) return null

  return (
    <Box style={cssProps} className={cssClasses.join(' ')}>
      <RenderChildren content={richContent} />
    </Box>
  )
}
