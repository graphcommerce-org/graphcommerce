import { makeStyles, Theme } from '@material-ui/core'

const ContactCtaStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacings.sm,
      flexDirection: 'column',
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
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
      '& a': {
        color: theme.palette.primary.contrastText,
        textDecorationLine: 'none',
      },
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

export default ContactCtaStyles
