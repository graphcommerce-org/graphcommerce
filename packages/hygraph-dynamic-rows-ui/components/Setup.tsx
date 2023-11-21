import { useApp, Wrapper } from '@hygraph/app-sdk-react'
import styles from './setup.module.css'
import { useState } from 'react'

function Install() {
  // @ts-ignore - outdated types from @hygraph/app-sdk-react
  const { updateInstallation, installation, showToast, extension } = useApp()
  const installed = installation.status === 'COMPLETED'
  const [gqlUri, setGqlUri] = useState('')

  const saveOnClick = () => {
    updateInstallation({
      config: { backend: gqlUri },
      status: 'COMPLETED',
    }).then(() =>
      showToast({
        title: 'New GraphQL URI saved',
        description: `${gqlUri} is now the GraphQL URI for this application.}`,
        duration: 5000,
        isClosable: true,
        position: 'top-left',
        variantColor: 'success',
      }).catch((err) => console.log(err)),
    )
  }

  const changedUri = extension.config.backend !== gqlUri

  const installOnClick = () =>
    updateInstallation({
      config: { backend: gqlUri },
      status: 'COMPLETED',
    }).then(() =>
      showToast({
        title: 'Application enabled',
        description: 'You can now use the Dynamic Row Property Selector field in your schema.',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
        variantColor: 'success',
      }).catch((err) => console.log(err)),
    )

  const uninstallOnClick = async () => {
    updateInstallation({
      config: {},
      status: 'DISABLED',
    })
      .then(() => {
        showToast({
          title: 'Application disabled',
          description: 'You can re-enable the application from the application configuration page.',
          duration: 5000,
          isClosable: true,
          position: 'top-left',
          variantColor: 'success',
        })
      })
      .catch((error) => {
        console.error('Error updating installation', error)
      })

    return 0
  }

  return (
    <>
      <>
        <span>GraphQL API URI</span>
        <input
          name='gql-uri'
          defaultValue={extension.config.backend}
          onChange={(e) => setGqlUri(e.target.value)}
        />
      </>

      <button
        type='button'
        className={styles.button}
        onClick={changedUri ? saveOnClick : installed ? uninstallOnClick : installOnClick}
      >
        {changedUri ? 'Save' : installed ? 'Disable app' : 'Enable app'}
      </button>
    </>
  )
}

export function Page() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dynamic Rows Property Selector</h1>
      <p className={styles.description}>
        Enhance your content management experience with Dynamic Rows, specifically designed to
        integrate seamlessly with our Dynamic Row module. It features an intuitive property picker
        field, allowing for effortless selection and organization of properties to customize your
        content layout. Press install to get started!
      </p>
      <Wrapper>
        <Install />
      </Wrapper>
    </div>
  )
}
