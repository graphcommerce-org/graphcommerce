import type { ScrollerButtonProps } from '@graphcommerce/framer-scroller'
import {
  Scroller,
  ScrollerButton,
  ScrollerPageCounter,
  ScrollerProvider,
} from '@graphcommerce/framer-scroller'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import type { ReactNode } from 'react'
import { IconSvg } from '../IconSvg'
import { Row } from '../Row/Row'
import { extendableComponent } from '../Styles/extendableComponent'
import { responsiveVal } from '../Styles/responsiveVal'
import { iconChevronLeft, iconChevronRight } from '../icons'

const { classes, selectors } = extendableComponent('SidebarSlider', [
  'root',
  'grid',
  'sidebar',
  'scrollerContainer',
  'scroller',
  'sliderButtons',
  'centerLeft',
  'centerRight',
] as const)

export type SidebarSliderProps = {
  children: ReactNode
  sidebar: ReactNode
  sx?: SxProps<Theme>
  buttonSize?: ScrollerButtonProps['size']
} & Pick<ScrollerButtonProps, 'showButtons'>

export function SidebarSlider(props: SidebarSliderProps) {
  const { children, sidebar, sx, buttonSize, showButtons } = props

  return (
    <Row maxWidth={false} disableGutters className={classes.root} sx={sx}>
      <ScrollerProvider scrollSnapAlign='start'>
        <Box
          className={classes.grid}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'minmax(150px, 25%) 1fr',
            maxWidth: '100%',
          }}
        >
          <Box
            className={classes.sidebar}
            sx={(theme) => ({
              display: 'grid',
              alignContent: 'space-between',
              padding: `0 ${theme.spacings.lg} 0 ${theme.page.horizontal}`,
            })}
          >
            <Box>{sidebar}</Box>
            <ScrollerPageCounter />
          </Box>

          <Box className={classes.scrollerContainer} sx={{ position: 'relative', minWidth: 1 }}>
            <Scroller
              className={classes.scroller}
              hideScrollbar
              sx={(theme) => ({
                gridColumnGap: theme.spacings.md,
                gridRowGap: theme.spacings.lg,
                paddingRight: theme.page.horizontal,
                gridAutoColumns: responsiveVal(200, 400),
              })}
            >
              {children}
            </Scroller>
            <Box
              className={classes.centerLeft}
              sx={(theme) => ({
                display: 'grid',
                gridAutoFlow: 'row',
                gap: theme.spacings.xxs,
                position: 'absolute',
                left: theme.spacings.sm,
                top: 'calc(50% - 28px)',
              })}
            >
              <ScrollerButton
                direction='left'
                className={classes.sliderButtons}
                showButtons={showButtons}
                size={buttonSize}
              >
                <IconSvg src={iconChevronLeft} />
              </ScrollerButton>
            </Box>
            <Box
              className={classes.centerRight}
              sx={(theme) => ({
                display: 'grid',
                gap: theme.spacings.xxs,
                position: 'absolute',
                right: theme.spacings.sm,
                top: 'calc(50% - 28px)',
              })}
            >
              <ScrollerButton
                direction='right'
                className={classes.sliderButtons}
                showButtons={showButtons}
                size={buttonSize}
              >
                <IconSvg src={iconChevronRight} />
              </ScrollerButton>
            </Box>
          </Box>
        </Box>
      </ScrollerProvider>
    </Row>
  )
}

SidebarSlider.selectors = selectors
