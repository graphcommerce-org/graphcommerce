import {
  Scroller,
  ScrollerButton,
  ScrollerPageCounter,
  ScrollerProvider,
} from '@graphcommerce/framer-scroller'
import { Theme, makeStyles } from '@material-ui/core'
import React, { ReactNode } from 'react'
import Row from '../../Row'
import { UseStyles } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'
import SvgImageSimple from '../../SvgImage/SvgImageSimple'
import { iconChevronLeft, iconChevronRight } from '../../icons'

const useStyles = makeStyles(
  (theme: Theme) => ({
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
      width: '100%',
      gridColumnGap: theme.spacings.md,
      gridRowGap: theme.spacings.lg,
      alignContent: 'space-around',
      paddingRight: theme.page.horizontal,
      gridAutoColumns: responsiveVal(200, 400),
    },
    sliderButtons: {
      [theme.breakpoints.down('sm')]: {
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
  }),
  { name: 'SidebarSlider' },
)

export type SidebarSliderProps = { children: ReactNode; sidebar: ReactNode } & UseStyles<
  typeof useStyles
>

export default function SidebarSlider(props: SidebarSliderProps) {
  const { children, sidebar } = props
  const classes = useStyles(props)

  return (
    <Row maxWidth={false} disableGutters>
      <ScrollerProvider scrollSnapAlign='start'>
        <div className={classes.root}>
          <div className={classes.sidebar}>
            <div>{sidebar}</div>
            <ScrollerPageCounter />
          </div>

          <div className={classes.scrollerContainer}>
            <Scroller className={classes.scroller}>{children}</Scroller>
            <div className={classes.centerLeft}>
              <ScrollerButton layout direction='left' className={classes.sliderButtons}>
                <SvgImageSimple src={iconChevronLeft} />
              </ScrollerButton>
            </div>
            <div className={classes.centerRight}>
              <ScrollerButton layout direction='right' className={classes.sliderButtons}>
                <SvgImageSimple src={iconChevronRight} />
              </ScrollerButton>
            </div>
          </div>
        </div>
      </ScrollerProvider>
    </Row>
  )
}
