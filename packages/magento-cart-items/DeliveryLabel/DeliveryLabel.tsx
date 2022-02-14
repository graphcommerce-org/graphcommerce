import { extendableComponent } from '@graphcommerce/next-ui'
import { Box, IconButton, Popover, SxProps, Theme } from '@mui/material'
import React from 'react'

export type DeliveryLabelProps = { sx?: SxProps<Theme> }

const name = 'DeliveryLabel' as const
const parts = ['root', 'labelContainer', 'label', 'popover'] as const
const { classes } = extendableComponent(name, parts)

export default function DeliveryLabel(props: DeliveryLabelProps) {
  const { sx = [] } = props
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  const open = Boolean(anchorEl)

  return (
    <Box
      className={classes.root}
      sx={[{ display: 'inline-block' }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <IconButton
        component='button'
        className={classes.labelContainer}
        sx={{ padding: '5px' }}
        onClick={handleClick}
        size='large'
      >
        <Box
          className={classes.label}
          sx={{
            borderRadius: '100%',
            width: 10,
            height: 10,
            background: '#01D26A', // TODO: order statuses. green, yellow, red
          }}
        />
      </IconButton>
      <Popover
        id={open ? 'simple-popover' : undefined}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        className={classes.popover}
        sx={{
          '& > .MuiPaper-root': {
            padding: '6px',
          },
        }}
      >
        Ordered before <b>23:00</b>, delivery <b>tomorrow</b>
      </Popover>
    </Box>
  )
}
