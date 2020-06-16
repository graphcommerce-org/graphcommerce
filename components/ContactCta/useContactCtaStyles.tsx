import { makeStyles, Theme } from '@material-ui/core'

const useContactCtaStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacings.lg,
      flexDirection: 'column',
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        marginTop: theme.spacings.sm,
      },
    },
    persons: {
      marginBottom: theme.spacings.sm,
      [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacings.sm,
        marginBottom: 0,
      },
    },
    ctaMessage: {
      ...theme.typography.body1,
      color: 'inherit',
      fontSize: '1.1em',
    },
    avatar: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    avatarGroup: {
      borderColor: theme.palette.divider,
    },
  }),
  { name: 'ContactCtaStyles' },
)

export default useContactCtaStyles
