import {
  ScrollerProvider,
  Scroller,
  ScrollerButton,
  ScrollerButtonProps,
} from '@graphcommerce/framer-scroller'
import { Box, SxProps, Theme } from '@mui/material'
import { IconSvg } from '../IconSvg'
import { extendableComponent } from '../Styles'
import { useFabSize } from '../Theme'
import { iconChevronLeft, iconChevronRight } from '../icons'

const { classes } = extendableComponent('SidebarSlider', [
  'root',
  'grid',
  'sidebar',
  'scrollerContainer',
  'scroller',
  'sliderButtons',
  'centerLeft',
  'centerRight',
] as const)

type SliderProps = {
  children: React.ReactNode
  sx?: SxProps<Theme>
  buttonSize?: ScrollerButtonProps['size']
}

export function ItemScroller(props: SliderProps) {
  const { children, sx, buttonSize = 'responsive' } = props

  const size = useFabSize(buttonSize)

  return (
    <Box sx={sx} className={classes.root}>
      <Box sx={{ position: 'relative', minWidth: 1 }} className={classes.scrollerContainer}>
        <ScrollerProvider scrollSnapAlign='start'>
          <Scroller
            className={classes.scroller}
            hideScrollbar
            sx={(theme) => ({
              gridColumnGap: theme.spacings.md,
              gridRowGap: theme.spacings.lg,
              // paddingRight: theme.page.horizontal,
              px: theme.page.horizontal,
              scrollPaddingLeft: theme.page.horizontal,
              scrollPaddingRight: theme.page.horizontal,
              gridAutoColumns: theme.responsiveTemplate`${[200, 300]}px`,
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
              top: `calc(50% - 28px)`,
            })}
          >
            <ScrollerButton
              direction='left'
              sx={{ display: { xs: 'none', md: 'flex' } }}
              size='responsive'
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
              top: `calc(50% - (${size}/2))`,
            })}
          >
            <ScrollerButton
              direction='right'
              sx={{ display: { xs: 'none', md: 'flex' } }}
              size='responsive'
            >
              <IconSvg src={iconChevronRight} />
            </ScrollerButton>
          </Box>
        </ScrollerProvider>
      </Box>
    </Box>
  )
}
