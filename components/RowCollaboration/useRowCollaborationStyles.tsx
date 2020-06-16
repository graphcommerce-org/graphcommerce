import { makeStyles, Theme } from '@material-ui/core'

const useRowCollaborationStyles = makeStyles(
  (theme: Theme) => ({
    imageGrid: {
      display: 'flex',
      flexFlow: 'row wrap',
      paddingTop: theme.spacings.sm,

      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(9,1fr)',
      },
    },
    image: {
      flexGrow: 1,
      flexBasis: '25%',

      '& img': {
        width: '100%',
        height: 'auto',
      },

      [theme.breakpoints.between('sm', 'md')]: {
        flexBasis: '20%',
      },

      [theme.breakpoints.up('md')]: {
        flexGrow: 0,
        flexBasis: 'calc(100% / 9)',
      },
    },
  }),
  { name: 'useRowCollaborationStyles' },
)

export default useRowCollaborationStyles
