import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import { UseStyles } from '../Theme'

const useStyles = makeStyles(
  ({ breakpoints, palette }: Theme) => ({
    root: {
      marginLeft: 'auto',
      marginRight: 'auto',
      position: 'relative',
      height: '100%',
    },
    rootGradient: ({ half, halfHeight }: Props) => ({
      overflow: half || halfHeight ? 'hidden' : undefined,
    }),
    rootHalfBlur: ({ flip }) => {
      const styles = { height: '60%', width: '60%', marginTop: '50px', marginLeft: '50px' }
      if (flip) {
        styles.marginTop = '-50px'
        styles.marginLeft = '-50px'
      }
      return styles
    },

    svg: ({ gradient, blur, half }) => {
      return {
        pointerEvents: 'none',
        height: half ? '50%' : '100%',
        width: half ? '50%' : '100%',
        position: 'absolute',
        zIndex: gradient ? 0 : -1,
        overflow: 'visible',
        filter: blur ? `blur(15px);` : undefined,
        // [breakpoints.up('md')]: {
        //   filter: blur ? `blur(30px);` : undefined,
        // },
      }
    },
    svgGradient: ({ half, halfHeight, halfWidth }) => {
      const styles = {
        backgroundImage: `linear-gradient(to bottom, #f5f5f5, #fff)`,
        width: half ? '145%' : undefined,
        height: half ? '145%' : undefined,
      }
      if (halfHeight) styles.width = '105%'
      if (halfWidth) styles.height = '105%'
      return styles
    },

    polygon: ({ flip, gradient, color }) => {
      const styles = {
        transformOrigin: 'center',
        transform: flip ? 'rotate(180deg)' : undefined,
        fill: color === 'white' ? 'white' : palette[color].main,
      }
      if (gradient) {
        styles.fill = 'white'
        styles.transform = 'rotate(180deg)'
      }
      return styles
    },
  }),

  { name: 'TriangleBg' },
)

type Props = {
  color: 'white' | 'primary' | 'secondary' | 'tertiary'
  flip?: boolean
  blur?: boolean
  half?: boolean
  gradient?: boolean
  topRight?: boolean
  halfWidth?: boolean
  halfHeight?: boolean
}
export type TriangleBgProps = Props & UseStyles<typeof useStyles> & JSX.IntrinsicElements['div']

const TriangleBg: React.FC<TriangleBgProps> = (props) => {
  const { children, topRight, gradient, blur, half, className, color, ...divProps } = props
  const classes = useStyles(props)

  return (
    <div
      {...divProps}
      className={clsx(className, {
        [classes.root]: true,
        [classes.rootHalfBlur]: blur && half,
        [classes.rootGradient]: gradient,
      })}
    >
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 20 10'
        preserveAspectRatio='none'
        className={clsx({
          [classes.svg]: true,
          [classes.svgGradient]: gradient,
        })}
      >
        <polygon
          strokeWidth='0'
          points={topRight ? '0, 0,20 0,20 10' : '0,10 20,10 20,0'}
          className={clsx({
            [classes.polygon]: true,
          })}
        />
      </svg>
      {children}
    </div>
  )
}

export default TriangleBg
