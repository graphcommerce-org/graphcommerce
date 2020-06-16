import { makeStyles, Theme } from '@material-ui/core'

const useRowCollaborationStyles = makeStyles(
  (theme: Theme) => ({
    imageGrid: {
      display: 'grid',
      gridColumnGap: theme.gridSpacing.gutter,
      gridRowGap: theme.gridSpacing.row,
      gridTemplateColumns: 'repeat(5,1fr)',
      alignItems: 'center',
      paddingTop: theme.spacings.lg,
      paddingBottom: theme.spacings.xl,

      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(9,1fr)',
      },
    },
    image: {},
  }),
  { name: 'useRowCollaborationStyles' },
)

export default useRowCollaborationStyles
