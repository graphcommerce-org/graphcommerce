import type { ScrollerButtonProps } from '@graphcommerce/framer-scroller'
import { Scroller, ScrollerButton, ScrollerProvider } from '@graphcommerce/framer-scroller'
import type { ContainerProps, SxProps, Theme } from '@mui/material'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { IconSvg } from '../../IconSvg'
import { extendableComponent } from '../../Styles'
import { useFabSize } from '../../Theme'
import { iconChevronLeft, iconChevronRight } from '../../icons'
import { Row } from '../Row'

export type RowLinksProps = {
  title: string
  copy?: React.ReactNode
  children: React.ReactNode
  sx?: SxProps<Theme>
  inlineTitle?: boolean
} & Pick<ContainerProps, 'maxWidth'> &
  Pick<ScrollerButtonProps, 'showButtons'>

const compName = 'RowLinks'
const parts = [
  'root',
  'scroller',
  'scrollerWrapper',
  'title',
  'copy',
  'swiperButton',
  'centerRight',
  'centerLeft',
] as const
const { classes } = extendableComponent(compName, parts)

export function RowLinks(props: RowLinksProps) {
  const { title, copy, children, sx = [], inlineTitle, showButtons, maxWidth } = props

  const fabSize = useFabSize('responsive')

  return (
    <Row
      className={classes.root}
      sx={[{ position: 'relative' }, ...(Array.isArray(sx) ? sx : [sx])]}
      maxWidth={maxWidth}
    >
      {!inlineTitle && (
        <Typography
          variant='subtitle1'
          component='h2'
          className={classes.title}
          sx={(theme) => ({ mb: theme.spacings.md })}
        >
          {title}
        </Typography>
      )}
      {copy && (
        <Box className={classes.copy} sx={(theme) => ({ my: theme.spacings.md })}>
          {copy}
        </Box>
      )}
      <Box className={classes.scrollerWrapper} sx={{ position: 'relative' }}>
        <ScrollerProvider scrollSnapAlign='end'>
          <Scroller
            className={classes.scroller}
            hideScrollbar
            sx={(theme) => ({
              justifyContent: 'start',
              gap: `${theme.spacings.md}`,
              gridAutoColumns: 'max-content',
              alignItems: 'center',
              '&.smGridDirInline > *': {
                scrollSnapAlign: {
                  xs: 'center',
                  md: 'end',
                },
              },
            })}
          >
            {inlineTitle && (
              <Typography variant='subtitle1' component='h2' className={classes.title}>
                {title}
              </Typography>
            )}
            {children}
          </Scroller>
          <Box
            className={classes.centerLeft}
            sx={(theme) => ({
              display: 'grid',
              gridAutoFlow: 'row',
              gap: theme.spacings.xxs,
              position: 'absolute',
              left: theme.spacings.xs,
              top: `calc(50% - calc(${fabSize} / 2))`,
            })}
          >
            <ScrollerButton
              direction='left'
              className={classes.swiperButton}
              showButtons={showButtons}
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
              right: theme.spacings.xs,
              top: `calc(50% - calc(${fabSize} / 2))`,
            })}
          >
            <ScrollerButton
              direction='right'
              className={classes.swiperButton}
              showButtons={showButtons}
              size='responsive'
            >
              <IconSvg src={iconChevronRight} />
            </ScrollerButton>
          </Box>
        </ScrollerProvider>
      </Box>
    </Row>
  )
}
