import { Interpolation, Theme } from '@mui/material/styles'
import { capitalize } from '@mui/material/utils'

export type ExtendableComponent<StyleProps extends Record<string, unknown>> = {
  /**
   * Allows you to override the props of a component globally
   *
   * @see https://mui.com/customization/theme-components/#adding-new-component-variants
   */
  defaultProps?: Partial<StyleProps>
  /**
   * Allows you to define custom styling for a variant.
   *
   * @see https://mui.com/customization/theme-components/#adding-new-component-variants
   */
  variants?: { props: Partial<StyleProps>; style: Interpolation<{ theme: Theme }> }[]
}

export function slotClasses<Name extends string, ClassNames extends ReadonlyArray<string>>(
  name: Name,
  slotNames: ClassNames,
) {
  return Object.fromEntries(slotNames.map((slot) => [slot, `${name}-${slot}`])) as {
    [P in ClassNames[number]]: `${Name}-${P}`
  }
}

/** Maps incoming classes to a selectors that can be used to extend the component */
export const partselectorsMap = <O extends Record<string, string>>(
  obj: O,
): {
  [P in keyof O]: `& .${O[P]}`
} => {
  const mapped = Object.entries(obj).map(([target, className]) => [target, `& .${className}`])
  return Object.fromEntries(mapped)
}

/**
 * Utility function to:
 *
 * - Define parts
 * - Generate state css classes.
 */
export function extendableComponent<
  ComponentStyleProps extends Record<string, boolean | string | number | undefined>,
  Name extends string = string,
  ClassNames extends ReadonlyArray<string> = ReadonlyArray<string>,
>(componentName: Name, slotNames: ClassNames) {
  const classes = slotClasses(componentName, slotNames)
  const partselectors = partselectorsMap(classes)

  const withState = (state: ComponentStyleProps) => {
    const stateClas = Object.fromEntries(
      Object.entries<string>(classes).map(([slot, className]) => {
        const mapped = Object.entries(state).map(([key, value]) => {
          if (typeof value === 'boolean' && value === true) return key
          if (typeof value === 'string' && value.length > 0) return `${key}${capitalize(value)}`
          if (typeof value === 'number' && value > 0) return `${key}${value}`
          return ''
        })

        if (className) mapped.unshift(className)
        return [slot, mapped.filter(Boolean).join(' ')]
      }),
    ) as {
      [P in ClassNames[number]]: `${Name}-${P} ${string}`
    }

    return stateClas
  }

  return {
    classes,
    selectors: {
      // ...stateSelectors,
      ...partselectors,
    },
    withState,
  }
}
