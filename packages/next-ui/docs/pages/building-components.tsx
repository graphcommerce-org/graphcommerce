import Typography from '@mui/material/Typography'
import { ThemeProvider, useTheme } from '@mui/material/styles'
import { MyComponent as ComponentChild } from '../components/ComponentChild'
import { MyComponent as ComponentChildVariant } from '../components/ComponentChildVariant'
import { MyComponent as ComponentChildVariantExtendable } from '../components/ComponentChildVariantExtendable'
import { MyComponent as ComponentStylable } from '../components/ComponentStylable'

export function UsingBasic() {
  const theme = useTheme()

  return (
    <>
      <Typography variant='h3'>Basic</Typography>

      <ComponentStylable
        sx={{
          backgroundColor: 'primary.main',
        }}
      >
        Component Stylable
      </ComponentStylable>

      <Typography variant='h3'>With a child</Typography>

      <ComponentChild
        sx={{
          backgroundColor: 'secondary.main',
          [ComponentChild.selectors.child]: {
            backgroundColor: 'secondary.dark',
          },
        }}
      >
        Component with a child
      </ComponentChild>

      <Typography variant='h3'>With a variant</Typography>

      <ComponentChildVariant variant='supercool'>Component Child Variant</ComponentChildVariant>

      <Typography variant='h3'>With a variant and extendable</Typography>

      <ThemeProvider
        theme={{
          ...theme,
          components: {
            ...theme.components,
            MyComponent: {
              styleOverrides: {
                root: {
                  fontSize: '120%',
                },
              },
            },
          },
        }}
      >
        <ComponentChildVariantExtendable>
          Component Child Variant but extendable
        </ComponentChildVariantExtendable>
      </ThemeProvider>
    </>
  )
}
