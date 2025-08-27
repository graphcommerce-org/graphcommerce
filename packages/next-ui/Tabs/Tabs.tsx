import { Scroller, ScrollerButton, ScrollerProvider } from '@graphcommerce/framer-scroller'
import { Box, type SxProps, type Theme } from '@mui/material'
import React from 'react'
import { iconChevronLeft, iconChevronRight } from '../icons'
import { IconSvg } from '../IconSvg'
import { extendableComponent } from '../Styles/extendableComponent'
import { sxx } from '../utils/sxx'

export type TabsProps = {
  children: React.ReactNode
  sx?: SxProps<Theme>
  /** Additional content to show before tabs */
  startContent?: React.ReactNode
  /** Additional content to show after tabs */
  endContent?: React.ReactNode
  /** Whether to show separators between tabs */
  showSeparators?: boolean
  /** Custom separator component */
  separator?: React.ReactNode
}

const { classes } = extendableComponent('Tabs', ['root', 'scroller', 'left', 'right', 'button'])

export function Tabs(props: TabsProps) {
  const { children, sx, startContent, endContent, showSeparators = true, separator } = props

  const defaultSeparator = (
    <Box
      className='separator'
      sx={{ width: '2px', height: '1em', bgcolor: 'divider', mx: '-1px' }}
    />
  )

  const separatorElement = separator ?? defaultSeparator

  return (
    <Box
      className={classes.root}
      sx={sxx(
        {
          alignItems: 'stretch',
          position: 'relative',
          pointerEvents: 'all',
          gridTemplateColumns: 'auto 1fr auto',
          display: 'grid',
          gridAutoFlow: 'column',
        },
        sx,
      )}
    >
      <ScrollerProvider scrollSnapAlign='none'>
        <Scroller
          hideScrollbar
          sx={{
            gridArea: '1 / 1 / 1 / 4',
            gridAutoColumns: 'min-content',
            alignItems: 'center',
            // Hide the Separator that comes before or after the selected tab.
            '& .separator': { transition: 'opacity 0.2s ease-in-out' },
            '& .TabItem-root.selected + .separator': { opacity: 0 },
            '& .separator:has(+ .TabItem-root.selected)': { opacity: 0 },
            // Same for hover:
            '& .TabItem-root:hover + .separator': { opacity: 0 },
            '& .separator:has(+ .TabItem-root:hover)': { opacity: 0 },
          }}
          className={classes.scroller}
          role='tablist'
        >
          {startContent}

          {showSeparators && startContent && separatorElement}

          {React.Children.map(children, (child, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>
              {showSeparators && index > 0 && separatorElement}
              {child}
            </React.Fragment>
          ))}

          {showSeparators && endContent && separatorElement}

          {endContent}
        </Scroller>

        <ScrollerButton
          sxContainer={{
            gridArea: '1 / 1 / 1 / 2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            '& > *': { pointerEvents: 'all' },
          }}
          sx={{ pointerEvents: 'all' }}
          direction='left'
          size='small'
          tabIndex={-1}
          className={`${classes.left} ${classes.button}`}
        >
          <IconSvg src={iconChevronLeft} />
        </ScrollerButton>

        <ScrollerButton
          sxContainer={{
            gridArea: '1 / 3 / 1 / 4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            '& > *': { pointerEvents: 'all' },
          }}
          sx={{ pointerEvents: 'all' }}
          direction='right'
          size='small'
          tabIndex={-1}
          className={`${classes.right} ${classes.button}`}
        >
          <IconSvg src={iconChevronRight} />
        </ScrollerButton>
      </ScrollerProvider>
    </Box>
  )
}
