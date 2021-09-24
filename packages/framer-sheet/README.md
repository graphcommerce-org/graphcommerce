# React Framer Sheet

Component

## Minimal dependencies:

- [react](https://reactjs.org/)
- [framer-motion](https://www.framer.com/motion/)
- [clsx](https://github.com/lukeed/clsx/blob/master/src/index.js)

## Installation

`yarn add @graphcommerce/framer-sheet`

It uses framer motion's `m` component instead of the `motion` component. Make
sure you have set up
[`LazyMotion`](https://www.framer.com/api/motion/lazy-motion/).

## Usage

### Inline styles

```tsx
import {
  Sheet,
  SheetBackdrop,
  SheetContainer,
  SheetDragIndicator,
  SheetPanel,
} from '@graphcommerce/framer-sheet'
import styles from '@graphcommerce/framer-sheet/styles'
import React from 'react'

type Props = { children: React.ReactNode }

export default function SheetPageUi({ children }: Props) {
  const classes = useSheetStyles()

  return (
    <Sheet open variant='top'>
      <SheetBackdrop styles={styles} />
      <SheetContainer styles={styles}>
        <SheetPanel
          dragHandle={<SheetDragIndicator styles={styles} />}
          styles={styles}
        >
          {children}
        </SheetPanel>
      </SheetContainer>
    </Sheet>
  )
}
```

### Material UI

```tsx
import { StyleRules, Theme, makeStyles } from '@material-ui/core'
import { ClassNameMap } from '@material-ui/styles'
import {
  Sheet,
  SheetBackdrop,
  SheetContainer,
  SheetDragIndicator,
  SheetPanel,
} from '@graphcommerce/framer-sheet'
import styles, { ClassKeys } from '@graphcommerce/framer-sheet/styles'
import React from 'react'

const useSheetStyles = makeStyles<Theme, never, ClassKeys>(
  styles as StyleRules<ClassKeys>,
) as (props?: Record<string, unknown>) => ClassNameMap<ClassKeys>

type Props = { children: React.ReactNode }

export default function SheetPageUi({ children }: Props) {
  const classes = useSheetStyles()

  return (
    <Sheet open variant='top'>
      <SheetBackdrop classes={classes} />
      <SheetContainer classes={classes}>
        <SheetPanel
          dragHandle={<SheetDragIndicator classes={classes} />}
          classes={classes}
        >
          {children}
        </SheetPanel>
      </SheetContainer>
    </Sheet>
  )
}
```
