import type { ComponentsVariants, FabProps, Theme } from '@mui/material'
import { useTheme } from '@mui/material'
import { responsiveVal } from '../Styles'

type FabSize = NonNullable<FabProps['size']>

type FabSizes = {
  [key in FabSize]: string
}

/** Expose the component to be exendable in your theme.components */
declare module '@mui/material/styles/components' {
  interface Components {
    /**
     * @todo We would rather use MuiFab to override these fields, but I can't get it to work,
     *   getting 'Subsequent property declarations must have the same type.'
     */
    MuiFabExtra?: {
      sizes?: Partial<FabSizes>
    }
  }
}

const defaultSizes: FabSizes = {
  /**
   * Default values picked from MUI:
   * https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Fab/Fab.js
   */
  smaller: '30px',
  small: '40px',
  medium: '48px',
  large: '54px',
  responsiveSmall: responsiveVal(30, 40),
  responsiveMedium: responsiveVal(36, 48),
  responsive: responsiveVal(40, 54),
}

function fabSize(size: FabSize, theme: Theme) {
  return theme.components?.MuiFabExtra?.sizes?.[size] ?? defaultSizes[size]
}

export const useFabSize = (size: FabSize) => {
  const theme = useTheme()
  return fabSize(size, theme)
}

declare module '@mui/material/Fab/Fab' {
  interface FabPropsSizeOverrides {
    responsive: true
    responsiveSmall: true
    responsiveMedium: true
    smaller: true
  }
  // todo: Wait for the color prop to be exendable and then add inverted
  // https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Fab/Fab.js#L193-L202
  // interface FabPropsColorOverrides {
  //   inverted: true
  // }
}

function fabWidthHeight(size: FabSize, theme: Theme) {
  return {
    width: fabSize(size, theme),
    height: fabSize(size, theme),
  }
}

type FabVariants = NonNullable<ComponentsVariants<Theme>['MuiFab']>

const sizes: FabSize[] = [
  'smaller',
  'small',
  'medium',
  'large',
  'responsive',
  'responsiveSmall',
  'responsiveMedium',
]

/**
 * This defines the sizes for the added responsive variant.
 *
 * To override the sizes, please do not add variant declarations direcly, but modify
 * `yourTheme.components.MuiFabExtra.sizes` instead.
 */
export const MuiFabSizes: FabVariants = sizes.map((size) => ({
  props: { size },
  style: ({ theme }) => fabWidthHeight(size, theme),
}))

// todo: Wait for the color prop to be exendable and add tho theme.
// https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Fab/Fab.js#L193-L202
// export const MuiFabInverted: FabVariants = [
//   {
//     props: { color: 'inverted' },
//     style: ({ theme }) => ({
//       boxShadow: 'none',
//       '&:hover, &:focus': {
//         background: theme.palette.text.primary,
//       },
//       background: theme.palette.text.primary,
//       color: theme.palette.background.paper,
//     }),
//   },
// ]
