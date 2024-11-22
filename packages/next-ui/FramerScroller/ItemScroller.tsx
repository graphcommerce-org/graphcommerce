import type { ScrollerButtonProps } from '@graphcommerce/framer-scroller'
import { ScrollerProvider, Scroller, ScrollerButton } from '@graphcommerce/framer-scroller'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import { IconSvg } from '../IconSvg'
import { extendableComponent, responsiveVal } from '../Styles'
import { useFabSize } from '../Theme'
import { iconChevronLeft, iconChevronRight } from '../icons'

const { classes } = extendableComponent('ItemScroller', [
  'root',
  'grid',
  'sidebar',
  'scrollerContainer',
  'scroller',
  'sliderButtons',
  'centerLeft',
  'centerRight',
] as const)

export type ItemScrollerProps = {
  children: React.ReactNode
  sx?: SxProps<Theme>
  buttonSize?: ScrollerButtonProps['size']
} & Pick<ScrollerButtonProps, 'showButtons'>

export function ItemScroller(props: ItemScrollerProps) {
  const { children, sx, buttonSize = 'responsive', showButtons } = props

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
              gridAutoColumns: responsiveVal(200, 300),
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
            <ScrollerButton direction='left' showButtons={showButtons} size='responsive'>
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
            <ScrollerButton direction='right' showButtons={showButtons} size='responsive'>
              <IconSvg src={iconChevronRight} />
            </ScrollerButton>
          </Box>
        </ScrollerProvider>
      </Box>
    </Box>
  )
}
