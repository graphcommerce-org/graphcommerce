export default function resonsiveTyp(min: number, max: number): Object {
  const breakpoints = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1536,
    xl: 1920,
  }
  let mediaBreakpoints = { fontSize: min }

  const bpArray = Object.keys(breakpoints).map((key) => [breakpoints[key]])
  const step = (max - min) / (bpArray.length - 1)

  bpArray.map((value, key) => {
    mediaBreakpoints = {
      ...mediaBreakpoints,
      [`@media (min-width: ${String(value)}px)`]: {
        fontSize: `${min + key * step}px`,
      },
    }
  })
  return mediaBreakpoints
}
