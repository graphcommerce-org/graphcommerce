export default function breakpointVal(
  property: string,
  min: number,
  max: number,
  breakpointsObject: object,
) {
  const minSize = 320
  const breakpoints = Object.values(breakpointsObject)
  const spread = breakpoints[breakpoints.length - 1] - minSize

  return Object.fromEntries(
    breakpoints.map((breakpoint, index) => {
      // Get the size between this breakpoint and the previous breakpoint
      const between = (breakpoint + (breakpoints[index + 1] ?? breakpoint)) / 2
      // Calculate the size of the value
      const size = Math.max(min, ((between - minSize) / spread) * (max - min) + min)
      const value = `${Math.round(size * 100) / 100}px`

      return [`@media (min-width: ${breakpoint}px )`, { [property]: value }]
    }),
  )
}

// const theme = useTheme()

// const breakpointValT = (property: string, min: number, max: number, t: Theme) =>
//   breakpointVal(property, min, max, Object.values(t.breakpoints.values))

// console.log(breakpointValT('fontSize', 10, 20, theme))
// console.log(breakpointVal('fontSize', 10, 20, [0, 500, 1000, 2000]))
