import Script from 'next/script'
import React from 'react'

type GoogleTagManagerScriptProps = {
  id: string
}

export default function GoogleTagManagerScript(props: GoogleTagManagerScriptProps) {
  const { id } = props

  return (
    <Script
      id={`gtm-${id}`}
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{
        __html: `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', '${id}');
  `,
      }}
    />
  )
}
