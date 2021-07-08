import { makeStyles, Theme } from '@material-ui/core'
import { usePageRouter } from '@reachdigital/framer-next-pages'
import clsx from 'clsx'
import { m } from 'framer-motion'
import { UseStyles } from '../Styles'
import BackButton from './BackButton'
import ShellBase, { PageLayoutBaseProps } from './ShellBase'

const useStyles = makeStyles(
  (theme: Theme) => ({
    backButtonRoot: {
      position: 'fixed',
      zIndex: 10,
      left: theme.page.horizontal,
      top: theme.page.vertical,
      [theme.breakpoints.up('md')]: {
        // @todo, replace 48 with content height variable.
        top: `calc(48px + ${theme.spacings.sm} * 2)`,
      },
    },
    header: {
      padding: `${theme.page.vertical} ${theme.page.horizontal} ${theme.spacings.sm}`,
      top: 0,
      display: 'flex',
      pointerEvents: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        background: theme.palette.background.default,
        justifyContent: 'unset',
      },
    },
  }),
  { name: 'FullPageUi' },
)

export type FullPageShellBaseProps = {
  header?: React.ReactNode
  children?: React.ReactNode
  backFallbackHref?: string | null
  backFallbackTitle?: string | null
} & UseStyles<typeof useStyles> &
  PageLayoutBaseProps

function FullPageShellBase(props: FullPageShellBaseProps) {
  const { children, backFallbackHref, backFallbackTitle, header, name } = props
  const router = usePageRouter()
  const classes = useStyles(props)

  return (
    <ShellBase name={name}>
      <m.header
        className={clsx(classes.header)}
        layoutId='header'
        transition={{ type: 'tween' }}
        layout='position'
      >
        {header}
      </m.header>
      {children}
    </ShellBase>
  )
}

export default FullPageShellBase
