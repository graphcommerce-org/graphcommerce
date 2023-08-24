/* eslint-disable @typescript-eslint/no-restricted-imports */
import { Controller, ControllerProps, FieldValues } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import {
  Autocomplete,
  AutocompleteProps,
  Checkbox,
  TextField,
  TextFieldProps,
  CircularProgress,
} from '@mui/material'

export type AutocompleteElementProps<
  F extends FieldValues,
  T,
  M extends boolean | undefined,
  D extends boolean | undefined,
> = {
  options: T[]
  loading?: boolean
  multiple?: M
  matchId?: boolean
  required?: boolean
  label?: TextFieldProps['label']
  showCheckbox?: boolean
  autocompleteProps?: Omit<
    AutocompleteProps<T, M, D, any>,
    'name' | 'options' | 'loading' | 'renderInput'
  >
  textFieldProps?: Omit<TextFieldProps, 'name' | 'required' | 'label'>
} & ControllerProps<F>

type AutoDefault = {
  id: string | number // must keep id in case of keepObject
  label: string
}

export function AutocompleteElement<TFieldValues extends FieldValues>({
  textFieldProps,
  autocompleteProps,
  name,
  control,
  options,
  loading,
  showCheckbox,
  rules,
  required,
  multiple,
  matchId,
  label,
}: AutocompleteElementProps<
  TFieldValues,
  AutoDefault | string | any,
  boolean | undefined,
  boolean | undefined
>) {
  const validationRules: ControllerProps<TFieldValues>['rules'] = {
    ...rules,
    ...(required && {
      required: rules?.required || i18n._(/* i18n */ 'This field is required'),
    }),
  }
  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules}
      render={({ field: { onChange, onBlur, value, ...fieldRest }, fieldState: { error } }) => {
        const values = Array.isArray(value) ? (value as (typeof value)[]) : [value]
        let currentValue = multiple ? value || [] : value || null
        if (matchId) {
          currentValue = multiple
            ? values.map((i: any) => options.find((j) => (j.id || j) === i))
            : options.find((i) => (i.id || i) === value) || null
        }
        return (
          <Autocomplete
            {...autocompleteProps}
            value={currentValue}
            loading={loading}
            multiple={multiple}
            options={options}
            disableCloseOnSelect={
              typeof autocompleteProps?.disableCloseOnSelect === 'boolean'
                ? autocompleteProps.disableCloseOnSelect
                : !!multiple
            }
            isOptionEqualToValue={
              autocompleteProps?.isOptionEqualToValue
                ? autocompleteProps.isOptionEqualToValue
                : (option, v) => (v ? option.id === (v?.id || v) : false)
            }
            getOptionLabel={
              autocompleteProps?.getOptionLabel
                ? autocompleteProps.getOptionLabel
                : (option) => `${option?.label || option}`
            }
            onChange={(event, value, reason, details) => {
              let changedVal = value
              if (matchId) {
                changedVal = Array.isArray(value)
                  ? value.map((i: any) => i?.id || i)
                  : value?.id || value
              }
              onChange(changedVal)
              if (autocompleteProps?.onChange) {
                autocompleteProps.onChange(event, value, reason, details)
              }
            }}
            renderOption={
              autocompleteProps?.renderOption ??
              (showCheckbox
                ? (props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox sx={{ marginRight: 1 }} checked={selected} />
                      {autocompleteProps?.getOptionLabel?.(option) || option.label || option}
                    </li>
                  )
                : undefined)
            }
            onBlur={(event) => {
              onBlur()
              if (typeof autocompleteProps?.onBlur === 'function') {
                autocompleteProps.onBlur(event)
              }
            }}
            renderInput={(params) => (
              <TextField
                name={name}
                required={rules?.required ? true : required}
                label={label}
                {...textFieldProps}
                {...params}
                error={!!error}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color='inherit' size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                  ...textFieldProps?.InputProps,
                }}
                inputProps={{
                  ...params.inputProps,
                  ...textFieldProps?.inputProps,
                }}
                helperText={error ? error.message : textFieldProps?.helperText}
              />
            )}
            {...fieldRest}
          />
        )
      }}
    />
  )
}
