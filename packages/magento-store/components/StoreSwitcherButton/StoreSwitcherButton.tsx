import { extendableComponent, iconLanguage, IconSvg, sxx } from '@graphcommerce/next-ui'
import type { ButtonProps } from '@mui/material'
import { Button } from '@mui/material'
import { StoreSwitcherText, type StoreSwitcherTextProps } from './StoreSwitcherText'
import { useShowStoreSwitcherButton } from './useStoreSwitcherButton'

export type StoreSwitcherButtonProps = ButtonProps & {
  textProps?: StoreSwitcherTextProps
}

const name = 'StoreSwitcherButton'
const parts = ['root', 'avatar'] as const
const { classes } = extendableComponent(name, parts)

export function StoreSwitcherButton(props: StoreSwitcherButtonProps) {
  const { sx, textProps, ...rest } = props

  const { show, onClick } = useShowStoreSwitcherButton()
  if (!show) return null

  return (
    <Button
      variant='text'
      size='medium'
      className={classes.root}
      onClick={onClick}
      startIcon={<IconSvg src={iconLanguage} />}
      sx={sxx({ width: 'max-content' }, sx)}
      {...rest}
    >
      <StoreSwitcherText {...textProps} />
    </Button>
  )
}
