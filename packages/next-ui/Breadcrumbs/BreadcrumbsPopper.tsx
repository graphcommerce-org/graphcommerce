import { Box, Popper, useTheme } from '@mui/material'
import { BreadcrumbsList } from './BreadcrumbsList'
import type { BreadcrumbsType } from './types'

export type BreadcrumbsPopperType = BreadcrumbsType & {
  anchorElement: HTMLButtonElement | null
  showButtonMobile: boolean
  onClose: () => void
}

export function BreadcrumbsPopper(props: BreadcrumbsPopperType) {
  const { breadcrumbs, breadcrumbsAmount, name, anchorElement, showButtonMobile, onClose } = props
  const theme = useTheme()

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
      sx={{
        display: {
          xs: showButtonMobile ? 'block' : 'none',
          md: breadcrumbsAmount && breadcrumbs.length >= breadcrumbsAmount ? 'block' : 'none',
        },
        maxWidth: {
          md: `calc(100vw - ${theme.spacings.xxl} * 2)`,
          xs: `calc(100vw - ${theme.page.horizontal} * 2)`,
        },
        zIndex: 100,
      }}
    >
      <Box>
        <BreadcrumbsList
          autoFocus={Boolean(anchorElement)}
          breadcrumbs={breadcrumbs}
          name={name}
          onClose={onClose}
        />
      </Box>
    </Popper>
  )
}
