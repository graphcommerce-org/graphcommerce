import { IconSvg, iconSearch } from '@graphcommerce/next-ui'
import { Fab } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export function SearchOverlayFab({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <Fab
      onClick={() => {
        setOpen(true)
      }}
      color='inherit'
      size='large'
    >
      <IconSvg src={iconSearch} size='large' />
    </Fab>
  )
}
