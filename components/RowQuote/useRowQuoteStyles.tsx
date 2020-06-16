import { makeStyles, Theme } from '@material-ui/core'

const useRowQuoteStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridColumnGap: theme.gridSpacing.gutter,
      gridRowGap: theme.gridSpacing.row,
      gridTemplateColumns: '1fr',
      alignItems: 'center',

      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '1fr 1fr',
      },
      paddingTop: theme.spacings.lg,
      paddingBottom: theme.spacings.xl,
    },
    shadowBox: {
      backgroundColor: theme.palette.tertiary.contrastText,
      boxShadow: theme.shadows[24],
      padding: theme.spacings.lg,
      ...theme.typography.body1,
      marginBottom: theme.spacings.lg,

      [theme.breakpoints.up('md')]: {
        marginBottom: 0,
      },
    },
    clientInfo: {
      marginTop: theme.spacings.md,
      textAlign: 'right',
    },
    listTitle: {
      marginTop: 0,
    },
    list: {
      listStyle: 'none',
      padding: 0,

      '& li': {
        position: 'relative',
        paddingLeft: 35,
        marginBottom: theme.spacings.xs,

        '&:before': {
          content: '""',
          position: 'absolute',
          top: 10,
          left: 0,
          display: 'inline-block',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: theme.palette.primary.main,
        },
      },
    },
  }),
  { name: 'useRowQuoteStyles' },
)

export default useRowQuoteStyles
