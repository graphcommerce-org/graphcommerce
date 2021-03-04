# Framer Slider

Composable slider to be used in various scenario's from the most basic simple
slider area to a complex zoomable product gallery.

## Features:

- Composable: see [variants](variants)
- Drag with mouse to slide
- Resize slider
- Keyboard support for: prev/next

## Known issues:

- SliderScroller: When resizing, the slider will not update the drag position
  when the x-position is not 0

## Todo

- Hide prev / next on mobile
- Support all variants of
  [`scroll-snap-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align),
  [`scroll-snap-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type),
  [`scroll-snap-stop`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop)
- Keyboard support for: escape zoom + trap focus for full screen handling
- Mouse click SliderImage to zoom slider
- Pinch to zoom
- Drag y to dismiss slider
