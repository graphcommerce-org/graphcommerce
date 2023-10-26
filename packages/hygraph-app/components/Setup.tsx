import { useApp, Wrapper } from '@hygraph/app-sdk-react'
import { Box, Container, Typography } from '@mui/material'

function Install() {
  const { updateInstallation, installation } = useApp()

  if (installation.status === 'COMPLETED') {
    return (
      <Typography variant='h4' sx={{ mt: '8px' }}>
        Application succesfully installed!
      </Typography>
    )
  }

  return (
    <button
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
    </button>
  )
}

export function Page() {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'start',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        my: '10px',
      }}
    >
      <Box sx={{ maxWidth: '45%', mx: 'auto' }}>
        <Typography variant='h2'>Hygraph | Dynamic Rows</Typography>
        <Typography variant='h4'>Property Picker</Typography>
        <Typography
          variant='body1'
          sx={{
            mt: '8px',
          }}
        >
          Enhance your content management experience with the Hygraph App, specifically designed to
          integrate seamlessly with our Dynamic Row module. It features an intuitive property picker
          field, allowing for effortless selection and organization of properties to customize your
          content layout. Streamline your workflow and unlock new levels of efficiency and
          customization with this robust and user-friendly tool. Press install to get started!
        </Typography>
      </Box>
      <Wrapper>
        <Install />
      </Wrapper>
    </Container>
  )
}
