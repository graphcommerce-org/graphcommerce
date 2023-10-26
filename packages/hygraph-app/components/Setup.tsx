import { useApp, Wrapper } from '@hygraph/app-sdk-react'
import styles from './setup.module.css'

function Install() {
  const { updateInstallation, installation } = useApp()

  const installed = installation.status === 'COMPLETED'

  const installOnClick = () =>
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

  const uninstallOnClick = () =>
    updateInstallation({
      config: {},
      status: 'DISABLED',
    })
      .then((updatedInstallation) => {
        console.log('Disabled application', updatedInstallation)
      })
      .catch((error) => {
        console.error('Error updating installation', error)
      })

  return (
    <button
      type='button'
      className={styles.button}
      onClick={installed ? uninstallOnClick : installOnClick}
    >
      {installed ? 'Uninstall' : 'Install app'}
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
        content layout. Streamline your workflow and unlock new levels of efficiency and
        customization with this robust and user-friendly tool. Press install to get started!
      </p>
      <Wrapper>
        <Install />
      </Wrapper>
    </div>
  )
}
