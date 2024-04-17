import { Box, Popper, useTheme } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { BreadcrumbsList } from './BreadcrumbsList'
import type { BreadcrumbsType } from './types'

export type BreadcrumbsPopperType = BreadcrumbsType & {
  anchorElement: HTMLButtonElement | null
  setAnchorElement: Dispatch<SetStateAction<HTMLButtonElement | null>>
  showButtonMobile: boolean
}

export function BreadcrumbsPopper(props: BreadcrumbsPopperType) {
  const {
    breadcrumbs,
    breadcrumbsAmount,
    name,
    anchorElement,
    setAnchorElement,
    showButtonMobile,
  } = props

  const theme = useTheme()

  const handleClickAway = () => {
    setAnchorElement(null)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setAnchorElement(null)
    }
  }

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
        maxWidth: `calc(100% - ${theme.page.horizontal} * 2)`,
        zIndex: 100,
      }}
    >
      <Box>
        <BreadcrumbsList
          autoFocus={Boolean(anchorElement)}
          breadcrumbs={breadcrumbs}
          name={name}
          handleClickAway={handleClickAway}
          handleKeyDown={handleKeyDown}
        />
      </Box>
    </Popper>
  )
}
