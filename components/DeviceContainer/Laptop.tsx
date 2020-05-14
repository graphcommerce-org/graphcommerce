import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { UseStyles } from 'components/Theme'
import shadowSvg from './laptop-shadow.png'

const useStyles = makeStyles(
  ({ palette }: Theme) => ({
    root: {
      display: 'block',
      position: 'relative',
    },
    laptopShadow: {
      width: '111.8%',
      position: 'absolute',
      marginTop: '-6.7%',
      left: '-5.2%',
      height: 'auto',
      maxWidth: 'none',
      opacity: ({ variant }: Props) => {
        if (variant === 'primary') return 0.4
        if (variant === 'tertiary') return 1
        return 0.17
      },
    },
    laptopFrame: {
      width: '100%',
      position: 'absolute',
      top: 0,
      height: 'auto',
    },
    laptopPath: {
      fill: ({ variant }: Props) =>
        variant && palette[variant]?.main ? palette[variant].main : '#fff',
    },
    content: {
      paddingTop: '2.5%',
      width: '80%',
      paddingBottom: '17.5%',
      position: 'relative',
      left: '50%',
      transform: 'translateX(-50%)',
      '& > *': {
        width: '100%',
      },
    },
  }),
  { name: 'DeviceContainerLaptop' },
)

type Props = {
  variant?: 'primary' | 'secondary' | 'tertiary'
}

export type DeviceContainerLaptopProps = Props & UseStyles<typeof useStyles>

const DeviceContainerLaptop: React.FC<DeviceContainerLaptopProps> = (props) => {
  const { children } = props
  const classes = useStyles(props)

  return (
    <div className={classes.root}>
      <img className={classes.laptopShadow} src={shadowSvg} alt='' />
      <svg
        className={classes.laptopFrame}
        viewBox='0 0 2840 1664'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs />
        <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <path
            className={classes.laptopPath}
            d='M2573.58052,1579 L2840,1579 L2840,1632 L2834.77401,1633 C2809.67693,1637.74804 2699.18404,1658.0334 2612.75781,1664 L218.542969,1664 L6.82946777,1633 L0,1632 L0,1579 L266.423567,1579 C234.346178,1564.62707 212,1532.41971 212,1495.00455 L212,92.0081089 C212,41.1934335 253.188616,0 304.000289,0 L2535.99971,0 C2586.81007,0 2628,41.1958351 2628,92.0081089 L2628,1495.00455 C2628,1532.42591 2605.65617,1564.6287 2573.58052,1579 L2573.58052,1579 Z'
          />
        </g>
      </svg>
      <div className={classes.content}>{children}</div>
    </div>
  )
}

export default DeviceContainerLaptop
