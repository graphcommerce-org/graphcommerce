import { Logo as LogoBase } from '@graphcommerce/next-ui'
import svgLogo from './logo.png'

export function Logo() {
  return (
    <LogoBase
      sx={{
        '& .GcLogo-logo': {
          width: 'auto',
          height: { xs: '16px', md: '27px' },
          paddingLeft: { xs: '10px', md: 0 },
          marginTop: { xs: 0, md: '-5px' },
          filter: (theme) => (theme.palette.mode === 'dark' ? 'invert(100%)' : 'none'),
        },
      }}
      image={{ alt: 'Manganimeshon Logo', src: svgLogo, unoptimized: true }}
    />
  )
}
