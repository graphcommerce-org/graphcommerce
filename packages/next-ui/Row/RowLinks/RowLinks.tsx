import { Scroller, ScrollerButton, ScrollerProvider } from '@graphcommerce/framer-scroller'
import { Box, ContainerProps, SxProps, Theme, Typography } from '@mui/material'
import React from 'react'
import { IconSvg } from '../../IconSvg'
import { extendableComponent } from '../../Styles'
import { useFabSize } from '../../Theme'
import { iconChevronLeft, iconChevronRight } from '../../icons'
import { Row } from '../Row'

export type RowLinksProps = {
  title: string
  children: React.ReactNode
  sx?: SxProps<Theme>
  inlineTitle?: boolean
  showButtons?: boolean
} & Pick<ContainerProps, 'maxWidth'>

const compName = 'RowLinks' as const
const parts = ['root', 'scroller', 'title', 'swipperButton', 'centerRight', 'centerLeft'] as const
const { classes } = extendableComponent(compName, parts)

export function RowLinks(props: RowLinksProps) {
  const { title, children, sx = [], inlineTitle, showButtons, maxWidth } = props

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
      <ScrollerProvider scrollSnapAlign='end'>
        <Scroller
          className={classes.scroller}
          hideScrollbar
          sx={(theme) => ({
            justifyContent: 'start',
            gap: `${theme.spacings.md}`,
            gridAutoColumns: `max-content`,
            alignItems: 'center',
            // '&.smGridDirInline > *': {
            //   scrollSnapAlign: {
            //     xs: 'center',
            //     md: 'end',
            //   },
            // },
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
            left: theme.spacings.sm,
            top: `calc(50% - calc(${fabSize} / 2))`,
          })}
        >
          <ScrollerButton
            direction='left'
            className={classes.swipperButton}
            sx={{
              display: 'flex',
              zIndex: 'inherit',
              ...(showButtons && {
                opacity: 1,
                transform: 'scale(1)',
                '&.MuiFab-root': {
                  display: 'inline-flex',
                },
              }),
            }}
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
            top: `calc(50% - calc(${fabSize} / 2))`,
          })}
        >
          <ScrollerButton
            direction='right'
            className={classes.swipperButton}
            sx={{
              display: 'flex',
              ...(showButtons && {
                opacity: 1,
                transform: 'scale(1)',
                '&.MuiFab-root': {
                  display: 'inline-flex',
                },
              }),
            }}
            size='responsive'
          >
            <IconSvg src={iconChevronRight} />
          </ScrollerButton>
        </Box>
      </ScrollerProvider>
    </Row>
  )
}
