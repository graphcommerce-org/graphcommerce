import { IconSvg, iconSearch, iconClose } from '@graphcommerce/next-ui'
import type { Control, FieldPath, FieldValues } from '@graphcommerce/react-hook-form'
import { useWatch } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { IconButton } from '@mui/material'

export function SearchFormAdornment<TFieldValues extends FieldValues = FieldValues>(props: {
  control: Control<TFieldValues>
  /** Autosubmit only when these field names update */
  name: FieldPath<TFieldValues>

  onReset?: () => void
}) {
  const { name, control, onReset } = props
  const searchValue = useWatch({ control, name })

  return !searchValue ? (
    <IconButton size='small' aria-label={i18n._(/* i18n */ 'Search')}>
      <IconSvg src={iconSearch} />
    </IconButton>
  ) : (
    <IconButton onClick={onReset} size='small'>
      <IconSvg src={iconClose} />
    </IconButton>
  )
}
