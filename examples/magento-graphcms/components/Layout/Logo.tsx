import { Logo as NextLogo, LogoProps as CoreLogoProps } from '@graphcommerce/next-ui'
import { Theme, useTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx'
import svgLogo from './graphcommerce.svg'

type LogoProps = Omit<CoreLogoProps, 'image'>

const useStyles = makeStyles(
  (theme: Theme) => ({
    logo: {
      width: 'auto',
      height: 20,
      pointerEvents: 'all',
      paddingLeft: 10,
      [theme.breakpoints.up('md')]: {
        height: 28,
        paddingLeft: 0,
        marginTop: -2,
      },
    },
    dark: {
      filter: 'invert(50%) brightness(200%)',
    },
  }),
  { name: 'Logo' },
)

export default function Logo(props: LogoProps) {
  const classes = useStyles(props)
  const inverted = useTheme().palette.mode === 'dark'

  return (
    <NextLogo
      {...props}
      classes={{ logo: clsx(classes.logo, inverted && classes.dark) }}
      image={{ alt: 'logo', src: svgLogo, unoptimized: true }}
    />
  )
}
