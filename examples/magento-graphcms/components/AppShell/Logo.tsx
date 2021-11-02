import { Logo as NextLogo } from '@graphcommerce/next-ui'
import svgLogo from './graphcommerce.svg'

export default function Logo() {
  return (
    <NextLogo
      image={{
        layout: 'fixed',
        alt: 'logo',
        src: svgLogo,
        unoptimized: true,
        loading: 'eager',
      }}
    />
  )
}
