import React from 'react'

export type AsyncIframeProps = JSX.IntrinsicElements['iframe'] & {
  title: string // Iframe must have a title
}

const AsyncIframe: React.FC<AsyncIframeProps> = (props) => {
  // eslint-disable-next-line jsx-a11y/iframe-has-title
  return <iframe {...props} />
}

export default AsyncIframe
