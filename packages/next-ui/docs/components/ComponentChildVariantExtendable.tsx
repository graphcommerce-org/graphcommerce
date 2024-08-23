/* eslint-disable import/no-extraneous-dependencies */
import { ExtendableComponent, extendableComponent } from '@graphcommerce/next-ui'
import { styled } from '@mui/material'
import { ComponentProps } from 'react'

// ---- Setup ----

// To be able to select children from the consuming side, we define the classes.
// Minimal utility to convert the classes to selectors. Hover over `selectors` to see what it means.
const componentName = 'MyComponent' as const
const { classes, selectors } = extendableComponent(componentName, ['root', 'child'] as const)

// Props that are used in our styled elements to render different CSS
type MyComponentStyleProps = { variant?: 'cool' | 'supercool' }

// Expose the component to be exendable in your theme.components
declare module '@mui/material/styles/components' {
  interface Components {
    MyComponent?: ExtendableComponent<MyComponentStyleProps>
  }
}

// ---- Root component ----

// We're creating a new styled('div') component and apply our styles to it.
const Root = styled('div', {
  name: componentName,
  target: classes.root, // Adds a class name `MyComponent` to the div.
})<MyComponentStyleProps>(({ theme }) => ({
  // Styles are added
  display: 'flex',
  color: theme.vars.palette.text.primary,
}))

// ---- Child component ----

const Child = styled('div', {
  name: componentName,
  slot: 'child', // A slot is used as we do not want to receive style overrides from theme.components.MyComponent.variants.
  target: classes.child, // Mandatory for children, adds a class name `MyComponent-child` so it can be styled from the outside.
})<MyComponentStyleProps>(({ theme, variant }) => ({
  backgroundColor: theme.vars.palette.primary.main,
  width: 100,
  height: 100,
  fontSize: variant === 'supercool' ? 'large' : 'normal',
}))

// ---- MyComponent component ----

// Props of the component we are writing
export type MyComponentProps = Pick<ComponentProps<typeof Root>, 'sx' | 'children'> &
  MyComponentStyleProps

export function MyComponent(props: MyComponentProps) {
  const { sx, children, variant } = props
  return (
    <Root as='span' sx={sx} variant={variant}>
      My Component <Child variant={variant}>{children}</Child>
    </Root>
  )
}

MyComponent.selectors = selectors
