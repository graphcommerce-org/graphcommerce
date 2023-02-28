# Patch package

GraphCommerce relies on [patch-package ↗](https://github.com/ds300/patch-package) to make modifications to GraphCommerce where there are no ways to modify through props or plugins.

`yarn create-patch @graphcommerce/magento-store`

## Benefits of patching over copying a file to local

- Get told in big red letters when the original file is changed and you need to check that your fix is still valid.
- Patches can be reviewed as part of your normal review process, local changes will slip though the cracks.

## When to make a local copy of a file

- The change is too consequential to be modified in place.

## Isn't this dangerous?

Nope. The technique is quite robust. Here are some things to keep in mind though:

- It's easy to forget to run yarn or npm when switching between branches that do and don't have patch files.
- Long lived patches can be costly to maintain if they affect an area of code that is updated regularly and you want to update the package regularly too.
- Big semantic changes can be hard to review. Keep them small and obvious or add plenty of comments.
- Changes can also impact the behaviour of other untouched packages. It's normally obvious when this will happen, and often desired, but be careful nonetheless.

## How to make a patch

1. Make your changes to the file in node_modules.
2. Run `yarn create-patch @graphcommerce/magento-store` to create a patch file.
