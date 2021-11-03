import { Logo as NextLogo, LogoProps } from '@graphcommerce/next-ui'
import { makeStyles, Theme } from '@material-ui/core'
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
  }),
  { name: 'Logo' },
)

export default function Logo(props: ShopLogoProps) {
  const classes = useStyles(props)

  return (
    <NextLogo
      {...props}
      classes={{ logo: classes.logo }}
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
