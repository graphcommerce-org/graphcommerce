import { Components, Theme } from '@mui/material'

/**
 * Not yet possible to define a size="large" for the Slider due to a limitation in Material-UI
 * https://github.com/mui-org/material-ui/issues/27130#issuecomment-1006425575
 *
 * If that has been fixed most of the styles can be removed here:
 * packages/magento-product/components/ProductListFilters/FilterRangeType.tsx
 */

// declare module '@mui/material/Slider' {
//   interface SliderPropsSizeOverrides {
//     large: true
//   }
// }

export const MuiSlider = (theme: Theme): Components['MuiSlider'] => ({
  // variants: [
  //   {
  //     props: { size: 'large' },
  //     style: {
  //       '& .MuiSlider-rail': { height: 4, borderRadius: '2px' },
  //       '& .MuiSlider-track': { height: 4 },
  //       '& .MuiSlider-thumb': { width: 28, height: 28 },
  //     },
  //   },
  // ],
})
