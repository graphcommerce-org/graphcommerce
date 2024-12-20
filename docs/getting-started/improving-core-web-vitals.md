# Improving Core Web Vitals

GraphCommerce has a strict focus on getting great scores on Google's Core Web
Vitals. This document outlines the steps we take to ensure that our frontend is
performant.

- LCP: Good: \<=2.5s Needs Improvement: \<=4s Bad: \>4s
- CLS: Good: \<=0.1 Needs improvement: \<=0.25 Bad: \>0.25
- INP: Good: \<=200ms Needs improvement: \<=500ms Bad: \>500ms

To get a good LCP and CLS there are a few things we need to do.

## Rendering phases of GraphCommerce pages

Rendering of the page is done in three main phases.

Rule of thumb: Move as much work up the phases as possible.

### Phase one: HTML/CSS and images.

The HTML document containing all the HTML and CSS is downloaded and rendered on
the frontend. Optimizing for this phase is usually where to start.

The goal is that the page should look great in this phase on mobile and desktop.

Of course not everything can be achieved with only HTML/CSS/Images. Customer
specific information is not present in this phase, the server only sends
session-less information to the browser. So any session specific information
will be missing here.

Solution: Disable JavaScript in the Chrome inspector and reload the page.

Rule of thumb: Most of the attention should be put on getting as much of the
page rendered as possible in this phase.

#### Images are loaded too late

Make sure the images that are required for this phase have the `loading=eager`
property.

### Phase two: React hydration

Hydration is the process is to "attach" React to the HTML that was rendered by
the server. React will attach to the HTML that exists inside the DOM and take
over managing the DOM inside it. Next.js automatically does this for the root
component.

#### Pitfall: Hydration errors

Hydration errors are problematic for performance as this will cause React to
rerender the entire page. This means that after hydration is complete, React
will start to rerender the entire page. This will thus double the amount of work
React has to do.

See Pitfall in in this chapter:
https://react.dev/reference/react-dom/client/hydrateRoot#hydrating-server-rendered-html

Solution: Keep an eye on the console for hydration errors and fix them.

#### Pitfall: Long hydration phase

Keep the hydration phase as short as possible. Web Vitals does not measure the
execution time directly but there is a case where this happens:

When React starts hydration it will start to listen to all event listeners. So
even before hydration is complete the clicks of the user will be registered and
will be replayed when hydration is complete. This also means that the whole
hydration phase will count against the INP metric.

The longer the hydration phase, the more often it will be measured as the INP
metric. The more negatively it will affect the Core Web Vitals and user
experience.

Solution: Use the React Profiler to see where work is being done and optimize
that.

### Phase three: Apollo Client queries

To load session specific data, Apollo Client is used. After the first render is
complete, the Apollo Client data becomes available.

