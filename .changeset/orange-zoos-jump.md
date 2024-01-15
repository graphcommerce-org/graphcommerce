---
'@graphcommerce/next-ui': patch
---

Removed the 'NoSSR' functionality from `<WaitForQueries/>` component as it slows down rendering. The 'feature' was necessary for the following use case: When hydrating a component that was server rendered and was living inside a `<Suspense />` component. It would cause an hydration error and this was the workaround. With useSuspenseQuery and React 18, this problem will not occur.
