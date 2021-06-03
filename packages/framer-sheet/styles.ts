import { Styles } from '@reachdigital/framer-utils'
import { SheetBackdropClassKeys } from './components/SheetBackdrop'
import { SheetContainerClassKeys } from './components/SheetContainer'
import { SheetDragIndicatorClassKeys } from './components/SheetDragIndicator'
import { SheetPanelClasskey } from './components/SheetPanel'

export type ClassKeys =
  | SheetDragIndicatorClassKeys
  | SheetBackdropClassKeys
  | SheetContainerClassKeys
  | SheetPanelClasskey

const styles: Styles<ClassKeys> = {
  // SheetDragIndicatorClassKeys
  indicatorRoot: {
    display: 'flex',
    justifyContent: 'center',
    gridArea: 'center',
    padding: 6,
  },
  indicatorRoottop: {},
  indicatorRootbottom: {
    paddingTop: 12,
  },
  indicatorRootright: {
    flexDirection: 'column-reverse',
  },
  indicatorRootleft: {
    flexDirection: 'column-reverse',
    alignItems: 'flex-end',
  },
  indicator: { borderRadius: 99, backgroundColor: '#ddd' },
  indicatorleft: { width: 4, height: 18 },
  indicatorright: { width: 4, height: 18 },
  indicatortop: { width: 18, height: 4 },
  indicatorbottom: { width: 18, height: 4 },

  // SheetBackdropClassKeys
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    touchAction: 'none', // Disable iOS body scrolling
    willChange: 'opacity',
    border: 0,
    padding: 0,
  },

  // SheetContainerClassKeys
  container: {
    position: 'absolute',
    maxWidth: '100%',
    boxSizing: 'border-box',
    maxHeight: '100%',
    display: 'flex',
    pointerEvents: 'none',
  },
  containertop: {
    width: '100%',
    left: 0,
    top: 0,
    paddingBottom: 24,
    flexDirection: 'column-reverse',
  },
  containerbottom: {
    width: '100%',
    left: 0,
    bottom: 0,
    paddingTop: 24,
    flexDirection: 'column',
  },
  containerleft: {
    height: '100%',
    top: 0,
    left: 0,
    paddingRight: 24,
    flexDirection: 'row-reverse',
  },
  containerright: {
    height: '100%',
    top: 0,
    right: 0,
    paddingLeft: 24,
    flexDirection: 'row',
  },

  // SheetPanelClasskey
  dragHandle: {
    backgroundColor: '#fff',
    boxShadow: '0px -2px 16px rgba(0, 0, 0, 0.3)',
    willChange: `transform`,
    pointerEvents: 'all',
    display: 'grid',
    columnGap: 6,
  },
  dragHandletop: {
    borderBottomRightRadius: '8px',
    borderBottomLeftRadius: '8px',
    padding: `6px 16px 12px 16px`,
    gridTemplate: `"left center right"`,
    gridTemplateColumns: `1fr min-content 1fr`,
  },
  dragHandlebottom: {
    borderTopRightRadius: '8px',
    borderTopLeftRadius: '8px',
    padding: 6,
    gridTemplate: `"left center right"`,
    gridTemplateColumns: `1fr min-content 1fr`,
  },
  dragHandleleft: {
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
    padding: `12px 6px 12px 0`,
    gridTemplate: `"center"`,
  },
  dragHandleright: {
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px',
    gridTemplate: `"center"`,
  },
  content: {
    backgroundColor: '#fff',
    willChange: `transform`,
    overflowY: 'auto',
    pointerEvents: 'all',
  },
  contenttop: {},
  contentbottom: {},
  contentleft: {},
  contentright: {},
  back: { position: 'absolute', left: 12, top: 12 },
  forward: { position: 'absolute', right: 2, top: 12 },
}
export default styles
