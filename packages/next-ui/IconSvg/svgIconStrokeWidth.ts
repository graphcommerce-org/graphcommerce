/**
 * Responsive strokeWidth calculation:
 *
 * - We want the stoke width to be inverse to the width of the element
 * - When the width is 96 we want strokeWidth to be 0.5
 * - When the width is 48 we want strokeWidth to be 1
 * - When the width is 24 we want strokeWidth to be 2
 * - To achieve this we have actual width of the element as defined by '1em'.
 * - We use the calc property to calculate the strokeWidth.
 *
 * Sensible values are:
 *
 * - `lowSize`: 10-20
 * - `highSize`: 50-150
 * - `lowStroke`: 0.5-2
 * - `highStroke`: 0.2-1
 */
export function svgIconStrokeWidth(
  lowSize: number,
  highSize: number,
  lowStroke: number,
  highStroke: number,
) {
  const val = `calc(${lowStroke}px - ((1em - ${lowSize}px) / (${highSize} - ${lowSize}) * (${lowStroke} - ${highStroke})))`
  return val
}
