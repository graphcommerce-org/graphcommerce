import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { Logo as LogoBase } from '@graphcommerce/next-ui'
import svgLogo from './graphcommerce.svg'

export function Logo() {
  const { header_logo_src, secure_base_media_url, logo_alt, logo_height, logo_width } =
    useQuery(StoreConfigDocument).data?.storeConfig ?? {}

  // If you know that you always have a magentoLogo, you can optimize this component by not loading the svgLogo.
  const magentoLogo = header_logo_src && logo_height && logo_width && secure_base_media_url
  const src = magentoLogo ? `${secure_base_media_url}logo/${header_logo_src}` : svgLogo

  return (
    <LogoBase
      sx={(theme) => ({
        '& .GcLogo-logo': {
          display: 'block',
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
      image={
        magentoLogo
          ? { alt: logo_alt ?? '', src, height: logo_height, width: logo_width }
          : { alt: logo_alt ?? '', src, unoptimized: true }
      }
    />
  )
}
