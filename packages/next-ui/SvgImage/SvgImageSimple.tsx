import { Image, ImageProps, isStaticImport, isStaticRequire } from '@graphcommerce/image'
import { makeStyles, capitalize, Theme } from '@material-ui/core'
import clsx from 'clsx'
import { forwardRef } from 'react'
import responsiveVal from '../Styles/responsiveVal'

export type SvgImageShade = 'muted' | 'default' | 'inverted'

const useStyles = makeStyles(
  (theme: Theme) => ({
    image: {
      userSelect: 'none',
      width: responsiveVal(22, 24),
      height: responsiveVal(22, 24),
      strokeWidth: 1.8,
      strokeLinecap: 'square',
      strokeLinejoin: 'miter',
      fill: 'none',
    },
    sizeInherit: {
      fontSize: 'inherit',
    },
    sizeSmall: {
      width: responsiveVal(13, 16),
      height: responsiveVal(13, 16),
      strokeWidth: 2.3,
    },
    sizeLarge: {
      width: responsiveVal(24, 28),
      height: responsiveVal(24, 28),
      strokeWidth: 1.4,
    },
    sizeXl: {
      width: responsiveVal(38, 62),
      height: responsiveVal(38, 62),
      strokeWidth: 1.5,
    },
    sizeXxl: {
      width: responsiveVal(96, 148),
      height: responsiveVal(96, 148),
      strokeWidth: 1,
    },
    muted: {},
    inverted: {},
  }),
  { name: 'SvgImageSimple' },
)

type SvgImageSimpleProps = Omit<ImageProps, 'fixed'> & {
  /** The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size. */
  size?: 'default' | 'inherit' | 'xxl' | 'xl' | 'large' | 'medium' | 'small'
  fill?: boolean
  muted?: boolean
  inverted?: boolean
}

const SvgImageSimple = forwardRef<HTMLImageElement, SvgImageSimpleProps>((props, ref) => {
  const {
    className,
    size = 'medium',
    muted,
    inverted,
    fill,
    layout = 'fixed',
    ...imageProps
  } = props
  const classes = useStyles()

  let src = imageProps.src
  let staticSrc = ''
  if (isStaticImport(src)) staticSrc = (isStaticRequire(src) ? src.default : src).src
  src = typeof src === 'string' ? src : staticSrc

  return (
    <svg
      className={clsx(
        className,
        classes.image,
        classes?.[`size${capitalize(size)}`],
        muted && classes.muted,
        inverted && classes.inverted,
      )}
      aria-hidden='true'
    >
      <use href={`${src}#icon`}></use>
    </svg>
  )
})
SvgImageSimple.displayName = 'SvgImageSimple'

export default SvgImageSimple
