import { Image } from '@graphcommerce/image'
import type { PluginConfig } from '@graphcommerce/next-config'
import { NextLink, type LogoProps } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import {
  Box,
  unstable_composeClasses as composeClasses,
  generateUtilityClass,
  Link,
} from '@mui/material'
import { useRouter } from 'next/router'
import { forwardRef } from 'react'

export const config: PluginConfig = {
  module: '@graphcommerce/next-ui',
  type: 'replace',
}

/** We're creating some boilerplate */
const name = 'GcLogo'
type LogoClassKey = 'logo' | 'parent'

type LogoClasses = Record<LogoClassKey, string>
type LogoClassProps = { classes?: Partial<LogoClasses> }

const getLogoUtilityClass = (slot: string) => generateUtilityClass(name, slot)

const useUtilityClasses = ({ classes }: LogoClassProps) =>
  composeClasses({ logo: ['logo'], parent: ['parent'] }, getLogoUtilityClass, classes)

const commonLogoStyles: SxProps<Theme> = {
  height: '100%',
  width: 'max-content',
  display: 'flex',
  alignItems: 'center',
  margin: '0 auto',
  justifyContent: 'center',
  pointerEvents: 'all',
}

function ProBadge() {
  return (
    <Box
      sx={(theme) => ({
        borderRadius: 1,
        fontWeight: 600,
        lineHeight: 1,
        p: '2px 4px',
        marginTop: '-6px',
        ml: '4px',
        background: theme.palette.text.primary,
        color: theme.palette.background.default,
      })}
    >
      Pro
    </Box>
  )
}

export const Logo = forwardRef<HTMLAnchorElement, LogoProps>((props, ref) => {
  const { href = '/', image, sx } = props
  const router = useRouter()
  const classes = useUtilityClasses(props)

  const shouldRedirect = router.asPath.split('?')[0] !== href

  return (
    <Link
      component={shouldRedirect ? NextLink : 'div'}
      href={shouldRedirect ? href : undefined}
      ref={ref}
      sx={[...(Array.isArray(sx) ? sx : [sx]), commonLogoStyles]}
      className={classes.parent}
      underline='none'
    >
      <Image
        layout='fixed'
        loading='eager'
        {...image}
        className={`${image.className} ${classes?.logo ?? ''}`}
      />
      <ProBadge />
    </Link>
  )
})
