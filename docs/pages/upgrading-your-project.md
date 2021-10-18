# Upgrading your Project

To upgrade your project we need to upgrade all the GraphCommerce packages to the
latest version and we need to migrate the made in the base example directories
directories to your local project.

1. Have a copy of the GraphCommerce repo checked out locally, we're going to use
   that to find out what has changed in the example directories.
   (`git clone git@github.com:ho-nl/m2-pwa.git graphcommerce`)
2. `yarn list --pattern @graphcommerce/next-ui` to find currently installed
   package. We need this later, write it down somewhere.
3. Find the latest version of
   (`@graphcommerce/next-ui`)[https://github.com/ho-nl/m2-pwa/blob/master/packages/next-ui/package.json#L3].
   We need this later, write it down somewhere.
4. `yarn upgrade-interactive --latest` to install all the latest @graphcommerce
   packages.
5. `git diff "@graphcommerce/next-ui@OLD_VERSION".."@graphcommerce/next-ui@NEW_VERSION" examples`
6. Manually traverse the diff and apply changes to your project.

## Future tools

The last step feels a bit robotic to us and we're looking into improving the
flow. [Issue](https://github.com/ho-nl/m2-pwa/issues/1173)
