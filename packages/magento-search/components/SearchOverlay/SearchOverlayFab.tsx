import { iconSearch, IconSvg, useMatchMedia } from '@graphcommerce/next-ui'
import { Fab } from '@mui/material'
import { useEffect, useState } from 'react'
import { searchOverlayIsOpen } from './SearchOverlayProvider'

export function SearchOverlayFab() {
  const matchMedia = useMatchMedia()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    globalThis.document.body.querySelector<HTMLInputElement>('[name="search"]')?.focus()
  }, [])

  if (!visible || matchMedia.up('md')) {
    return null
  }
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
