import { capitalize, Interpolation, Theme } from '@mui/material'
import clsx from 'clsx'

function slotClasses<Name extends string, ClassNames extends ReadonlyArray<string>>(
  name: Name,
  slotNames: ClassNames,
) {
  return Object.fromEntries(slotNames.map((slot) => [slot, `${name}-${slot}`])) as {
    [P in ClassNames[number]]: `${Name}-${P}`
  }
}

/** Maps incoming classes to a selectors that can be used to extend the component */
const slotSelectorsMap = <O extends Record<string, string>>(
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

export function componentSlots<
  ComponentStyleProps extends Record<string, boolean | string | undefined>,
  Name extends string = string,
  ClassNames extends ReadonlyArray<string> = ReadonlyArray<string>,
>(componentName: Name, slotNames: ClassNames) {
  const classes = slotClasses(componentName, slotNames)
  const slotSelectors = slotSelectorsMap(classes)

  const stateClasses = (state: ComponentStyleProps) => {
    const mapped = Object.entries(state)
      .map(([key, value]) => {
        if (typeof value === 'boolean' && value === true) return key
        if (typeof value === 'string' && value.length > 0) return `${key}${capitalize(value)}`
        return ''
      })
      .filter(Boolean)

    return `${componentName} ${mapped.join(' ')}`
  }

  return {
    componentName,
    classes,
    selectors: {
      // ...stateSelectors,
      ...slotSelectors,
    },
    stateClasses,
  }
}
