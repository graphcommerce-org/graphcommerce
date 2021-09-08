import { setMaxListeners } from 'process'
import { makeStyles, Theme, Popper, Fab } from '@material-ui/core'
import { LineStyleOutlined } from '@material-ui/icons'
import { useMotionValue } from 'framer-motion'
import React, { useRef, useState } from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    indicator: {
      position: 'absolute',
      top: '10%',
      left: '1%',
      padding: 0,
      background: 'transparent',
    },
    disc: {
      height: 14,
      width: 14,
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
    },
    popperContent: {
      maxWidth: 300,
      color: '#888DA8',
      borderRadius: 8,
      padding: theme.spacings.xs,
      backgroundColor: theme.palette.background.paper,
      // boxShadow: '0 6px 60px -3px #00080D',
      fontSize: '15px',
      lineHeight: '24px',
    },
  }),
  { name: 'WireframeAnimation' },
)

export default function Hint(props) {
  const { content, hintLeft, hintTop, offsetLeft, offsetTop, lines, setLines } = props
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)

    const newLine = {
      id: event.currentTarget,
      hintPosX: event.currentTarget.getBoundingClientRect().x,
      hintPosY: event.currentTarget.getBoundingClientRect().y,
      hint: event.currentTarget,
    }
    if (!lines.some((line) => line.id === event.currentTarget)) {
      setLines([...lines, newLine])
    }
  }

  const open = Boolean(anchorEl)
  const id = open ? 'transitions-popper' : undefined

  // const indicatorX = useMotionValue(0)
  // const indicatorY = useMotionValue(0)
  // const hintX = useMotionValue(0)
  // const hintY = useMotionValue(0)

  // const indicator = useRef<HTMLDivElement>(null)
  // const hint = useRef<HTMLDivElement>(null)

  // function handleMouse(event) {
  //   const rect = event.currentTarget.getBoundingClientRect()

  //   setMaxX(event.view.innerWidth)
  //   setMaxY(event.view.innerHeight)

  //   x.set(event.clientX - rect.left)
  //   y.set(event.clientY)

  //   const parentRect = parent.current?.getBoundingClientRect()
  //   const indicatorRect = indicator.current?.getBoundingClientRect()
  //   const hintRect = hint.current?.getBoundingClientRect()

  //   indicatorX.set(indicatorRect.x - parentRect.x + indicatorRect.width / 2)
  //   indicatorY.set(indicatorRect.y - parentRect.y + indicatorRect.height / 2)
  //   hintX.set(hintRect.x + hintRect.width / 2 - parentRect.x)
  //   hintY.set(hintRect.y + hintRect.height - parentRect.y - 2)
  // }

  return (
    <div>
      <Fab
        size='small'
        aria-label='add'
        aria-describedby={id}
        onClick={handleClick}
        className={classes.indicator}
        style={{ left: `${hintLeft}`, top: `${hintTop}` }}
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
