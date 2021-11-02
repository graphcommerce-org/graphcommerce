import { Logo as NextLogo, LogoProps } from '@graphcommerce/next-ui'
import svgLogo from './graphcommerce.svg'

type ShopLogoProps = LogoProps

export default function Logo(props: ShopLogoProps) {
  return (
    <NextLogo
      {...props}
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
