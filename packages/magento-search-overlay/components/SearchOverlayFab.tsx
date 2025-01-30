import { iconSearch, IconSvg } from '@graphcommerce/next-ui'
import { Fab } from '@mui/material'
import { useEffect } from 'react'
import { searchOverlayIsOpen } from './SearchOverlayProvider'

export function SearchOverlayFab() {
  useEffect(() => {
    globalThis.document.body.querySelector<HTMLInputElement>('[name="search"]')?.focus()
  }, [])

  return (
    <Fab
      onClick={() => searchOverlayIsOpen.set(true)}
      color='inherit'
      size='medium'
      sx={{ position: 'absolute', right: 0, top: 0 }}
    >
      <IconSvg src={iconSearch} size='large' />
    </Fab>
  )
}
