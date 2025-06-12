import { iconLanguage, IconSvg, sxx } from '@graphcommerce/next-ui'
import { Fab, type FabProps } from '@mui/material'
import { StoreSwitcherText } from './StoreSwitcherText'
import { useShowStoreSwitcherButton } from './useStoreSwitcherButton'

export function StoreSwitcherFab(props: FabProps) {
  const { show, onClick } = useShowStoreSwitcherButton()
  if (!show) return null

  return (
    <Fab
      variant='extended'
      onClick={onClick}
      sx={sxx({ width: 'max-content', columnGap: '3px', typography: 'body1' })}
      {...props}
    >
      <IconSvg src={iconLanguage} /> <StoreSwitcherText />
    </Fab>
  )
}
