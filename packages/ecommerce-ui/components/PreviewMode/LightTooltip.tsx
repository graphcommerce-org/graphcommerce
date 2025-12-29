import { styled, Tooltip, tooltipClasses } from '@mui/material'

export const LightTooltip = styled<typeof Tooltip>(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.vars.palette.common.white,
    color: theme.vars.palette.text.primary,
    boxShadow: theme.shadows[1],
  },
}))
