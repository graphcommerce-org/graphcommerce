import { IconButton, Popover, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'inline-block',
    },
    labelContainer: {
      padding: 5,
    },
    label: {
      borderRadius: '100%',
      width: 10,
      height: 10,
      background: '#01D26A', // TODO (yvo): order statuses. green, yellow, red
    },
    popover: {
      '& > .MuiPaper-root': {
        padding: 6,
      },
    },
  }),
  { name: 'DeliveryLabel' },
)

export type DeliveryLabelProps = Record<string, unknown>

export default function DeliveryLabel(props: DeliveryLabelProps) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <div className={classes.root}>
      <IconButton
        component='button'
        className={classes.labelContainer}
        onClick={handleClick}
        size="large">
        <div className={classes.label} />
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
      >
        Ordered before <b>23:00</b>, delivery <b>tomorrow</b>
      </Popover>
    </div>
  );
}
