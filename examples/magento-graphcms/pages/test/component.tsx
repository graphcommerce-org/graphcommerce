import { ExtendableComponent, toSelectors } from '@graphcommerce/next-ui'
import { styled, SxProps, Theme } from '@mui/material'

/**
 * Creating an extenable component from scratch which will become extenable.
 *
 * We want:
 *
 * - Ability to style the component
 * - Ability to style its child components
 * - Override its styles from the theme (!)
 */

/** Name of the component */
const name = 'MyComponent'

// Props that are used in our styled elements to render different CSS
type MyComponentStyleProps = { size?: 'large' | 'medium' | 'small' }

// Props of the component we are writing
type MyComponentProps = MyComponentStyleProps & {
  sx?: SxProps<Theme>
  children?: React.ReactNode
}

// Expose the component to be exendable in your theme.components
declare module '@mui/material/styles/components' {
  interface Components {
    MyComponent?: ExtendableComponent<MyComponentStyleProps, 'root' | 'child'>
  }
}

// To be able to select children from the consuming side, we define the classes.
export const classes = { child: `${name}-child` } as const

// Minimal utility to convert the classes to selectors. Hover over `selectors` to see what it means.
export const selectors = toSelectors(classes)

// We're creating a new styled('div') component and make it extenable.
const Root = styled('div', {
  name, // Name of the component we are building, not the same as the name of this styled('div)
  target: name, // Optional for Root, adds a class name `MyComponent` to the div.
  overridesResolver: (_, styles) => styles.root, // Allows for exstensibility. find the correct entry in theme.components.MyComponent.styleOverrides
  // MyComponentStyleProps allow additional props for the Root component and you can pass them through to the component.
})<MyComponentStyleProps>(({ theme, size }) => ({
  // Styling of the component.
  display: 'flex',
  color: theme.palette.text.primary,
  fontSize: size,
}))

const Child = styled('div', {
  name,
  slot: 'child', // A slot is used as we do not want to receive styles from theme.components.MyComponent.variants.
  target: classes.child, // Mandatory for children, adds a class name `MyComponent-child` so it can be styled from the outside.
  overridesResolver: (_, styles) => styles.child,
})<MyComponentStyleProps>(({ theme, size }) => [
  // The style props can be an array to do some more fancy stuff.
  {
    backgroundColor: theme.palette.primary.main,
    width: 100,
    height: 100,
  },
  size === 'medium' && {
    height: 150,
    width: 150,
  },
  size === 'large' && {
    height: 200,
    width: 200,
  },
])

function MyComponent(props: MyComponentProps) {
  const { sx, children, size: variant = 'medium' } = props
  return (
    <Root as='span' sx={sx} size={variant}>
      Root
      <Child size={variant}>
        {variant} {children}
      </Child>
    </Root>
  )
}

export default function Component() {
  return (
    <>
      <MyComponent
        size='small'
        sx={{
          border: 1,
          borderColor: 'primary.main',
          mb: 2,
          [selectors.child]: { color: 'primary.contrastText' },
        }}
      >
        Child
      </MyComponent>
      <MyComponent>Hi</MyComponent>
    </>
  )
}
