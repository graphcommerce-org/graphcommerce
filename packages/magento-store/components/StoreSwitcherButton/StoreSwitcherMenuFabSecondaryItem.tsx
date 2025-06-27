import {
  iconLanguage,
  IconSvg,
  MenuFabSecondaryItem,
  type FabMenuSecondaryItemProps,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { StoreSwitcherText, type StoreSwitcherTextProps } from './StoreSwitcherText'
import { useShowStoreSwitcherButton } from './useStoreSwitcherButton'

export type StoreSwitcherMenuFabSecondaryItemProps = Omit<
  FabMenuSecondaryItemProps,
  'children' | 'href'
> & {
  textProps?: StoreSwitcherTextProps
}

export function StoreSwitcherMenuFabSecondaryItem(props: StoreSwitcherMenuFabSecondaryItemProps) {
  const { sx, textProps, ...rest } = props

  const { show, onClick } = useShowStoreSwitcherButton()
  if (!show) return null

  return (
    <MenuFabSecondaryItem
      key='service'
      icon={<IconSvg src={iconLanguage} size='medium' />}
      href='/switch-stores'
      {...rest}
    >
      <Trans>Store Settings</Trans> <StoreSwitcherText {...textProps} />
    </MenuFabSecondaryItem>
  )
}
