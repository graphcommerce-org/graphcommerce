import { Interpolation, Theme } from '@mui/material'

function classesObj<Name extends string, ClassNames extends ReadonlyArray<string>>(
  name: Name,
  slotNames: ClassNames,
) {
  return Object.fromEntries(slotNames.map((slot) => [slot, `${name}-${slot}`])) as {
    [P in ClassNames[number]]: `${Name}-${P}`
  }
}

/** Maps incoming classes to a selectors that can be used to extend the component */
const toSelectors = <O extends Record<string, string>>(
  obj: O,
): {
  [P in keyof O]: `& .${O[P]}`
} => {
  const mapped = Object.entries(obj).map(([target, className]) => [target, `& .${className}`])
  return Object.fromEntries(mapped)
}

export type ExtendableComponent<StyleProps extends Record<string, unknown>> = {
  defaultProps?: Partial<StyleProps>
  variants?: { props: Partial<StyleProps>; style: Interpolation<{ theme: Theme }> }[]
}

export function componentSlots<Name extends string, ClassNames extends ReadonlyArray<string>>(
  componentName: Name,
  slotNames: ClassNames,
) {
  const classes = classesObj(componentName, slotNames)
  const selectors = toSelectors(classes)
  return { componentName, classes, selectors }
}
