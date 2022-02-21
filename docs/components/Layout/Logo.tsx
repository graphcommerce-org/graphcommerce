import { Logo as LogoBase } from '@graphcommerce/next-ui'
import svgLogo from './graphcommerce.svg'

export function Logo() {
  return (
    <LogoBase
      sx={{
        '& .GcLogo-logo': {
          width: 'auto',
          height: { xs: '24px', md: '36px' },
          paddingLeft: { xs: '10px', md: '52px' },
          marginTop: { xs: 0, md: '4px' },
          filter: (theme) => (theme.palette.mode === 'dark' ? 'invert(100%)' : 'invert(0%)'),
        },
      }}
      image={{ alt: 'GraphCommerce Logo', src: svgLogo, unoptimized: true }}
    />
  )
}
