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
    person: {
      display: 'inline-block',
      width: 52,
      height: 52,
      borderRadius: '50%',
      border: '2px solid',
      borderColor: theme.palette.divider,
      overflow: 'hidden',
      '&:not(:first-of-type)': {
        marginLeft: -12,
      },
    },
    ctaMessage: {
      ...theme.typography.body1,
      '& a': {
        color: theme.palette.primary.contrastText,
        textDecorationLine: 'none',
      },
    },
  }),
  { name: 'ContactCtaStyles' },
)

export default ContactCtaStyles
