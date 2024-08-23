export const lighten = (
  property: string,
  color: string,
  coefficient: number | string,
  fallback?: string,
) => ({
  [property]: fallback || `${color}`,
  '@supports (color: hsl(from white h s l))': {
    [property]: `rgb(from ${color} round(down, calc(r + ((255 - r) * (${coefficient})))) round(down, calc(g + ((255 - g) * (${coefficient})))) round(down, calc(b + ((255 - b) * (${coefficient})))))`,
  },
})

export const darken = (
  property: string,
  color: string,
  coefficient: number | string,
  fallback?: string,
) => ({
  [property]: fallback || `${color}`,
  '@supports (color: hsl(from white h s l))': {
    [property]: `rgb(from ${color} round(down, calc(r * (1 - (${coefficient})))) round(down, calc(g * (1 - (${coefficient})))) round(down, calc(b * (1 - (${coefficient})))))`,
  },
})
