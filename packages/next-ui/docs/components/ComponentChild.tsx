/* eslint-disable import/no-extraneous-dependencies */
import { extendableComponent } from '@graphcommerce/next-ui'
import { styled } from '@mui/material'
import { ComponentProps } from 'react'

// ---- Setup ----

// To be able to select children from the consuming side, we define the classes.
// Minimal utility to convert the classes to selectors. Hover over `selectors` to see what it means.
const componentName = 'MyComponent' as const
const { classes, selectors } = extendableComponent(componentName, ['root', 'child'] as const)

// ---- Root component ----

// We're creating a new styled('div') component and apply our styles to it.
const Root = styled('div', {
  name: componentName,
  target: classes.root,
})(({ theme }) => ({
  display: 'flex',
  color: theme.vars.palette.text.primary,
}))

// ---- Child component ----

const Child = styled('div', {
  name: componentName,
  target: classes.child,
})(({ theme }) => ({
  backgroundColor: theme.vars.palette.primary.main,
  width: 100,
  height: 100,
}))

// ---- MyComponent component ----

// Props of the component we are writing
export type MyComponentProps = Pick<ComponentProps<typeof Root>, 'sx' | 'children'>

export function MyComponent(props: MyComponentProps) {
  const { sx, children } = props
  return (
    <Root as='span' sx={sx}>
      My Component
      <Child>{children}</Child>
    </Root>
  )
}
MyComponent.selectors = selectors
