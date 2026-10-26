---
'@graphcommerce/next-ui': patch
---

`PopperPanel` passes `popperProps` to the `Popper` and merges `popperProps.sx` with its own `sx`. It passed `popperProps` to `PopperPanelActions`, so the prop had no effect.
