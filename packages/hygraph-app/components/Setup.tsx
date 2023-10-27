import { useApp, Wrapper } from '@hygraph/app-sdk-react'
import styles from './setup.module.css'

function Install() {
  const { updateInstallation, installation, showToast } = useApp()
  const installed = installation.status === 'COMPLETED'

  const installOnClick = () =>
    updateInstallation({
      config: {},
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
    <button
      type='button'
      className={styles.button}
      onClick={installed ? uninstallOnClick : installOnClick}
    >
      {installed ? 'Disable app' : 'Enable app'}
    </button>
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
