import { styled } from '@mui/material/styles'
import React from 'react'

// ---- Root component ----

// We're creating a new styled('div') component and apply our styles to it.
const Root = styled('div')(({ theme }) => ({
  padding: '3px',
  display: 'flex',
  color: theme.palette.text.primary,
}))

// ---- MyComponent component ----

// Props of the component we are writing
export type MyComponentProps = { children: React.ReactNode }

export function MyComponent(props: MyComponentProps) {
  const { children } = props
  return (
    <Root as='span'>
      My Component
      {children}
    </Root>
  )
}
