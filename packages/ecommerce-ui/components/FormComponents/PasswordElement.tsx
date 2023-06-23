import { iconEye, iconEyeCrossed, IconSvg } from '@graphcommerce/next-ui'
import { FieldValues } from '@graphcommerce/react-hook-form'
import { IconButton, IconButtonProps, InputAdornment } from '@mui/material'
import { MouseEvent, useState } from 'react'
import { TextFieldElement, TextFieldElementProps } from './TextFieldElement'

export type PasswordElementProps<T extends FieldValues> = TextFieldElementProps<T> & {
  iconColor?: IconButtonProps['color']
}

export function PasswordElement<TFieldValues extends FieldValues>(
  props: PasswordElementProps<TFieldValues>,
): JSX.Element {
  const { iconColor, ...textFieldProps } = props
  const [password, setPassword] = useState<boolean>(true)
  return (
    <TextFieldElement
      {...textFieldProps}
      InputProps={{
        ...textFieldProps.InputProps,
        endAdornment: (
          <InputAdornment
            position='end'
            sx={(theme) => ({ display: 'flex', columnGap: theme.spacings.xxs })}
          >
            <IconButton
              onMouseDown={(e: MouseEvent<HTMLButtonElement>) => e.preventDefault()}
              onClick={() => setPassword(!password)}
              tabIndex={-1}
              color={iconColor ?? 'default'}
            >
              <IconSvg src={password ? iconEyeCrossed : iconEye} size='medium' />
            </IconButton>
            {textFieldProps.InputProps?.endAdornment}
          </InputAdornment>
        ),
      }}
      type={password ? 'password' : 'text'}
    />
  )
}
