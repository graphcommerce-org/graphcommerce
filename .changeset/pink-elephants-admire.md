---
'@graphcommerce/framer-scroller': patch
---

`useScrollTo` improvements for easier debugging:

- When a `scrollTo` animation is requesed while an animation is is progress it will throw an error
- When a `scrollTo` animation is retriggered more than 5 times, it will throw an error
- When a `scrollTo` detects the overlay is resized after the animation it will show a warning.
