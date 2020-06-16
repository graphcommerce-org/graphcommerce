import { makeStyles, Theme } from '@material-ui/core'
import { vpCalc } from 'components/Theme'

const useRowCollaborationStyles = makeStyles(
  (theme: Theme) => ({
    imageGrid: {
      display: 'grid',
      gridTemplateColumns: `repeat(4, minmax(${vpCalc(73, 160)}, 1fr))`,
      paddingTop: theme.spacings.sm,

      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: `repeat(auto-fill, minmax(${vpCalc(73, 160)}, 1fr))`,
      },

      '& img': {
        width: '100%',
        height: 'auto',
      },
    },
  }),
  { name: 'useRowCollaborationStyles' },
)

export default useRowCollaborationStyles
