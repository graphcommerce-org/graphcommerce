import { responsiveVal } from '@graphcommerce/next-ui'
import { makeStyles, Theme, Popper, Fab } from '@material-ui/core'
import React, { useRef, useState } from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    hintPos: {
      position: 'absolute',
      top: '10%',
      left: '1%',
      padding: 0,
      zIndex: 10,
      transform: `translateZ(1px)`,
      [theme.breakpoints.up('sm')]: {
        transform: `translateZ(20px)`,
      },
      'transform-style': 'preserve-3d',
      backfaceVisibility: 'visible',
    },
    hint: {
      background: 'none',
      '&:hover': {
        background: 'none',
      },
    },
    disc: {
      height: responsiveVal(6, 12),
      width: responsiveVal(6, 12),
      background: '#ffffff',
      borderRadius: '999em',
      animation: `$pulse 2s infinite`,
    },
    '@keyframes pulse': {
      '0%': {
        boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.7)',
      },
      '70%': {
        boxShadow: '0 0 0 20px rgba(255, 255, 255, 0)',
      },
    },
    popper: {
      zIndex: 1,
      pointerEvents: 'none',
    },
    popperContent: {
      maxWidth: 300,
      color: theme.palette.text.secondary,
      borderRadius: 8,
      padding: theme.spacings.xs,
      backgroundColor: theme.palette.background.paper,
      fontSize: '15px',
      lineHeight: '24px',
    },
  }),
  { name: 'WireframeAnimation' },
)

export default function Hint(props) {
  const { content, hintLeft, hintTop, offsetLeft, offsetTop } = props
  const classes = useStyles()
  const popper = useRef(null)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
    // const newLine = {
    //   id: event.currentTarget,
    //   hint: event.currentTarget,
    //   popper,
    // }
    // if (!lines.some((line) => line.id === event.currentTarget)) {
    //   setLines([...lines, newLine])
    // }
  }

  const open = Boolean(anchorEl)
  const id = open ? 'transitions-popper' : undefined

  return (
    <div
      className={classes.hintPos}
      style={{ left: `calc(${hintLeft} - 21.5px)`, top: `calc(${hintTop} - 21.5px)` }}
    >
      <Fab
        size='small'
        aria-label='add'
        aria-describedby={id}
        onClick={handleClick}
        disableRipple
        disableFocusRipple
        className={classes.hint}
      >
        <div className={classes.disc} />
      </Fab>
      <Popper
        anchorEl={anchorEl}
        className={classes.popper}
        placement='top'
        id={id}
        open={open}
        keepMounted
        ref={popper}
        modifiers={{
          flip: {
            enabled: false,
          },
          offset: {
            enabled: true,
            offset: `${offsetLeft},${offsetTop}`,
          },
        }}
        popperOptions={{
          eventsEnabled: false,
        }}
      >
        <div className={classes.popperContent}>{content}</div>
      </Popper>
    </div>
  )
}
