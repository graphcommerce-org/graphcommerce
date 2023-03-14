import { Scroller, ScrollerButton, ScrollerProvider } from '@graphcommerce/framer-scroller'
import {
  iconChevronLeft,
  iconChevronRight,
  IconSvg,
  useScrollY,
  extendableComponent,
} from '@graphcommerce/next-ui'
import Box from '@mui/material/Box'
import { useTheme, styled, SxProps, Theme } from '@mui/material/styles'
import { m, useTransform } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

const MotionDiv = styled(m.div)({})

export type ProductListFiltersContainerProps = { children: React.ReactNode; sx?: SxProps<Theme> }

type OwnerState = {
  isSticky: boolean
}
const name = 'ProductListFiltersContainer' as const
const parts = [
  'wrapper',
  'container',
  'shadow',
  'containerSticky',
  'scroller',
  'scrollerSticky',
  'sliderPrev',
  'sliderNext',
] as const

const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function ProductListFiltersContainer(props: ProductListFiltersContainerProps) {
  const { children, sx = [] } = props
  const scrollY = useScrollY()

  const [isSticky, setIsSticky] = useState<boolean>(false)
  const [startPosition, setStartPosition] = useState<number>(100)
  const [spacing, setSpacing] = useState<number>(20)

  const scrollHalfway = startPosition + spacing

  const wrapperRef = useRef<HTMLDivElement>(null)
  const classes = withState({ isSticky })

  // Measure the sizing of the wrapping container
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      if (window.scrollY > 100) return
      const offset = wrapperRef.current?.getBoundingClientRect()?.top ?? 0
      const elemHeigh = entry.contentRect.height
      const nextOffset =
        // If we use the FilterFormProvider in the pages/[...url].tsx file, to provide the our
        // ProductListActionFilters with the correct parameters, the parentElement(FilterFormProvider) has no nextElementSibling
        // resulting in an null value. If this is the case we check if the higher level parent does have a nextElementSibling,
        // so we are able to calculate the spacing between the ProductListFiltersContainer and the next element in the DOM
        (
          (wrapperRef.current?.parentElement?.nextElementSibling ??
            wrapperRef.current?.parentElement?.parentElement
              ?.nextElementSibling) as HTMLElement | null
        )?.getBoundingClientRect()?.top ?? 0
      const modifier = 5

      setSpacing((nextOffset - elemHeigh - offset + 20) * modifier)
      setStartPosition(offset)
    })
    if (wrapperRef.current) observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onCheckStickyChange = (v: number) => {
      if (isSticky && v <= scrollHalfway) {
        setIsSticky(false)
      }
      if (!isSticky && v > scrollHalfway) {
        setIsSticky(true)
      }
    }
    onCheckStickyChange(scrollY.get())
    return scrollY.on('change', onCheckStickyChange)
  }, [isSticky, scrollHalfway, scrollY])

  const opacity = useTransform(scrollY, [startPosition, startPosition + spacing], [0, 1])

  return (
    <MotionDiv
      className={classes.wrapper}
      ref={wrapperRef}
      sx={[
        (theme) => ({
          display: 'flex',
          justifyContent: 'center',
          marginBottom: theme.spacings.sm,
          position: 'sticky',
          top: theme.page.vertical,
          zIndex: 9,
          margin: '0 auto',
          maxWidth: `calc(100% - 96px - ${theme.spacings.sm} * 2)`,
          [theme.breakpoints.down('md')]: {
            textAlign: 'center',
            maxWidth: 'unset',
            margin: `0 calc(${theme.page.horizontal} * -1)`,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <ScrollerProvider scrollSnapAlign='none'>
        <ScrollerButton
          direction='left'
          className={classes.sliderPrev}
          size='small'
          sx={{ position: 'absolute', top: 4, left: 2, zIndex: 10 }}
        >
          <IconSvg src={iconChevronLeft} />
        </ScrollerButton>
        <Box
          className={classes.container}
          sx={(theme) => ({
            position: 'relative',
            maxWidth: '100%',
            padding: '2px',
            paddingLeft: 0,
            paddingRight: 0,
            [theme.breakpoints.up('md')]: {
              background: theme.palette.background.default,
              borderRadius: '99em',
            },
            display: 'grid',
            alignItems: 'center',
          })}
        >
          <Scroller
            className={classes.scroller}
            hideScrollbar
            sx={(theme) => ({
              paddingLeft: theme.page.horizontal,
              paddingRight: theme.page.horizontal,
              paddingBottom: '1px',
              [theme.breakpoints.up('md')]: {
                borderRadius: '99em',
                paddingLeft: '8px',
                paddingRight: '8px',
              },
              py: '5px',

              columnGap: '6px',
              gridAutoColumns: 'min-content',
            })}
          >
            {children}
          </Scroller>
          <MotionDiv
            className={classes.shadow}
            style={{ opacity }}
            sx={(theme) => ({
              pointerEvents: 'none',
              zindex: '-1',
              borderRadius: '99em',
              position: 'absolute',
              height: '100%',
              width: '100%',
              top: 0,
              boxShadow: theme.shadows[6],
              [theme.breakpoints.down('md')]: {
                boxShadow: 'none !important',
              },
            })}
          />
        </Box>
        <ScrollerButton
          direction='right'
          className={classes.sliderNext}
          size='small'
          sx={{ position: 'absolute', top: 4, right: 2, zIndex: 10 }}
        >
          <IconSvg src={iconChevronRight} />
        </ScrollerButton>
      </ScrollerProvider>
    </MotionDiv>
  )
}
