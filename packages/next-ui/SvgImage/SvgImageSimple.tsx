import { Image, ImageProps } from '@graphcommerce/image'
import { makeStyles, capitalize, Theme } from '@material-ui/core'
import clsx from 'clsx'
import { forwardRef } from 'react'
import responsiveVal from '../Styles/responsiveVal'

export type SvgImageShade = 'muted' | 'default' | 'inverted'

const useStyles = makeStyles(
  (theme: Theme) => ({
    image: {
      display: 'block',
      flexShrink: 0,
      userSelect: 'none',
      width: 24,
      height: 'auto',
    },
    /* Styles applied to the element if `size='inherit'`. */
    sizeInherit: {
      fontSize: 'inherit',
    },
    /* Styles applied to the element if `size='small'`. */
    sizeSmall: {
      width: responsiveVal(16, 20),
    },
    /* Styles applied to the element if `size='large'`. */
    sizeLarge: {
      width: responsiveVal(28, 32),
    },
    muted: { filter: `invert(75%)` },
    inverted: { filter: `invert(100%)` },
  }),
  { name: 'SvgImageSimple' },
)

type SvgImageSimpleProps = Omit<ImageProps, 'fixed'> & {
  /** The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size. */
  size?: 'default' | 'inherit' | 'large' | 'medium' | 'small'

  muted?: boolean
  inverted?: boolean
}

const SvgImageSimple = forwardRef<HTMLImageElement, SvgImageSimpleProps>((props, ref) => {
  const { className, size = 'medium', muted, inverted, layout = 'fixed', ...imageProps } = props
  const classes = useStyles()

  return (
    <Image
      {...imageProps}
      ref={ref}
      layout={layout}
      className={clsx(
        className,
        classes.image,
        classes?.[`size${capitalize(size)}`],
        muted && classes.muted,
        inverted && classes.inverted,
      )}
      unoptimized
    />
  )
})
SvgImageSimple.displayName = 'SvgImageSimple'

export default SvgImageSimple
