import { ImageProps, srcToString } from '@graphcommerce/image'
import { experimental_sx, styled } from '@mui/material'
import clsx from 'clsx'
import { ComponentProps, forwardRef } from 'react'
import { ExtendableComponent } from '../Styles/componentSlots'
import { responsiveVal as rv } from '../Styles/responsiveVal'

const name = 'SvgIcon'
type StyleProps = {
  size?: 'default' | 'inherit' | 'xxl' | 'xl' | 'large' | 'medium' | 'small' | 'xs'
  fillIcon?: boolean
}

// Expose the component to be exendable in your theme.components
declare module '@mui/material/styles/components' {
  interface Components {
    SvgIcon?: ExtendableComponent<StyleProps>
  }
}

const Svg = styled('svg', {
  name,
  target: name,
  shouldForwardProp: (prop) => !['size', 'fillIcon'].includes(prop),
})<StyleProps>(({ size, fillIcon }) =>
  experimental_sx([
    {
      userSelect: 'none',
      width: '1.3em',
      height: '1.3em',
      strokeWidth: 2.1,
      strokeLinecap: 'square',
      strokeLinejoin: 'miter',
      fill: 'none',
      stroke: 'currentColor',
    },
    size === 'xs' && { width: rv(11, 13), height: rv(11, 13), strokeWidth: 2.1 },
    size === 'small' && { width: rv(12, 16), height: rv(12, 16), strokeWidth: 2.1 },
    size === 'medium' && { width: rv(22, 24), height: rv(22, 24), strokeWidth: 1.8 },
    size === 'large' && { width: rv(24, 28), height: rv(24, 28), strokeWidth: 1.4 },
    size === 'xl' && { width: rv(38, 62), height: rv(38, 62), strokeWidth: 1.1 },
    size === 'xxl' && { width: rv(96, 148), height: rv(96, 148), strokeWidth: 0.8 },
    fillIcon === true && { fill: 'currentColor', stroke: `none` },
  ]),
)

export type SvgIconProps = StyleProps &
  Pick<ImageProps, 'src'> &
  Pick<ComponentProps<typeof Svg>, 'sx' | 'className'>

/** SvgIcon component is supposed to be used in combination with `icons` */
export const SvgIcon = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
  const { className, src, ...svgProps } = props

  return (
    <Svg ref={ref} aria-hidden='true' className={clsx(name, className)} {...svgProps}>
      <use href={`${srcToString(src)}#icon`} />
    </Svg>
  )
})
SvgIcon.displayName = 'SvgIcon'
