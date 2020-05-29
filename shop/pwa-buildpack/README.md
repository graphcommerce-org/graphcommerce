# Reach Digital NextJS Magento PWA Buildpack

Package to replace
[@magento/pwa-buildpack](https://github.com/magento/pwa-studio/tree/develop/packages/pwa-buildpack).

## Goal

- Make the Magento packages buildable with NextJS

### Replaces [MagentoResolver](https://magento.github.io/pwa-studio/pwa-buildpack/reference/magento-resolver/)

Handled by the webpack config.

### Replaces [MagentoRootComponentsPlugin](https://magento.github.io/pwa-studio/pwa-buildpack/reference/root-components-plugin/)

Handled by NextJS

### Replaces [PWADevServer](https://magento.github.io/pwa-studio/pwa-buildpack/reference/pwa-dev-server/)

Handled by NextJS

### Replaces [ServiceWorkerPlugin](https://magento.github.io/pwa-studio/pwa-buildpack/reference/serviceworker-plugin/)

todo: Will probably be replaced by next-offline or next-pwa

### [Environment Variables](https://magento.github.io/pwa-studio/pwa-buildpack/reference/environment-variables/)

todo: we should probably use Magento's env variables
