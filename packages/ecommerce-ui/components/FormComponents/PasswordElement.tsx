import { IconSvg, iconEye, iconEyeCrossed } from '@graphcommerce/next-ui'
import type { FieldValues } from '@graphcommerce/react-hook-form'
import type { IconButtonProps } from '@mui/material'
import { IconButton, InputAdornment } from '@mui/material'
import type { MouseEvent } from 'react'
import { useState } from 'react'
import type { TextFieldElementProps } from './TextFieldElement'
import { TextFieldElement } from './TextFieldElement'

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
