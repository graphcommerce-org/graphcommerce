import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { clientSizeCssVar } from '@graphcommerce/framer-utils'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import {
  ChipProps,
  Theme,
  useMediaQuery,
  Box,
  Portal,
  Popper,
  ClickAwayListener,
  TextField,
} from '@mui/material'
import React, {
  forwardRef,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Button } from '../Button'
import { LayoutOverlayHeader } from '../LayoutOverlay'
import { LayoutOverlaySize, Overlay } from '../Overlay'

type ResponsiveMenuProps = PropsWithChildren<
  Omit<ChipProps<'button'>, 'children' | 'component'>
> & {
  chip: EmotionJSX.Element
  openEl: null | HTMLElement
  setOpenEl: (input: null) => void
  onClose?: () => void
  onReset?: (event: any) => void
  actionable?: boolean
  mode: LayoutOverlaySize
}

type MenuContentProps = Pick<
  ResponsiveMenuProps,
  'onClose' | 'setOpenEl' | 'label' | 'onReset' | 'children' | 'actionable'
> & { isDesktop: boolean }

type ComputedStyleDictionary = {
  [key: string]: CSSStyleDeclaration
}

function transformObject(object: { [key: string]: unknown }): ComputedStyleDictionary {
  const newObject: ComputedStyleDictionary = {}
  const style = getComputedStyle(document.createElement('div'))

  Object.keys(object).forEach((key) => {
    newObject[key] = style
  })

  return newObject
}

function useComputedStyle(elementRefs: {
  [key: string]: React.MutableRefObject<null> | undefined
}) {
  const initialStyles = transformObject(elementRefs)

  const [styles, setStyles] = useState<ComputedStyleDictionary>(initialStyles)

  useEffect(() => {
    if (!elementRefs) return
    const newStyles = {}
    Object.keys(elementRefs).forEach((key) => {
      const current = elementRefs[key]?.current
      if (current) {
        newStyles[key] = getComputedStyle(current)
      }
    })
    setStyles(newStyles)
  }, [elementRefs])

  console.log({ styles })
  return { ...styles }
}

const MenuContent = forwardRef<HTMLElement, MenuContentProps>(
  ({ setOpenEl, label, children, isDesktop, actionable }, ref) => {
    const [search, setSearch] = useState<string>()
    const contentRef = useRef(null)
    const buttonRef = useRef(null)
    const castedChildren = children as ReactElement
    const menuLength = castedChildren?.props.items?.length
    const { content, button } = useComputedStyle({ content: contentRef, button: buttonRef })

    console.log({ content, button })

    const filteredChildren = useMemo(() => {
      const { items } = (children as ReactElement).props
      const filteredItems = items?.filter((item) => {
        const optionLabelLowerCase = item.option.label.toLowerCase()
        const searchLowerCase = search?.toLowerCase() ?? ''
        return search ? optionLabelLowerCase?.includes(searchLowerCase) : true
      })
      return React.cloneElement(castedChildren, { items: filteredItems })
    }, [castedChildren, children, search])

    return (
      <Box
        ref={contentRef}
        sx={() => ({
          display: 'flex',
          flexDirection: 'column',
          minWidth: 350,
          backgroundColor: 'background.paper',
        })}
      >
        <LayoutOverlayHeader switchPoint={0}>
          <TextField
            type='search'
            fullWidth
            variant='standard'
            size='small'
            color='primary'
            placeholder={i18n._(/* 18n */ 'Search {filter}', { filter: label })}
            onChange={(e) => setSearch(e.target.value)}
          />
        </LayoutOverlayHeader>

        <Box
          sx={(theme) => ({
            mt: theme.appShell.headerHeightSm,
            flex: 1,
            padding: `0 ${theme.page.horizontal}`,
            overflow: 'visable',
            overflowY: isDesktop ? 'scroll' : undefined,
            maxHeight: isDesktop ? '500px' : undefined,
            boxShadow: theme.shadows[1],
          })}
        >
          {filteredChildren}
          {filteredChildren}

          <Box sx={(theme) => ({ height: theme.spacings.sm })} />
          {actionable ? (
            <Box
              sx={{
                // height: `calc(${height} - ${clientSizeCssVar.y} + 100px)`,
                // mt: `calc(-${height} + ${clientSizeCssVar.y} - 100px)`,
                position: 'relative',
              }}
            >
              <Button
                ref={buttonRef}
                form='filter-form'
                variant='pill'
                size='large'
                fullWidth
                sx={(theme) => ({
                  // position: 'sticky',
                  display: 'block',
                  bottom: theme.spacings.xxs,
                  top: `calc(${clientSizeCssVar.y} - 60px)`,
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  position: 'sticky',
                })}
                type='submit'
                onClick={() => {
                  setOpenEl(null)
                }}
              >
                <Trans id='Apply' />
              </Button>
            </Box>
          ) : null}
        </Box>
      </Box>
    )
  },
)

export function ResponsiveMenu(props: ResponsiveMenuProps) {
  const { chip, openEl, setOpenEl, onClose, mode } = props
  const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'))
  const open = Boolean(openEl)

  if (!isDesktop) {
    return (
      <>
        {chip}
        {open ? (
          <Portal>
            <Overlay
              active={!!openEl}
              onClosed={onClose ?? (() => {})}
              sizeSm={mode}
              variantSm='bottom'
              overlayPaneProps={{
                initial: false,
              }}
            >
              <MenuContent {...props} isDesktop={isDesktop} />
            </Overlay>
          </Portal>
        ) : null}
      </>
    )
  }

  return (
    <ClickAwayListener
      mouseEvent='onMouseDown'
      onClickAway={() => {
        if (onClose) onClose()
        setOpenEl?.(null)
      }}
    >
      <Box>
        {chip}
        {open ? (
          <Popper
            open={open}
            anchorEl={openEl}
            sx={(theme) => ({
              boxShadow: 12,
              borderRadius: theme.shape.borderRadius,
              overflow: 'hidden',
              zIndex: 1,
            })}
            keepMounted
            disablePortal
            modifiers={[
              {
                name: 'offset',
                options: {
                  offset: [0, 10],
                },
              },

              {
                name: 'flip',
                enabled: true,
                options: {
                  altBoundary: true,
                  rootBoundary: 'viewport',
                },
              },
              {
                name: 'preventOverflow',
                enabled: false,
                options: {
                  altAxis: true,
                  altBoundary: false,
                  tether: false,
                  rootBoundary: 'viewport',
                },
              },
            ]}
          >
            <MenuContent {...props} isDesktop={isDesktop} />
          </Popper>
        ) : null}
      </Box>
    </ClickAwayListener>
  )
}
