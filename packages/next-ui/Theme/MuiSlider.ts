import { ComponentsVariants } from '@mui/material'

declare module '@mui/material/Slider/Slider' {
  interface SliderPropsSizeOverrides {
    large: true
  }
}
type SliderVariants = NonNullable<ComponentsVariants['MuiSlider']>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MuiSlider: SliderVariants = [
  {
    props: {},
    style: ({ theme }) => ({
      '& .MuiSlider-rail': {
        color: theme.palette.text.disabled,
      },
      '& .MuiSlider-thumb': {
        background: theme.palette.background.default,
        boxShadow: theme.shadows[6],
      },
    }),
  },
  {
    props: { size: 'large' },
    style: {
      maxWidth: `calc(100% - 28px)`,
      margin: `0 auto`,
      display: 'block',
      '& .MuiSlider-rail': {
        height: 4,
        borderRadius: '2px',
      },
      '& .MuiSlider-track': {
        height: 4,
      },
      '& .MuiSlider-thumb': {
        width: '28px',
        height: '28px',
      },
    },
  },
]
