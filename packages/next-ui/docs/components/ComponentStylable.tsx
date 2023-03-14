import { styled } from '@mui/material/styles'
import React from 'react'

// ---- Setup ----

const name = 'MyComponent'

// ---- Root component ----

// We're creating a new styled('div') component and apply our styles to it.
const Root = styled('div', {
  name, // Name of the component we are building, so 'MyComponent' in this example
})(({ theme }) => ({
  padding: '3px',
  display: 'flex',
  color: theme.palette.text.primary,
}))

// ---- MyComponent component ----

// Props of the component we are writing
export type MyComponentProps = Pick<React.ComponentProps<typeof Root>, 'sx' | 'children'>

export function MyComponent(props: MyComponentProps) {
  const { sx, children } = props
  return (
    <Root as='span' sx={sx}>
      My Component
      {children}
    </Root>
  )
}
