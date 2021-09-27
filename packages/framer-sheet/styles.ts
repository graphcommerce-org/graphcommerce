import { Styles } from '@graphcommerce/framer-utils'
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
    paddingBottom: 26,
    flexDirection: 'column-reverse',
  },
  containerbottom: {
    width: '100%',
    left: 0,
    bottom: 0,
    paddingTop: 26,
    flexDirection: 'column',
  },
  containerleft: {
    height: '100%',
    top: 0,
    left: 0,
    paddingRight: 26,
    flexDirection: 'row-reverse',
  },
  containerright: {
    height: '100%',
    top: 0,
    right: 0,
    paddingLeft: 26,
    flexDirection: 'row',
  },

  // SheetPanelClasskey
  dragHandle: {
    willChange: `transform`,
    pointerEvents: 'all',
    display: 'grid',
    columnGap: 6,
    borderBottom: 'none',
  },
  dragHandletop: {
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    // padding: `6px 16px 12px 16px`,
    gridTemplate: `"left center right"`,
    gridTemplateColumns: `1fr min-content 1fr`,
    backgroundColor: '#fff',
    boxShadow: '0px 2px 16px rgba(0, 0, 0, 0.3)',
  },
  dragHandlebottom: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    // padding: 6,
    gridTemplate: `"left center right"`,
    gridTemplateColumns: `1fr min-content 1fr`,
    backgroundColor: '#fff',
    boxShadow: '0px -2px 16px rgba(0, 0, 0, 0.3)',
    borderBottom: 'none',
  },
  dragHandleleft: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    padding: `12px 6px 12px 0`,
    gridTemplate: `"center"`,
    // position: 'absolute',
    // height: '100%',
    // zIndex: 1,
  },
  dragHandleright: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    gridTemplate: `"center"`,
    padding: `12px 6px 12px 0`,

    // position: 'absolute',
    // height: '100%',
    // zIndex: 1,
  },
  content: {
    backgroundColor: '#fff',
    willChange: `transform`,
    overflowY: 'auto',
    pointerEvents: 'all',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contenttop: {},
  contentbottom: {
    zIndex: 101,
  },
  contentleft: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  contentright: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  back: { position: 'absolute', left: 12, top: 12 },
  forward: { position: 'absolute', right: 2, top: 12 },

  // SheetDragIndicatorClassKeys
  indicatorRoot: {
    display: 'flex',
    justifyContent: 'center',
    gridArea: 'center',
    padding: 6,
  },
  indicatorRoottop: {
    padding: `4px 4px`,
  },
  indicatorRootbottom: {
    padding: `4px 4px`,
  },
  indicatorRootright: {
    flexDirection: 'column-reverse',
  },
  indicatorRootleft: {
    flexDirection: 'column-reverse',
    alignItems: 'flex-end',
  },
  indicator: { borderRadius: 99, backgroundColor: '#ddd' },
  indicatorleft: { width: 3, height: 12 },
  indicatorright: { width: 3, height: 12 },
  indicatortop: { width: 12, height: 3 },
  indicatorbottom: { width: 12, height: 3 },
}
export default styles
