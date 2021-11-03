import { Logo as NextLogo, LogoProps } from '@graphcommerce/next-ui'
import { makeStyles, Theme, useTheme } from '@material-ui/core'
import clsx from 'clsx'
import svgLogo from './graphcommerce.svg'

type ShopLogoProps = Omit<LogoProps, 'image'>

const useStyles = makeStyles(
  (theme: Theme) => ({
    logo: {
      width: 'auto',
      height: 16,
      pointerEvents: 'all',
      paddingLeft: 10,
      [theme.breakpoints.up('md')]: {
        width: 'auto',
        height: 28,
        paddingLeft: 0,
        marginTop: '-5px',
      },
    },
    dark: {
      filter: 'invert(100%)',
    },
  }),
  { name: 'Logo' },
)

export default function Logo(props: ShopLogoProps) {
  const classes = useStyles(props)
  const inverted = useTheme().palette.type === 'dark'

  return (
    <NextLogo
      {...props}
      classes={{ logo: clsx(classes.logo, inverted && classes.dark) }}
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
