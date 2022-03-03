import { ImageProps, srcToString, StaticImport } from '@graphcommerce/image'
import { styled, SxProps, Theme, useTheme, useThemeProps } from '@mui/material'
import { ComponentProps, forwardRef } from 'react'
import { extendableComponent, ExtendableComponent } from '../Styles/extendableComponent'
import { responsiveVal as rv } from '../Styles/responsiveVal'
import { svgIconStrokeWidth } from './svgIconStrokeWidth'

const name = 'IconSvg'
const parts = ['root'] as const
type StyleProps = {
  size?: 'default' | 'inherit' | 'xxl' | 'xl' | 'large' | 'medium' | 'small' | 'xs'
  fillIcon?: boolean
}
const { withState } = extendableComponent<StyleProps, typeof name, typeof parts>(name, parts)

/** Expose the component to be exendable in your theme.components */
declare module '@mui/material/styles/components' {
  interface Components {
    IconSvg?: ExtendableComponent<StyleProps> & {
      /**
       * To override an icon with your own icon, provide the original src and the replacement src.
       *
       * ```tsx
       * import { originalIcon, originalIcon2 } from '@graphcommerce/image'
       * import myIcon from './myIcon.svg'
       * import myIcon2 from './myIcon2.svg'
       *
       * overrides: [
       *   [originalIcon, myIcon],
       *   [originalIcon2, myIcon2],
       * ]
       * ```
       */
      overrides?: [StaticImport | string, StaticImport | string][]
    }
  }
}

export type IconSvgProps = StyleProps &
  Pick<ImageProps, 'src'> &
  Pick<ComponentProps<'svg'>, 'className' | 'style'> & { sx?: SxProps<Theme> }

const Svg = styled('svg', { name, target: name })(() => [
  {
    userSelect: 'none',
    width: '1em',
    height: '1em',
    display: 'inline-block',

    strokeLinecap: 'square',
    strokeLinejoin: 'miter',
    strokeMiterlimit: 4,

    fill: 'none',
    stroke: 'currentColor',

    fontSize: '1.3em',

    strokeWidth: svgIconStrokeWidth(28, 148, 1.4, 0.8),

    '&.sizeXs': { fontSize: rv(11, 13) },
    '&.sizeSmall': { fontSize: rv(12, 16) },
    '&.sizeMedium': { fontSize: rv(22, 24) },
    '&.sizeLarge': { fontSize: rv(24, 28) },
    '&.sizeXl': { fontSize: rv(38, 62) },
    '&.sizeXxl': { fontSize: rv(96, 148) },

    '&.fillIcon': {
      fill: 'currentColor',
      stroke: 'none',
    },
  },
])

/**
 * IconSvg component is supposed to be used in combination with `icons`
 *
 * @see https://graphcommerce-docs.vercel.app/framework/icons
 */
export const IconSvg = forwardRef<SVGSVGElement, IconSvgProps>((props, ref) => {
  const { src, size, fillIcon, className, ...svgProps } = useThemeProps({ props, name })

  const srcWithOverride =
    (useTheme().components?.IconSvg?.overrides ?? []).find(
      ([overrideSrc]) => overrideSrc === src,
    )?.[1] ?? src

  const classes = withState({ size, fillIcon })

  return (
    <Svg
      ref={ref}
      aria-hidden='true'
      className={`${classes.root} ${className ?? ''}`}
      {...svgProps}
    >
      <use href={`${srcToString(srcWithOverride)}#icon`} />
    </Svg>
  )
})
IconSvg.displayName = 'IconSvg'

/** @deprecated SvgIcon is renamed to IconSvg, no API changes */
export const SvgIcon = IconSvg
