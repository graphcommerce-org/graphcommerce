import React from 'react'
import { useApp, Wrapper } from '@hygraph/app-sdk-react'

function useLogin() {
  const [accessToken, setAccessToken] = React.useState<string>('')
  function login() {
    setAccessToken('123456')
    localStorage.setItem('appToken', accessToken)
  }
  return { accessToken, login }
}

function Install() {
  const { accessToken, login } = useLogin()
  const { updateInstallation, installation } = useApp()

  if (accessToken) {
    return <div>Connected as name@example.com</div>
  }

  if (installation.status === 'COMPLETED') {
    return <div>App installation successful</div>
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
      Install App
    </button>
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
    <>
      <div>
        <h1>Hygraph Setup</h1>
      </div>
      <Wrapper>
        <Install />
      </Wrapper>
    </>
  )
}

// import { Wrapper } from '@hygraph/app-sdk-react'

// export function Page() {
//   return <Wrapper>Hello Hygraph</Wrapper>
// }
