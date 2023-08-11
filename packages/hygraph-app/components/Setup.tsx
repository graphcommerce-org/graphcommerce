import { Button } from '@graphcommerce/next-ui'
import { useApp, Wrapper } from '@hygraph/app-sdk-react'
import { Box, Container, Typography } from '@mui/material'

function Install() {
  const { updateInstallation, installation } = useApp()

  if (installation.status === 'COMPLETED') {
    return (
      <Typography variant='h4' sx={(theme) => ({ mt: theme.spacings.md })}>
        Application succesfully installed!
      </Typography>
    )
  }

  return (
    <Button
      sx={(theme) => ({
        mt: theme.spacings.lg,
        mx: 'auto',
      })}
      variant='pill'
      color='primary'
      size='large'
      type='button'
      onClick={() =>
        updateInstallation({
          config: {},
          status: 'COMPLETED',
        })
          .then((updatedInstallation) => {
            console.log('Installation updated', updatedInstallation)
          })
          .catch((error) => {
            console.error('Error updating installation', error)
          })
      }
    >
      Install app
    </Button>
  )
}

function Configure() {
  return <div>Configure</div>
}

function Setup() {
  const { installation } = useApp()
  if (installation.status === 'COMPLETED') {
    return <h1>Hello</h1>
  }
  return <Install />
}

export function Page() {
  return (
    <Container
      maxWidth={false}
      sx={(theme) => ({
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'start',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        my: theme.spacings.md,
      })}
    >
      <Box sx={{ maxWidth: '45%', mx: 'auto' }}>
        <Typography variant='h2'>Hygraph | Dynamic Rows</Typography>
        <Typography variant='h4'>Property Picker</Typography>
        <Typography
          variant='body1'
          sx={(theme) => ({
            mt: theme.spacings.md,
          })}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus blandit molestie mauris,
          iaculis vulputate velit volutpat eu. Nam aliquet ipsum sit amet ipsum porta, nec cursus
          felis pellentesque. Nam vel velit non massa dapibus consequat quis ut elit. Aliquam sed
          congue est. Vivamus volutpat molestie posuere. Praesent semper nisl eget ultricies
          maximus. Ut sollicitudin lorem non enim condimentum viverra. Fusce id ultricies nibh, sed
          imperdiet enim. Suspendisse at lacus ac neque feugiat placerat ut ac sapien.
        </Typography>
      </Box>
      <Wrapper>
        <Install />
      </Wrapper>
    </Container>
  )
}
