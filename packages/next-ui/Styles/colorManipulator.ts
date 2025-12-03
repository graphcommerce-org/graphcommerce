/**
 * CSS-variable-compatible color manipulation utilities.
 *
 * These utilities work with MUI's CSS theme variables (theme.vars.palette.*) where traditional MUI
 * color functions (alpha, lighten, darken) fail.
 */

/**
 * Apply alpha/opacity to a color using CSS color-mix. Works with CSS variables unlike MUI's
 * alpha().
 *
 * @example
 *   // Using with mainChannel (preferred for palette colors)
 *   ;`rgb(${theme.vars.palette.primary.mainChannel} / 0.5)`
 *
 *   // Using varAlpha for any CSS variable color
 *   varAlpha(theme.vars.palette.action.hover, 0.5)
 */
export const varAlpha = (color: string, opacity: number | string): string =>
  `color-mix(in srgb, ${color} calc(${opacity} * 100%), transparent)`

/**
 * Lighten a color property using CSS relative color syntax. Returns an object with the property and
 * a @supports fallback.
 *
 * @example
 *   sx={{
 *   ...lighten('backgroundColor', theme.vars.palette.background.default, 0.1),
 *   }}
 */
export const lighten = (
  property: string,
  color: string,
  coefficient: number | string,
  fallback?: string,
) => ({
  [property]: fallback || color,
  '@supports (color: hsl(from white h s l))': {
    [property]: `hsl(from ${color} h s calc(l + ((100 - l) * ${coefficient})))`,
  },
})

/**
 * Darken a color property using CSS relative color syntax. Returns an object with the property and
 * a @supports fallback.
 *
 * @example
 *   sx={{
 *   ...darken('backgroundColor', theme.vars.palette.background.default, 0.1),
 *   }}
 */
export const darken = (
  property: string,
  color: string,
  coefficient: number | string,
  fallback?: string,
) => ({
  [property]: fallback || color,
  '@supports (color: hsl(from white h s l))': {
    [property]: `hsl(from ${color} h s calc(l * (1 - ${coefficient})))`,
  },
})

/**
 * Lighten a color inline (returns a string, not an object). Use when you need just the color value,
 * not a property object.
 *
 * @example
 *   boxShadow: `0 0 0 4px ${lightenColor(theme.vars.palette.primary.main, 0.5)}`
 */
export const lightenColor = (color: string, coefficient: number | string): string =>
  `hsl(from ${color} h s calc(l + ((100 - l) * ${coefficient})))`

/**
 * Darken a color inline (returns a string, not an object). Use when you need just the color value,
 * not a property object.
 *
 * @example
 *   boxShadow: `0 0 0 4px ${darkenColor(theme.vars.palette.primary.main, 0.5)}`
 */
export const darkenColor = (color: string, coefficient: number | string): string =>
  `hsl(from ${color} h s calc(l * (1 - ${coefficient})))`
