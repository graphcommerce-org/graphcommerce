import { Badge } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const StyledBadge = withStyles(() => ({
  colorError: {},
  badge: {
    right: 8,
    top: 8,
    padding: 6,
    color: '#FFF',
    borderRadius: '100%',
    fontSize: 10,
  },
}))(Badge)

export default StyledBadge
