/* eslint-disable no-nested-ternary */
import { IconSvg, iconClose } from '@graphcommerce/next-ui'
import {
  Controller,
  FieldError,
  FieldValues,
  ControllerProps,
} from '@graphcommerce/react-hook-form'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import FormControl, { FormControlProps } from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectProps } from '@mui/material/Select'

export type MultiSelectElementProps<T extends FieldValues> = Omit<SelectProps, 'value'> & {
  options: { id: string | number; label: string }[] | any[]
  label?: string
  itemKey?: string
  itemValue?: string
  itemLabel?: string
  required?: boolean
  parseError?: (error: FieldError) => string
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
  let {
    options,
    label = '',
    itemKey = 'id',
    itemValue = '',
    itemLabel = 'label',
    required = false,
    rules = {},
    parseError,
    name,
    menuMaxHeight = ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    menuMaxWidth = 250,
    minWidth = 120,
    helperText,
    showChips,
    control,
    showCheckbox,
    formControlProps,
    ...rest
  } = props
  if (required && !rules.required) {
    rules.required = 'This field is required'
  }

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => {
        helperText = error
          ? typeof parseError === 'function'
            ? parseError(error)
            : error.message
          : helperText
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
              id={rest.id || `select-multi-select-${name}`}
              multiple
              label={label || undefined}
              error={invalid}
              value={value || []}
              required={required}
              onChange={onChange}
              onBlur={onBlur}
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
                        {((selected as any[]) || []).map((selectedValue) => (
                          <Chip
                            key={selectedValue}
                            label={selectedValue}
                            style={{ display: 'flex', flexWrap: 'wrap' }}
                            onDelete={() => {
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
                        isChecked
                          ? theme.typography.fontWeightBold
                          : theme.typography.fontWeightRegular,
                    }}
                  >
                    {showCheckbox && <Checkbox checked={isChecked} />}
                    <ListItemText primary={item[itemLabel] || item} />
                  </MenuItem>
                )
              })}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        )
      }}
    />
  )
}
