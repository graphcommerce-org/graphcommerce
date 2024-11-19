import { IconSvg, iconSearch } from '@graphcommerce/next-ui'
import { Fab } from '@mui/material'

export function SearchOverlayFab({ setOpen }: { setOpen: (boolean: boolean) => void }) {
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
