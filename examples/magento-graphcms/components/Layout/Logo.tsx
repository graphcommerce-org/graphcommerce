import { Logo as LogoBase } from '@graphcommerce/next-ui'
import svgLogo from './graphcommerce.svg'

export function Logo() {
  return (
    <LogoBase
      sx={(theme) => ({
        '& .GcLogo-logo': {
          width: 'auto',
          height: { xs: '16px', md: '27px' },
          paddingLeft: { xs: '10px', md: 0 },
          marginTop: { xs: 0, md: '-5px' },
          filter: 'none',
          ...theme.applyStyles('dark', {
            filter: 'invert(100%)',
          }),
        },
      })}
      image={{ alt: 'GraphCommerce Logo', src: svgLogo, unoptimized: true }}
    />
  )
}
