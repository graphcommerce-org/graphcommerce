import { breakpointVal } from '@graphcommerce/next-ui'
import { LayoutHeaderClose } from '@graphcommerce/next-ui/Layout/components/LayoutHeaderClose'
import { Box, styled } from '@mui/material'
import { useStickyHeaderOnScroll } from '../hooks/useStickyHeaderOnScroll'
import { SearchInput } from './SearchOverlayInput'
import { searchOverlayIsOpen, useSearchOverlay } from './SearchOverlayProvider'

const SearchOverlayHeaderRoot = styled(Box, { name: 'SearchOverlayHeader', slot: 'Root' })(
  ({ theme }) => ({
    display: 'grid',
    top: 0,
    zIndex: theme.zIndex.appBar,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    height: theme.appShell.headerHeightSm,
    gap: theme.page.horizontal,
    alignItems: 'center',
    gridTemplateColumns: '1fr auto auto',
    [theme.breakpoints.up('md')]: {
      height: theme.appShell.appBarHeightMd,
    },
    '.SearchOverlay-root.scrolled &': { position: 'fixed', width: '100%' },
  }),
)

type SearchOverlayHeaderProps = React.ComponentProps<typeof SearchOverlayHeaderRoot> & {
  slotProps?: {
    input?: Omit<React.ComponentProps<typeof SearchInput>, 'params'>
    close?: React.ComponentProps<typeof LayoutHeaderClose>
  }
}

export function SearchOverlayHeader(props: SearchOverlayHeaderProps) {
  useStickyHeaderOnScroll()
  const { params } = useSearchOverlay()
  const { slotProps, ...rest } = props

  return (
    <SearchOverlayHeaderRoot {...rest}>
      <SearchInput
        inputSx={{ typography: 'h4', p: 0 }}
        autoFocus
        params={params}
        size='medium'
        {...slotProps?.input}
        sx={[
          (theme) => ({
            width: '100%',
            height: '100%',
            typography: 'h4',
            px: theme.page.horizontal,
            ...breakpointVal(
              'borderRadius',
              theme.shape.borderRadius * 3,
              theme.shape.borderRadius * 4,
              theme.breakpoints.values,
            ),
          }),
          ...(Array.isArray(slotProps?.input?.sx) ? slotProps.input.sx : [slotProps?.input?.sx]),
        ]}
      />
      <LayoutHeaderClose onClose={() => searchOverlayIsOpen.set(false)} {...slotProps?.close} />
    </SearchOverlayHeaderRoot>
  )
}
