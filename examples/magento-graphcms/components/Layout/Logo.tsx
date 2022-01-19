import { Logo as LogoBase } from '@graphcommerce/next-ui'
import svgLogo from './graphcommerce.svg'

export function Logo() {
  return (
    <LogoBase
      sx={(theme) => ({
        '& .GcLogo-logo': {
          width: 'auto',
          height: { xs: '16px', md: '28px' },
          paddingLeft: { xs: '10px', md: 0 },
          marginTop: { xs: 0, md: '-5px' },
          fitler: theme.palette.mode === 'dark' ? 'invert(100%)' : 'invert(0%)',
        },
      })}
      image={{ alt: 'GraphCommerce Logo', src: svgLogo, unoptimized: true }}
    />
  )
}
