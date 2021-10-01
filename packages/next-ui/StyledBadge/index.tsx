import { Badge } from '@mui/material'
import { withStyles } from '@mui/styles'

const StyledBadge = withStyles((theme) => ({
  colorError: {},
  badge: {
    right: 6,
    top: 6,
    padding: 3,
    color: '#FFF',
    borderRadius: '100%',
    fontSize: 10,
    [theme.breakpoints.up('md')]: {
      padding: 6,
      right: 8,
      top: 8,
    },
  },
}))(Badge)

export default StyledBadge
