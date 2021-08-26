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
} from '@reachdigital/framer-scroller'

function MyScroller() {
  return (
    <ScrollerProvider>
      <Scroller
        style={{
          display: `grid`,
          gridAutoFlow: `column`,
          gridTemplateColumns: `repeat(100, 100%)`,
          gridTemplateRows: `100%`,
          height: 400,
        }}
      >
        <div>item1</div>
        <div>item2</div>
        <div>item3</div>
        <div>item4</div>
        <div>item5</div>
        <div>item6</div>
        <div>item7</div>
      </Scroller>
      <ScrollerButton>Next</ScrollerButton>
    </ScrollerProvider>
  )
}
```

## More examples

[See the example](./example/pages/index.tsx)
