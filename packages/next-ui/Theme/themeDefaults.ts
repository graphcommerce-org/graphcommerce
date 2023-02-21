import { Shadows } from '@mui/material/styles/shadows'
import { spreadVal } from '../Styles/spreadVal'
import { breakpoints } from './breakpoints'

// https://material.io/design/environment/elevation.html#default-elevations

const shadows: Shadows = [
  /* 0 */ 'none',
  /* 1 */ `0px 0px 1.5px hsl(0deg 0% 0% / 0.15),0px 0.5px 0.6px hsl(0deg 0% 0% / 0.06),0px 1.4px 1.8px -1.5px hsl(0deg 0% 0% / 0.09)`,
  /* 2 */ `0px 0px 1.5px hsl(0deg 0% 0% / 0.15),0px 0.5px 0.6px hsl(0deg 0% 0% / 0.06),0px 2.6px 3.3px -1.5px hsl(0deg 0% 0% / 0.09)`,
  /* 3 */ `0px 0px 1.5px hsl(0deg 0% 0% / 0.15),0px 0.5px 0.6px hsl(0deg 0% 0% / 0.06),0px 3.8px 4.8px -1.5px hsl(0deg 0% 0% / 0.09)`,
  /* 4 */ `0px 0px 1.5px hsl(0deg 0% 0% / 0.15),0px 0.5px 0.6px hsl(0deg 0% 0% / 0.04),0px 1.7px 2.2px -0.7px hsl(0deg 0% 0% / 0.06),0px 5px 6.4px -1.5px hsl(0deg 0% 0% / 0.08)`,
  /* 5 */ 'none',
  /* 6 */ `0px 0px 1.5px hsl(0deg 0% 0% / 0.15),0px 0.5px 0.6px hsl(0deg 0% 0% / 0.04),0px 2.3px 2.9px -0.7px hsl(0deg 0% 0% / 0.06),0px 7.6px 9.7px -1.5px hsl(0deg 0% 0% / 0.08)`,
  /* 7 */ 'none',
  /* 8 */ `0px 0px 1.5px hsl(0deg 0% 0% / 0.15),0px 0.5px 0.6px hsl(0deg 0% 0% / 0.05),0px 2.9px 3.7px -0.7px hsl(0deg 0% 0% / 0.07),0px 10px 12.8px -1.5px hsl(0deg 0% 0% / 0.1)`,
  /* 9 */ 'none',
  /* 10 */ 'none',
  /* 11 */ 'none',
  /* 12 */ `0px 0px 1.5px hsl(0deg 0% 0% / 0.15),0px 0.5px 0.6px hsl(0deg 0% 0% / 0.06),0px 4.2px 5.4px -0.7px hsl(0deg 0% 0% / 0.09),0px 15px 19.1px -1.5px hsl(0deg 0% 0% / 0.11)`,
  /* 13 */ 'none',
  /* 14 */ 'none',
  /* 15 */ 'none',
  /* 16 */ `0px 0px 1.5px hsl(0deg 0% 0% / 0.15),0px 0.5px 0.6px hsl(0deg 0% 0% / 0.05),0px 3.5px 4.5px -0.5px hsl(0deg 0% 0% / 0.07),0px 8.6px 11px -1px hsl(0deg 0% 0% / 0.08),0px 20px 25.5px -1.5px hsl(0deg 0% 0% / 0.1)`,
  /* 17 */ 'none',
  /* 18 */ 'none',
  /* 19 */ 'none',
  /* 20 */ 'none',
  /* 21 */ 'none',
  /* 22 */ 'none',
  /* 23 */ 'none',
  /* 24 */ `0px 0px 1.5px hsl(0deg 0% 0% / 0.15),0px 0.5px 0.6px hsl(0deg 0% 0% / 0.05),0px 3.9px 5px -0.4px hsl(0deg 0% 0% / 0.07),0px 8.1px 10.3px -0.7px hsl(0deg 0% 0% / 0.08),0px 15.8px 20.1px -1.1px hsl(0deg 0% 0% / 0.1),0px 30px 38.3px -1.5px hsl(0deg 0% 0% / 0.11)`,
]

export const themeBaseDefaults = {
  breakpoints,
  spreadVal,
  shadows,
}
