# Typography

By default
[the Material UI `h1`-`h6` typography values](https://material-ui.com/components/typography/#component)
is an implementation of the
[Material Design Headline type scale](https://material.io/design/typography/the-type-system.html#type-scale).

To have more flexibility

- Note: The typography values are referencing styles and have nothing to do with
  actual `<h1/>`-`</h6/>` HTML elements (even though they are mapped 1:1 by
  default). One is completelt free to use different styles based on their
  requirements.
- There however are some problems with the way Material UI implementation:
  Material Design uses different typography headers for different breakpoints.
  For example, if we take a look at
  [Applying the type scale](https://material.io/design/typography/the-type-system.html#applying-the-type-scale)
  we see that the Headline 6 element is used in the `<h1/>` location. This would
  need to be rendered as a h1 (or h2) style on a desktop.
- This results in the following variant to headline mapping for each breakpoint
- Variant/Breakpoint xs sm md lg xl h1 headline4 headline3 headline2 headline1
  h2 headline5 headline4 headline3 headline2 headline1 h3 headline6 headline6
  headline5 headline4 headline3 h4 X X headline6 headline5 headline4 h5 X X X
  headline6 headline5 h6 X X X X headline6
- This effectively means that it's only safe to use h1 to h3 from this
  perspective.
- However, Material Design's type system offers `subtitle1` and `subtitle2` that
  can be used that should be used on combination with `body1` and `body2`.
- Since we aren't using the h4-h6 variants they can be repurposed for different
  usecases:
