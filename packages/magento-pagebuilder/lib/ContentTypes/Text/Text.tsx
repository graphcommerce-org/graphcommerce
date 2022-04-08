/* eslint-disable import/no-extraneous-dependencies */
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { arrayOf, shape, string, InferProps } from 'prop-types'
import React from 'react'
import handleHtmlContentClick from '../../handleHtmlContentClick'
import { extractAdvancedProps } from '../../utils'

/**
 * Page Builder Text component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 */
export const Text = (props) => {
  const [cssProps, cssClasses, isHidden, additional] = extractAdvancedProps(props)

  const { content } = additional

  const dynamicStyles = {
    ...cssProps,
  }

  const history = useRouter()

  const clickHandler = (event) => {
    handleHtmlContentClick(history, event)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        wordWrap: 'break-word',
        typography: 'body1',
      }}
      style={dynamicStyles}
      //   className={[classes.root, ...cssClasses].join(' ')}
      dangerouslySetInnerHTML={{ __html: content }}
      onClick={clickHandler}
      onKeyDown={clickHandler}
      role='presentation'
    />
  )
}
