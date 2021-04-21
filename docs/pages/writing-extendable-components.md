# Writing extendable components

- A component **must** expose a `classes` prop to allow for styling.
- A component **should** merge and expose the `classes` prop of child
  components.
- A component **may** pass-though props of child components by using
  `Pick<Component, 'prop'>`
- A component **should not** pass-though all props of a child component
- A component **must not** only be an assembly of other components without
  modifying the behavior / styles / layout of children.

## Component theming and layouts

For the users of components it’s vital that they are able to customize the theme
and layout of a component.

A lot can be accomplished by modifying the CSS of a component, to make this
possible we expose the `classes` property of a component. We’re following the
Material UI guidelines in this ragard:
https://material-ui.com/styles/advanced/#makestyles

Below is a full typescript example:

```tsx
import { Button, makeStyles, Theme, Typography } from '@material-ui/core'
import { UseStyles } from '@reachdigital/next-ui/Styles'

const useStyles = makeStyles((theme: Theme) => ({
  myComponentRoot: {
    //..your styles
  },
}))

export type MyComponentProps = React.PropsWithChildren<
  UseStyles<typeof useStyles>
>

function MyComponent(props: MyComponentProps) {
  const classes = useStyles(props)
  return <div className={classes.myComponentRoot}>{children}</div>
}
```

## Composing multiple components

If a component is composed of multiple other components we need to pass through
all the available `classes` from the parent to the child.

Example that exposes the classes of `MyComponent`

```tsx
const useStyles = makeStyles((theme: Theme) => ({
  myWrappingComponentRoot: {
    //..your styles
  },
}))

type MyWrappingComponentProps = React.PropsWithChildren<
  UseStyles<typeof useStyles> & Pick<MyComponentProps, 'classes'>
>

function MyWrappingComponent(props: MyWrappingComponentProps) {
  const classes = useStyles(props)
  return (
    <div className={classes.myWrappingComponentRoot}>
      <MyComponent classes={classes}>{children}</MyComponent>
    </div>
  )
}
```

There however is an exception:

## Global Styles: Styling deeply nested Button/TextField/Link/Badge/List/etc. components.

To style these components, we use Material-UI’s global theming functionality:
https://material-ui.com/customization/globals/#global-css

As a component implementor, you therefor do not need to expose all button
classes, for example:

If the previous component uses the following renderer instead, we do not need to
expose all button classes.

```tsx
function MyComponent() {
  //...other stuff
  return (
    <div className={classes.myWrappingComponentRoot}>
      <MyComponent classes={classes}>
        <Button>{children}</Button>
      </MyComponent>
    </div>
  )
}
```

## Exposing props

We of course are allowed to expose props of `<Button/>` like `variant` etc.

```tsx
// of course, also add all the UseStyles, etc, see above examples.
type MyOtherComponentProps = Pick<ButtonProps, 'variant'>

function MyOtherComponent({ variant }: MyOtherComponentProps) {
  //...other stuff
  return (
    <div className={classes.myWrappingComponentRoot}>
      <MyComponent classes={classes}>
        <Button variant={variant}>{children}</Button>
      </MyComponent>
    </div>
  )
}
```
