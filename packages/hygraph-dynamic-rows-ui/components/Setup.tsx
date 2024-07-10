import { useApp, Wrapper } from '@hygraph/app-sdk-react'
import Image from 'next/image'
import { useState } from 'react'
import styles from './setup.module.css'

function Install() {
  const { updateInstallation, installation, showToast } = useApp()

  const installed = installation.status === 'COMPLETED'
  const [gqlUri, setGqlUri] = useState('')

  const saveOnClick = () =>
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
      }).catch((err) => err),
    )

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
      }).catch((err) => err),
    )

  const uninstallOnClick = () => {
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
        }).catch((err) => err)
      })
      .catch((error) => {
        console.error('Error updating installation', error)
      })

    return 0
  }

  let buttonText: string
  let buttonAction: typeof uninstallOnClick | typeof installOnClick

  if (installed) {
    buttonText = 'Disable app'
    buttonAction = uninstallOnClick
  } else {
    buttonText = 'Enable app'
    buttonAction = installOnClick
  }

  return (
    <>
      <>
        <span>
          <strong>GraphQL API URI</strong>
        </span>
        <input
          name='gql-uri'
          className={styles.textInput}
          defaultValue={(installation.config.backend as string) ?? ''}
          onChange={(e) => setGqlUri(e.target.value)}
        />
      </>

      <div className={styles.buttonsContainer}>
        <button type='button' className={styles.button} onClick={saveOnClick} data-save-button>
          Save
        </button>
        <button
          type='button'
          className={styles.button}
          onClick={buttonAction}
          aria-disabled={installed}
        >
          {buttonText}
        </button>
      </div>
    </>
  )
}

export function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.logoWrapper}>
          <Image
            src='https://www.graphcommerce.org/_next/static/media/graphcommerce.a8fe7e28.svg'
            layout='fill'
            alt='GraphCommerce logo'
          />
        </div>

        <h1 className={styles.title}>
          Dynamic Rows Property Selector <span className={styles.author}>by Joshua Bolk</span>
        </h1>
        <p className={styles.description}>
          Enhance your content management experience with Dynamic Rows, specifically designed to
          integrate seamlessly with our Dynamic Row module. It features an intuitive property picker
          field, allowing for effortless selection and organization of properties to customize your
          content layout. Enable the app and put your graphQL URI to get started.
        </p>
        <Wrapper>
          <Install />
        </Wrapper>
      </div>
    </div>
  )
}
