import {
  Scroller,
  ScrollerButton,
  ScrollerPageCounter,
  ScrollerProvider,
} from '@graphcommerce/framer-scroller'
import { ReactNode } from 'react'
import { Row } from '../../Row'
import { UseStyles } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'
import { makeStyles, useMergedClasses } from '../../Styles/tssReact'
import { SvgIcon } from '../../SvgIcon/SvgIcon'
import { iconChevronLeft, iconChevronRight } from '../../icons'

const useStyles = makeStyles({ name: 'SidebarSlider' })((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'minmax(150px, 25%) 1fr',
    maxWidth: '100%',
  },
  sidebar: {
    display: 'grid',
    alignContent: 'space-between',
    padding: `0 ${theme.spacings.lg} 0 ${theme.page.horizontal}`,
  },
  scrollerContainer: {
    position: 'relative',
    minWidth: 1,
  },
  scroller: {
    gridColumnGap: theme.spacings.md,
    gridRowGap: theme.spacings.lg,
    paddingRight: theme.page.horizontal,
    gridAutoColumns: responsiveVal(200, 400),
  },
  sliderButtons: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  centerLeft: {
    display: 'grid',
    gridAutoFlow: 'row',
    gap: theme.spacings.xxs,
    position: 'absolute',
    left: theme.spacings.sm,
    top: `calc(50% - 28px)`,
  },
  centerRight: {
    display: 'grid',
    gap: theme.spacings.xxs,
    position: 'absolute',
    right: theme.spacings.sm,
    top: `calc(50% - 28px)`,
  },
}))

export type SidebarSliderProps = { children: ReactNode; sidebar: ReactNode } & UseStyles<
  typeof useStyles
>

export function SidebarSlider(props: SidebarSliderProps) {
  const { children, sidebar } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)

  return (
    <Row maxWidth={false} disableGutters>
      <ScrollerProvider scrollSnapAlign='start'>
        <div className={classes.root}>
          <div className={classes.sidebar}>
            <div>{sidebar}</div>
            <ScrollerPageCounter />
          </div>

          <div className={classes.scrollerContainer}>
            <Scroller className={classes.scroller} hideScrollbar>
              {children}
            </Scroller>
            <div className={classes.centerLeft}>
              <ScrollerButton direction='left' className={classes.sliderButtons}>
                <SvgIcon src={iconChevronLeft} />
              </ScrollerButton>
            </div>
            <div className={classes.centerRight}>
              <ScrollerButton direction='right' className={classes.sliderButtons}>
                <SvgIcon src={iconChevronRight} />
              </ScrollerButton>
            </div>
          </div>
        </div>
      </ScrollerProvider>
    </Row>
  )
}
