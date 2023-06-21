import React from 'react'
import { useApp, Wrapper } from '@hygraph/app-sdk-react'
import { Button } from '@mui/material'

function Install() {
  const { updateInstallation } = useApp()

  return (
    <Button
      type='button'
      onClick={async () => {
        console.log(1)
        await updateInstallation({ status: 'COMPLETED', config: {} }).catch((e) => {
          console.log(e)
        })
      }}
    >
      Install App
    </Button>
  )
}

function Configure() {
  return <div>Configure</div>
}

export function Page() {
  const { installation } = useApp()

  // if (installation?.status === 'COMPLETED') {
  //   return (
  //     <Wrapper>
  //       <Configure />
  //     </Wrapper>
  //   )
  // }

  return (
    <Wrapper>
      <Install />
    </Wrapper>
  )
}

export function TestTest() {
  return <div>tralala</div>
}
