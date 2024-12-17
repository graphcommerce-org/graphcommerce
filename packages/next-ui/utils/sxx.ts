import type { SxProps, Theme } from '@mui/material'

/**
 * Concat an array of SxProps into a single SxProps.
 *
 * Each item in the array can be an array of Sx it's self:
 *
 * ```tsx
 * sxx({ position: 'absolute', right: 0, top: 0 }, props.sx)
 * ```
 */
export const sxx = (...sxPropsArray: (SxProps<Theme> | undefined)[]): SxProps<Theme> =>
  sxPropsArray
    .filter((v) => v !== undefined)
    .map((sx) => (Array.isArray(sx) ? sx : [sx]))
    .flat(1)
