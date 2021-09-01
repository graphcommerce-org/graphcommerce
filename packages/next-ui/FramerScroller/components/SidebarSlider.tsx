import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Scroller, ScrollerPageCounter, ScrollerProvider } from '@reachdigital/framer-scroller'
import React, { ReactNode } from 'react'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'

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
      display: 'grid',
      gridAutoFlow: 'column',
      gridColumnGap: theme.spacings.md,
      gridRowGap: theme.spacings.lg,
      alignContent: 'space-around',
      paddingRight: theme.page.horizontal,
      minWidth: 1,
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
  const classes = useStyles(props)

  return (
    <ScrollerProvider scrollSnapAlign='start'>
      <div className={classes.root}>
        <div className={classes.sidebar}>
          <div>{sidebar}</div>
          <ScrollerPageCounter />
        </div>

        <Scroller className={classes.scroller} hideScrollbar>
          {children}
        </Scroller>
      </div>
    </ScrollerProvider>
  )
}
