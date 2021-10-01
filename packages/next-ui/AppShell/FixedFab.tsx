import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { m } from 'framer-motion'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      position: 'fixed',
      top: 'unset',
      bottom: 20,
      right: 20,
      zIndex: 100,
      boxShadow: theme.shadows[4],
      borderRadius: 99,
      [theme.breakpoints.down('lg')]: {
        top: 'unset !important',
      },
      [theme.breakpoints.up('md')]: {
        pointerEvents: 'all',
        top: `calc(${theme.spacings.xxs} - 2px)`,
        left: `calc(100vw - ${theme.page.horizontal} - 70px)`,
        bottom: 'unset',
        boxShadow: 'unset',
      },
    },
  }),
  {
    name: 'FixedFab',
  },
)

type FixedFabProps = {
  children: React.ReactNode
} & UseStyles<typeof useStyles>

export default function FixedFab(props: FixedFabProps) {
  const { children } = props
  const classes = useStyles(props)

  return <m.div className={classes.root}>{children}</m.div>
}
