import { iconEye, iconEyeCrossed, IconSvg } from '@graphcommerce/next-ui'
import { FieldValues } from '@graphcommerce/react-hook-form'
import { IconButton, IconButtonProps, InputAdornment } from '@mui/material'
import { MouseEvent, useState } from 'react'
import { TextFieldElement, TextFieldElementProps } from './TextFieldElement'

export type PasswordElementProps<T extends FieldValues> = TextFieldElementProps<T> & {
  iconColor?: IconButtonProps['color']
  afterInputAdornment?: React.ReactNode
}

export function PasswordElement<TFieldValues extends FieldValues>({
  iconColor,
  afterInputAdornment,
  ...props
}: PasswordElementProps<TFieldValues>): JSX.Element {
  const [password, setPassword] = useState<boolean>(true)
  return (
    <TextFieldElement
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
            {afterInputAdornment}
          </InputAdornment>
        ),
      }}
      {...props}
      type={password ? 'password' : 'text'}
    />
  )
}
