# Framer scroller

In short: A React API for
[Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap)

## Features:

- Pagination dots
- Hide scrollbar
- Prev / next buttons
- Resize animatable
- Scrollable on mobile and desktop (if the mouse supports horizontal scrolling)
- Drag support on desktop (on mobile you just scroll the diff, having the same
  effect)

## Goals:

- Should use the platforms Scroll Snap features to do the heavy lifting
- Should be resizable with an animatin without excessive rerenders

## Required libraries:

- Framer motion
- Reach digital Image for the MotionImageAspect
- Material UI

## Minimal example

```tsx
import {
  Scroller,
  ScrollerProvider,
  ScrollerDots,
  ScrollerButton,
} from '@graphcommerce/framer-scroller'

function MyScroller() {
  return (
    <ScrollerProvider>
      <Scroller>
        <div style={{ height: 400 }}>item1</div>
        <div style={{ height: 400 }}>item2</div>
        <div style={{ height: 400 }}>item3</div>
        <div style={{ height: 400 }}>item4</div>
        <div style={{ height: 400 }}>item5</div>
        <div style={{ height: 400 }}>item6</div>
        <div style={{ height: 400 }}>item7</div>
      </Scroller>
      <ScrollerButton>Next</ScrollerButton>
    </ScrollerProvider>
  )
}
```

## More examples

[See the example](./example/pages/index.tsx)
