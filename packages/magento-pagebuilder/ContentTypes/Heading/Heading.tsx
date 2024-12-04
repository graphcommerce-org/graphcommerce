import { Typography } from '@mui/material'
import type { HeadingContentType } from './types'

/**
 * Page Builder Heading component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 */
export const Heading: HeadingContentType['component'] = (props) => {
  const { headingType, text, cssClasses = [], contentType, appearance, ...styleProps } = props

  return (
    <Typography variant={headingType} sx={styleProps} className={cssClasses.join(' ')}>
      {text}
    </Typography>
  )
}
