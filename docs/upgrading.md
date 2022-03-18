> **Developer preview**  
> This is a developer preview of GraphCommerce. The documentation will be
> updated as GraphCommerce introduces
> [new features and refines existing functionality](https://github.com/graphcommerce-org/graphcommerce/releases).

# Upgrading

We are going to upgrade your project to the latest version, for all the new
features and fixes that we've made. We can automate most of this process, but
there are some manual steps involved.

We try to keep changes to the examples minimal as possible, but sometimes this
is inevitable. 95% of the changes are made inside the @graphcommerce packages,
but for some changes we need to make changes in the example to get everything
working.

To upgrade your project to the latest version we need to do a few steps:

## What you'll do

After you've finished this guide, you'll have accomplished the following:

- Created a changes.patch file and applied it to your project
- Upgraded all dependencies to the latest version
- Incorporated all latest changes in your project while maintaining all your
  customizations

## Create an apply a patch file

1. Get the version of your project  
   In your local package.json you'll find something like this:

   ```json
   {
     "dependencies": {
       //...
       "@graphcommerce/next-ui": "^4.2.0"
       //...
     }
   }
   ```

   We need the version of `@graphcommerce/next-ui` later.

2. Create a checkout of the GraphCommerce project

   ```bash
   git clone git@github.com:graphcommerce-org/graphcommerce.git
   ```

   Or if you have a local copy already available, make sure that you are on the
   latest commit of the `main` branch.

3. Create a patch from the example

   Replace `OLD_VERSION` in the command below with the version you the version
   number you found in the package.json file:

   ```bash
   git diff --unified=0 --relative=examples/magento-graphcms "@graphcommerce/next-ui@OLD_VERSION" examples/magento-graphcms ':!examples/magento-graphcms/CHANGELOG.md' > changes.patch
   ```

   It should look something like:

   ```bash
   git diff --unified=0 --relative=examples/magento-graphcms "@graphcommerce/next-ui@4.2.0" examples/magento-graphcms ':!examples/magento-graphcms/CHANGELOG.md' > changes.patch
   ```

   If you run this command you should have a changes.patch file in root of the
   `graphcommerce` repo.

4. Move the file to your project's root directory

   ```bash
   mv changes.patch ../your-project-root
   ```

   You should now have a changes.patch file in the root of your project.

5. Apply the patch to your project

   Make sure your working directory is clean (except for the changes.patch file)

   ```bash
   git apply --unidiff-zero --reject --ignore-whitespace --exclude=README.md changes.patch
   ```

   You should now have all the changes from the example applied to your project.

## Resolving patch conflicts

It can very wel be that some files can't be updated automatically, because of
your modifications. You'll see something like `Rejected hunk #2` in the cli. The
above command will create rejection files like `Component.ts.rej` for each hunk
it couldn't apply.

All the '.rej' files must be handled manually by:

- Manually applying the .rej file to the original file because you want the
  changes.
- Discarding the .rej file because you've modified the project already.

## Resolving package.json issues

If you've got a package.json.rej file and the diff is very large, it might be
easier to manually update the file.

Copy the following keys from `graphcommerce/examples/your-example/package.json`
to your local package.json:

- `dependencies` AND keep your own added local dependencies
- `devDependencies` AND keep your own added local devDependencies
- `scripts_local` -> `scripts` AND keep your own added local scripts

## Installing dependencies

```bash
rm yarn.lock
yarn
yarn codegen
yarn dev
```

If everything is applied correctly you should now have a working shop again.

## Validating your project