Most frequently used queries are automatically persisted (cached) in the local
storage of the browser (key: `apollo-cache-persist`). By default everything is
persisted, except for pruned data (see
[persistenceMapper](https://github.com/graphcommerce-org/graphcommerce/blob/3900c7c9e3741fe110378f1a03dd54b4db8b26d9/packages/graphql/components/GraphQLProvider/persistenceMapper.ts#L28-L37)).

#### Pitfall: Non-session specific queries are used for the initial render

Since this phase is late, do not use the result of non-session specific queries
for the initial render. This also causes rerenders of the components causing all
vitals to be affected.

Solution: Move data fetching to the `getStaticProps` or `getServerSideProps`
functions. That can be a bit unergonomic, in that case move the data fetching
requirements to the GraphQL Mesh layer, by creating additional resolvers.

For example, it has been complex to get attribute option value labels like the
brand of a product without doing an additional `customAttributeMetadataV2`
query. Fetching this information separately requires precise coordination to
make it work even in getStaticProps.

To solve this the query fetching the attribute option values has been moved to
the GraphQL Mesh layer with the
[`ProductInterface.custom_attributeV2`](https://github.com/graphcommerce-org/graphcommerce/blob/canary/packages/magento-graphql/schema/ProductInterface-custom_attribute.graphqls)
and it's
[resolver](https://github.com/graphcommerce-org/graphcommerce/blob/canary/packages/magento-graphql/mesh/customAttributeV2Resolver.ts)
and
[mesh configuration plugin](https://github.com/graphcommerce-org/graphcommerce/blob/canary/packages/magento-graphql/plugins/meshConfigAttrValue.ts).

## Prevent components outside of the viewport from unnecessarily hydrating

To keep the Hydration phase as short as possible, it's a good idea to postpone
the hydration of (heavy) components that are outside of the viewport until they
are needed. By using `<LazyHydrate>`, the component can be hydrated either
manually, by setting the `hydrated` prop to true or automatically by the
IntersectionObserver inside `<LazyHydrate>` (as soon as the component comes into
view). It is recommended to set an estimated height value on the `height` prop.
This will reserver space for the component, when the page is loaded clientside.
This is to prevent multiple `LazyHydrate` components below each other from
intersecting all at once (as they do not have any HTML, and thus any height,
when loaded clientside). This height does not need to be exact.

The IntersectionObserver method of hydrating should never be used for components
that are inside the viewport on pageload, as it requires JS and is asynchronous.
When items are rendered in a loop and the first few items are inside the
viewport, these should be set to `hydrated={true}` based on the index of the
loop.

Example 1:

```tsx
import { LazyHydrate } from '@graphcommerce/next-ui'

function MyLayout() {
  return (
    <MyComponentAboveTheFold>
      Immediately hydrated
    </MyComponentAboveTheFold>

    <LazyHydrate hydrated={true}>
      <MyComponentAboveTheFold>
        Immediately hydrated
      </MyComponentAboveTheFold>
    </<LazyHydrate>

    <LazyHydrate height={500}>
      <MyExpensiveComponentBelowTheFold>
        Only hydrated when scrolled into view
      </MyExpensiveComponentBelowTheFold>
    </LazyHydrate>
  )
}
```

Example 2:

```tsx
export function MyItems(props) {
  const { items, loadingEager = 2 } = props

  return (
    <>
      {items.map((item, index) => (
        // The first two items are hydrated immediately. Any items after that are hydrated on intersection
        <LazyHydrate
          key={item.id}
          hydrated={index < loadingEager ? true : undefined}
          height={500}
        >
          <MyComponent {...item} />
        </LazyHydrate>
      ))}
    </>
  )
}
```

## Conditionally render on mobile/desktop

TLDR: Use the `<MediaQuery>` component instead of useMediaQuery or CSS
breakpoints.

To render UI conditionally for various breakpoints it is practically always
faster to render them conditionally with CSS than it is to conditionallty render
components with JS. However rendering conditionally with CSS will cause
increased JS executing time, Total Blocking Time and possibly INP issues.

### Conditionally render with JS: useMediaQuery

useMediaQuery: When you are now using useMediaQuery to conditionally render
content for mobile or desktop.

This means that hooks like useMediaQuery should almost never be used.
[See docs](https://mui.com/material-ui/react-use-media-query/#server-side-rendering)
and [examples](https://mui.com/system/display/#hiding-elements).

> Server-side rendering and client-side media queries are fundamentally at odds.
> Be aware of the tradeoff.

Also see
https://mui.com/material-ui/react-use-media-query/#server-side-rendering

1.  Is very slow as it has to wait for the JS to initialize on pageload.
2.  Can cause CLS problems if the useMediaQuery is used to render elements in
    the viewport.
3.  Can cause LCP issues if useMediaQuery is used to render the LCP element.
4.  Causes TBT problems as a component always needs to be rerendered. (And bad
    TBT can cause INP problems)
5.  HTML isn't present in the DOM, which can cause SEO issues.

### Conditionally render with CSS: CSS Media query

When you are using CSS to show or hide content based on media queries. Causes
TBT problems as both code paths need to be rendered. Bad TBT can cause INP
problems.

```tsx
function RenderConditionallyForCertainBreakpoints() {
  return (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        hide on screens wider than md
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        hide on screens smaller than md
      </Box>
    </>
  )
}
```

### MediaQuery component

To solve both of the above problems we can use the `<MediaQuery>` component. It
will conditionally render/hydrate the component based on the media query and not
execute the JS if the media query does not match.

1. On the server both code paths are rendered as normal, like you would with the
   conditional render with CSS. On the first browser render (where JS is loaded)
   it will conditionally show the component based on the CSS media query.
2. During hydration the component will be hydrated only if the media query
   matches. If the media query doesn't match it will not be hydrated (and thus
   not execute  
   the JS).
3. When the media query matches the component will rerender and show the
   component.
4. When components are created on the client, they are conditionally rendered.

Example:

```tsx
import { MediaQuery } from '@graphcommerce/next-ui'

function MyLayout() {
  return (
    <MediaQuery query={(theme) => theme.breakpoints.up('md')}>
      <MyExpensiveDesktopComponent>
        Only visisble on desktop
      </MyExpensiveDesktopComponent>
    </MediaQuery>
  )
}
```

## Use Context + useState cautiously

Contexts + useState should be used cautiously. When the state updates, it causes
ALL components within the context provider to rerender, not just the components
that use the context. When wrapping a lot of components inside a context, this
can become very expensive.

Solution for state that involves query data: Use Apollo Client cache, by using
`useQuery` for data that is already fetched on the server and cached by Apollo.

Solution for local state: use
[Apollo Reactive variables](https://www.apollographql.com/docs/react/local-state/reactive-variables)

## Image resizing

When using the Image component, the sizes prop should be set correctly so no
unnecessarily large images are served. The prop accepts either a string (vw, px,
calc(), etc) or an object with breakpoints and a string value. See the
[prop type](https://github.com/graphcommerce-org/graphcommerce/blob/canary/packages/image/components/Image.tsx#L176-L185)
for all available options.

Example:

```tsx
<Image
  layout='fill'
  alt={item.label}
  src={item.url}
  sizes={{
    0: '100vw',
    [theme.breakpoints.values.md]: '50vw',
  }}
/>
```

## Preventing a query waterfall

When querying inside `getStaticProps`, only use `await` when the data is
required for something else inside `getStaticProps`. Otherwise it should be
awaited in the return statement. When a query is awaited immediately, it halts
the code at that point until that query completes. Meaning any queries called
after that will be called in serial. Awaiting all queries in the return
statement allows the queries to be called in parallel.

Example:

```tsx
// Bad, because each query needs to wait until the previous one is completed entirely before being fired
export const getStaticProps: GetPageStaticProps = async (context) => {
  // Query takes 100ms - code is halted until it finishes
  const {data: queryOne} = await staticClient.query({ query: queryOneDocument })
  // Query takes 100ms - code is halted until it finishes
  const {data: queryTwo} = await staticClient.query({ query: queryTwoDocument })
  // Query takes 100ms - code is halted until it finishes
  const {data: queryThree} = await staticClient.query({ query: queryThreeDocument })


  return {
    props: {
      ...queryOne
      ...queryTwo
      ...queryThree
      // Total wait time 300ms
    },
  }
}
```

```tsx
// Good, because each query is fired in parallel and only awaited when each query is already running in the background
export const getStaticProps: GetPageStaticProps = async (context) => {
  // Query takes 100ms - but it runs in the background, code continues execution
  const queryOne = staticClient.query({ query: queryOneDocument })
  // Query takes 100ms - but it runs in the background, code continues execution
  const queryTwo = staticClient.query({ query: queryTwoDocument })
  // Query takes 100ms - but it runs in the background, code continues execution
  const queryThree = staticClient.query({ query: queryThreeDocument })

  return {
    props: {
      // Awaits query (100ms)
      ...(await queryOne).data
      // Awaits query, already finished in the background (0ms)
      ...(await queryTwo).data
      // Awaits query, already finished in the background (0ms)
      ...(await queryThree).data
      // Total wait time 100ms
    },
  }
}
```
