import React from 'react'

export function GoogleTagManagerNoScript() {
  if (!process.env.NEXT_PUBLIC_GTM_ID) return null

  return (
    <noscript>
      {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
        height='0'
        width='0'
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}
