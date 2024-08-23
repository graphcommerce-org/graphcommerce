import { Box, Popper } from '@mui/material'
import { BreadcrumbsList } from './BreadcrumbsList'
import type { BreadcrumbsType } from './types'

export type BreadcrumbsPopperType = BreadcrumbsType & {
  anchorElement: HTMLButtonElement | null
  showDesktopAmount?: number
  showMobileAmount?: number
  onClose: () => void
}

export function BreadcrumbsPopper(props: BreadcrumbsPopperType) {
  const { anchorElement, breadcrumbs, showDesktopAmount, showMobileAmount, onClose } = props

  return (
    <Popper
      anchorEl={anchorElement}
      open={Boolean(anchorElement)}
      disablePortal
      placement='bottom-start'
      modifiers={[
        { name: 'offset', options: { offset: [0, 10] } },
        {
          name: 'preventOverflow',
          enabled: true,
          options: { altBoundary: false, padding: 10 },
        },
      ]}
      sx={(theme) => ({
        maxWidth: {
          md: `calc(100vw - ${theme.spacings.xxl} * 2)`,
          xs: `calc(100vw - ${theme.page.horizontal} * 2)`,
        },
        zIndex: 100,
      })}
    >
      <Box>
        <BreadcrumbsList
          autoFocus={Boolean(anchorElement)}
          breadcrumbs={breadcrumbs}
          showDesktopAmount={showDesktopAmount}
          showMobileAmount={showMobileAmount}
          onClose={onClose}
        />
      </Box>
    </Popper>
  )
}
