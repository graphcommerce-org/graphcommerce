import type { FabProps } from '@graphcommerce/next-ui'
import { Fab, iconLanguage } from '@graphcommerce/next-ui'
import { useShowStoreSwitcherButton } from './useStoreSwitcherButton'

export type StoreSwitcherFabProps = Omit<FabProps, 'icon' | 'onClick'>

export function StoreSwitcherFab(props: StoreSwitcherFabProps) {
  const { sx, ...fabProps } = props
  const { show, onClick } = useShowStoreSwitcherButton()

  if (!show) return null

  return (
    <Fab
      color='inherit'
      size='medium'
      sx={sx}
      icon={iconLanguage}
      onClick={onClick}
      slotProps={{ icon: { size: 'responsiveSmall' } }}
      {...fabProps}
    />
  )
}
