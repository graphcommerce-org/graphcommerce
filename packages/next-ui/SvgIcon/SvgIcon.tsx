import { ImageProps, isStaticImport, isStaticRequire } from '@graphcommerce/image'
import { capitalize } from '@mui/material'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { responsiveVal } from '../Styles/responsiveVal'
import { makeStyles } from '../Styles/tssReact'

const useStyles = makeStyles({ name: 'SvgIcon' })({
  image: {
    userSelect: 'none',
    width: responsiveVal(22, 24),
    height: responsiveVal(22, 24),
    strokeWidth: 1.8,
    strokeLinecap: 'square',
    strokeLinejoin: 'miter',
    fill: 'none',
    stroke: 'currentColor',
  },
  sizeInherit: {
    width: '1.3em',
    height: '1.3em',
  },
  sizeXs: {
    width: responsiveVal(11, 13),
    height: responsiveVal(11, 13),
    strokeWidth: 2.1,
  },
  sizeSmall: {
    width: responsiveVal(12, 16),
    height: responsiveVal(12, 16),
    strokeWidth: 2.1,
  },
  sizeLarge: {
    width: responsiveVal(24, 28),
    height: responsiveVal(24, 28),
    strokeWidth: 1.4,
  },
  sizeXl: {
    width: responsiveVal(38, 62),
    height: responsiveVal(38, 62),
    strokeWidth: 1.4,
  },
  sizeXxl: {
    width: responsiveVal(96, 148),
    height: responsiveVal(96, 148),
    strokeWidth: 0.8,
  },
  muted: {},
  inverted: {},
})

export type SvgIconProps = JSX.IntrinsicElements['svg'] &
  Pick<ImageProps, 'src'> & {
    /** The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size. */
    size?: 'default' | 'inherit' | 'xxl' | 'xl' | 'large' | 'medium' | 'small' | 'xs'
    fill?: boolean
    muted?: boolean
    inverted?: boolean
  }

/** SvgIcon component is supposed to be used in combination with `icons` */
export const SvgIcon = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  let { className, size = 'inherit', muted, inverted, fill, src, ...imageProps } = props
  const { classes } = useStyles()

  let staticSrc = ''
  if (isStaticImport(src)) staticSrc = (isStaticRequire(src) ? src.default : src).src
  src = typeof src === 'string' ? src : staticSrc

  return (
    <svg
      ref={ref}
      className={clsx(
        className,
        classes.image,
        classes?.[`size${capitalize(size)}`],
        muted && classes.muted,
        inverted && classes.inverted,
      )}
      aria-hidden='true'
      {...imageProps}
    >
      <use href={`${src}#icon`} />
    </svg>
  )
})
SvgIcon.displayName = 'SvgIcon'
