---
'@graphcommerce/next-ui': patch
---

Added MediaQuery Component: Render (and hydrate) a Component based on a media query given.

```tsx
<MediaQuery query={(theme) => theme.breakpoints.up('md')}>
  <MyExpensiveDesktopComponent>Only visisble on desktop</MyExpensiveDesktopComponent>
</MediaQuery>
```

When to use, replacement for:
1. useMediaQuery: When you are now using useMediaQuery to conditionally render content for mobile or desktop.
   a. Is very slow as it has to wait for the JS to initialize on pageload.
   b. Can cause CLS problems if the useMediaQuery is used to render elements in the viewport.
   c. Can cause LCP issues if useMediaQuery is used to render the LCP element.
   d. Causes TBT problems as a component always needs to be rerendered. (And bad TBT can cause INP problems)
   e. HTML isn't present in the DOM, which can cause SEO issues.

2. CSS Media query: When you are using CSS to show or hide content based on media queries.
   a. Causes TBT problems as both code paths need to be rendered. (And bad TBT can cause INP problems)

It wraps the component in a div that has 'display: contents;' when shown and 'display: none;' when hidden so it should not interfere with other styling.
It conditionally hydrates the component if the query matches. If it doesn't match, it will NOT hydrate the component (and thus not execute the JS).
