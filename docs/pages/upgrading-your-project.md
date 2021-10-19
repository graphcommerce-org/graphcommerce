# Upgrading your Project

Note: If you've

To upgrade your project we need to:

1. Upgrade all the GraphCommerce packages to the latest version and
2. We need to migrate changes made in the graphcommerce example repo for your
   usage.

Instructions:

1. `yarn list --pattern @graphcommerce/next-ui` to find currently installed
   package. We need this later, write it down somewhere.  
   _Note: We're using `@graphcommerce/next-ui` here, because that package is
   almost guaranteed to be updated with every release._
2. Find the latest version of
   (`@graphcommerce/next-ui`)[https://github.com/ho-nl/m2-pwa/blob/master/packages/next-ui/package.json#L3].
   We need this later, write it down somewhere.
3. Run `yarn upgrade-interactive --latest` in the root of your project. And
   upgrade all packages to the latest version.
4. If you haven't already, make sure you have a copy of the GraphCommerce repo
   checked out locally, we're going to use that to find out what has changed in
   the example directories.
   ```
   git clone git@github.com:ho-nl/m2-pwa.git graphcommerce
   cd graphcommerce
   ```
5. `git diff "@graphcommerce/next-ui@OLD_VERSION".."@graphcommerce/next-ui@NEW_VERSION" examples`
6. Manually traverse the diff and apply changes to your project.

## Future tools

The last step feels a bit robotic to us and we're looking into improving the
flow. [Issue](https://github.com/ho-nl/m2-pwa/issues/1173)
