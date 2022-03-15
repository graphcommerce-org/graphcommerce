---
'@graphcommerce/framer-scroller': minor
---

Add a state-class to ScrollerDot when the dot is active to customize the colors of the dots.

```tsx
<ScrollerDots
  layout
  sx={{
    '& .ScrollerDot-circle': {
      bgcolor: 'green',
    },
    '& .ScrollerDot-circle.active': {
      bgcolor: 'hotpink',
      opacity: '1 !important',
    },
  }}
/>
```
