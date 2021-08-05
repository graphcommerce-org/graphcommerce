import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { ReactNode } from 'react'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'
import SliderContainer from '../SliderContainer'
import SliderContext from '../SliderContext'
import SliderPageCounter from '../SliderPageCounter'
import SliderScroller from '../SliderScroller'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridTemplateColumns: 'minmax(150px, 25%) 1fr',
      maxWidth: '100%',
      marginBottom: `${theme.spacings.xl}`,
    },
    sidebar: {
      display: 'grid',
      alignContent: 'space-between',
      padding: `0 ${theme.spacings.lg} 0 ${theme.page.horizontal}`,
    },
    scroller: {
      gridColumnGap: theme.spacings.md,
      gridRowGap: theme.spacings.lg,
      alignContent: 'space-around',
      paddingRight: theme.page.horizontal,
      '& > *': {
        minWidth: responsiveVal(200, 400),
      },
    },
  }),
  { name: 'SidebarSlider' },
)

export type SidebarSliderProps = { children: ReactNode; sidebar: ReactNode } & UseStyles<
  typeof useStyles
>

export default function SidebarSlider(props: SidebarSliderProps) {
  const { children, sidebar } = props
  const classes = useStyles()

  return (
    <SliderContext scrollSnapAlign='start'>
      <div className={classes.root}>
        <div className={classes.sidebar}>
          <div>{sidebar}</div>
          <SliderPageCounter count={React.Children.count(children)} />
        </div>

        <SliderContainer>
          <SliderScroller classes={{ scroller: classes.scroller }}>{children}</SliderScroller>
        </SliderContainer>
      </div>
    </SliderContext>
  )
}
