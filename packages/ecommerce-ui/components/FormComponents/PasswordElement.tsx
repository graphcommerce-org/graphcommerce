import { iconEye, iconEyeCrossed, IconSvg } from '@graphcommerce/next-ui'
import { FieldValues } from '@graphcommerce/react-hook-form'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { MouseEvent, useState } from 'react'
import { TextFieldElement, TextFieldElementProps } from './TextFieldElement'

export type PasswordElementProps<T extends FieldValues> = TextFieldElementProps<T> & {
  iconColor?: IconButtonProps['color']
}

export function PasswordElement<TFieldValues extends FieldValues>({
  iconColor,
  ...props
}: PasswordElementProps<TFieldValues>): JSX.Element {
  const [password, setPassword] = useState<boolean>(true)
  return (
    <TextFieldElement
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              onMouseDown={(e: MouseEvent<HTMLButtonElement>) => e.preventDefault()}
              onClick={() => setPassword(!password)}
              tabIndex={-1}
              color={iconColor ?? 'default'}
            >
              <IconSvg src={password ? iconEyeCrossed : iconEye} size='medium' />
            </IconButton>
          </InputAdornment>
        ),
      }}
      type={password ? 'password' : 'text'}
    />
  )
}
