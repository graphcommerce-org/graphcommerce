import { Badge } from '@mui/material'
import { withStyles } from '../Styles/tssReact'

const StyledBadge = withStyles(Badge, (theme) => ({
  colorError: {},

  badge: {
    ...theme.typography.caption,
    right: 6,
    top: 6,
    padding: 3,
    color: '#FFF',
    borderRadius: '100%',
    [theme.breakpoints.up('md')]: {
      padding: 6,
      right: 8,
      top: 8,
    },
  },
}))

export default StyledBadge
