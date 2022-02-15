import { Image, ImageProps } from '@graphcommerce/image'
import {
  generateUtilityClass,
  styled,
  SxProps,
  Theme,
  unstable_composeClasses as composeClasses,
} from '@mui/material'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import { forwardRef } from 'react'

/** We're creating some boilerplate */
const name = 'GcLogo'
type LogoClassKey = 'logo' | 'parent'

type LogoClasses = Record<LogoClassKey, string>
type LogoClassProps = { classes?: Partial<LogoClasses> }

const getLogoUtilityClass = (slot: string) => generateUtilityClass(name, slot)

const useUtilityClasses = ({ classes }: LogoClassProps) =>
  composeClasses({ logo: ['logo'], parent: ['parent'] }, getLogoUtilityClass, classes)

/** Creating styled components */
const LogoContainer = styled('div', {
  name,
  slot: 'parent',
  overridesResolver: (_props, styles) => styles.parent,
})(({ theme }) => ({
  height: '100%',
  width: 'max-content',
  display: 'flex',
  alignItems: 'center',
  margin: '0 auto',
  justifyContent: 'center',
  pointerEvents: 'all',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    margin: 'unset',
    justifyContent: 'left',
  },
}))

export type LogoProps = {
  href?: `/${string}`
  image: ImageProps
  sx?: SxProps<Theme>
} & LogoClassProps

export const Logo = forwardRef<HTMLDivElement, LogoProps>((props, ref) => {
  const { href = '/', image, sx } = props
  const router = useRouter()

  const classes = useUtilityClasses(props)

  const img = (
    <Image
      layout='fixed'
      loading='eager'
      {...image}
      className={`${image.className} ${classes?.logo ?? ''}`}
    />
  )

  return router.asPath.split('?')[0] === '/' ? (
    <LogoContainer ref={ref} sx={sx} className={classes.parent}>
      {img}
    </LogoContainer>
  ) : (
    <PageLink href={href} passHref>
      <LogoContainer ref={ref} as='a' sx={sx} className={classes.parent}>
        {img}
      </LogoContainer>
    </PageLink>
  )
})
