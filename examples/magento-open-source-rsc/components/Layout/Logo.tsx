'use client'

import { Box, Link } from '@mui/material'
import Image from 'next/image'
import svgLogo from './graphcommerce.svg'

/** Simplified Logo for App Router Doesn't depend on GraphQL or next/router hooks */
export function Logo() {
  return (
    <Link href='/' sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        component={Image}
        src={svgLogo}
        alt='GraphCommerce'
        width={150}
        height={27}
        unoptimized
        sx={(theme) => ({
          display: 'block',
          height: { xs: '16px', md: '27px' },
          width: 'auto',
          filter: 'none',
          ...theme.applyStyles('dark', {
            filter: 'invert(100%)',
          }),
        })}
      />
    </Link>
  )
}
