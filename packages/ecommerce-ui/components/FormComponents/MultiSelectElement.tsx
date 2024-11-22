/* eslint-disable no-nested-ternary */
import { IconSvg, iconClose } from '@graphcommerce/next-ui'
import type { FieldValues, ControllerProps } from '@graphcommerce/react-hook-form'
import { useController } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import type { FormControlProps, SelectProps } from '@mui/material'
import {
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material'

export type MultiSelectElementProps<T extends FieldValues> = Omit<SelectProps, 'value'> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: { id: string | number; label: string }[] | any[]
  label?: string
  itemKey?: string
  itemValue?: string
  itemLabel?: string
  required?: boolean
  minWidth?: number
  menuMaxHeight?: number
  menuMaxWidth?: number
  helperText?: string
  showChips?: boolean
  showCheckbox?: boolean
  formControlProps?: Omit<FormControlProps, 'fullWidth' | 'variant'>
} & Omit<ControllerProps<T>, 'render'>

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

export function MultiSelectElement<TFieldValues extends FieldValues>(
  props: MultiSelectElementProps<TFieldValues>,
): JSX.Element {
  const {
    options,
    label = '',
    itemKey = 'id',
    itemValue = '',
    itemLabel = 'label',
    required = false,
    rules = {},
    name,
    menuMaxHeight = ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    menuMaxWidth = 250,
    minWidth = 120,
    helperText,
    showChips,
    control,
    showCheckbox,
    formControlProps,
    shouldUnregister,
    defaultValue,
    disabled,
    ...rest
  } = props
  if (required && !rules.required) {
    rules.required = i18n._(/* i18n */ 'This field is required')
  }

  const {
    field: { value, onChange, ...field },
    fieldState: { invalid, error },
  } = useController({
    name,
    rules,
    control,
    defaultValue,
    disabled,
    shouldUnregister,
  })

  const parsedHelperText = error ? error.message : helperText

  return (
    <FormControl
      {...formControlProps}
      style={{
        ...formControlProps?.style,
        minWidth,
      }}
      variant={rest.variant}
      fullWidth={rest.fullWidth}
      error={invalid}
      size={rest.size}
    >
      {label && (
        <InputLabel
          size={rest.size === 'small' ? 'small' : undefined}
          error={invalid}
          htmlFor={rest.id || `select-multi-select-${name}`}
          required={required}
        >
          {label}
        </InputLabel>
      )}
      <Select
        {...rest}
        {...field}
        id={rest.id || `select-multi-select-${name}`}
        multiple
        label={label || undefined}
        error={invalid}
        value={value || []}
        required={required}
        onChange={onChange}
        MenuProps={{
          ...rest.MenuProps,
          PaperProps: {
            ...(rest.MenuProps?.PaperProps ?? {
              style: {
                maxHeight: menuMaxHeight,
                width: menuMaxWidth,
                ...rest.MenuProps?.PaperProps?.style,
              },
            }),
          },
        }}
        renderValue={
          typeof rest.renderValue === 'function'
            ? rest.renderValue
            : showChips
              ? (selected) => (
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {((selected as any[]) || []).map((selectedValue) => (
                      <Chip
                        key={selectedValue}
                        label={selectedValue}
                        style={{ display: 'flex', flexWrap: 'wrap' }}
                        onDelete={() => {
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          onChange(value.filter((i: any) => i !== selectedValue))
                          // setValue(name, formValue.filter((i: any) => i !== value), { shouldValidate: true })
                        }}
                        deleteIcon={<IconSvg src={iconClose} />}
                      />
                    ))}
                  </div>
                )
              : (selected) => (Array.isArray(selected) ? selected.join(', ') : '')
        }
      >
        {options.map((item) => {
          const val: string | number = item[itemValue || itemKey] || item
          const isChecked = Array.isArray(value) ? value.includes(val) : false
          return (
            <MenuItem
              key={val}
              value={val}
              sx={{
                fontWeight: (theme) =>
                  isChecked ? theme.typography.fontWeightBold : theme.typography.fontWeightRegular,
              }}
            >
              {showCheckbox && <Checkbox checked={isChecked} />}
              <ListItemText primary={item[itemLabel] || item} />
            </MenuItem>
          )
        })}
      </Select>
      {parsedHelperText && <FormHelperText>{parsedHelperText}</FormHelperText>}
    </FormControl>
  )
}
