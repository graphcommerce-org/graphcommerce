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

1. Get the version of **your own project**

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

2. Create a clone of the `https://github.com/graphcommerce-org/graphcommerce`
   repo.

   ```bash
   git clone git@github.com:graphcommerce-org/graphcommerce.git
   ```

   Or if you have a local copy already available, make sure that you are on the
   latest commit of the `main` branch.

3. Create a patch from the example

   Replace `OLD_VERSION` in the command below with the version number of
   `@graphcommerce/next-ui` you just looked up:

   ```bash
   git diff --relative=examples/magento-graphcms "@graphcommerce/next-ui@OLD_VERSION" examples/magento-graphcms ':!examples/magento-graphcms/CHANGELOG.md' > changes.patch
   ```

   Run the above command (with OLD_VERSION replaced with something like `1.2.3`)
   in the `graphcommerce` repo. you should have a changes.patch file in root of
   the `graphcommerce` repo.

4. Move the file to your project's root directory

   ```bash
   mv changes.patch ../your-project-root
   cd ../your-project-root
   ```

   Tip: create a separate branch

   ```bash
   git checkout -b my-upgrade
   ```

   You should now have a changes.patch file in the root of your project.

5. Apply the patch to your project

   Make sure your working directory is clean (except for the changes.patch file)
   and run:

   ```bash
   git apply --reject --ignore-whitespace --exclude=README.md changes.patch
   ```

   You should now have all the changes from the example applied to your project.

   Tip: create an intermediate commit

   ```bash
   git commit -am"refactor: applied patches"
      rm changes.patch
   ```

## What has happened?

> `git apply --reject` will try and apply all the diffs to your project and if
> it isn't able to do so, it will create a `.rej` file for _each_ file that it
> couldn't apply the changes to.
>
> `git` expects you to manually apply the changes in the `.rej` files to your
> project.

## Resolving package.json issues

If you've got a package.json.rej file and the diff is very large, it might be
easier to manually update the file.

We want to have the latest `dependencies`, `devDependencies` and `scripts` from
`graphcommerce/examples/magento-example/package.json`.

- Replace your local `dependencies` with the example `dependencies` (and
  [remove PSPs](./getting-started/create.md#remove-unused-psps) your backend
  doesn't support)
- Replace your local `devDependencies` with the example `devDependencies`
- Replace your local `scripts` with the example `scripts_local`

It might be that you have installed additional local dependencies, you can keep
those.

```bash
rm yarn.lock
yarn
yarn codegen
rm package.json.rej
```

## Resolving patch conflicts

It can very wel be that some files can't be updated automatically, because of
your modifications. You'll see something like `Rejected hunk #2` in the cli. The
above command will create rejection files like `Component.ts.rej` for each hunk
it couldn't apply.

All the '.rej' files **must** be handled manually by:

- Manually applying the diff in the .rej file to the original file because you
  want the changes. (recommended)
- Discarding the .rej file because you've modified the project already.

Make sure all .rej files are deleted (`find . -type f -name '*.rej' -delete`)

Tip: make a commit

```bash
git commit -am"refactor: processed manual .rej files"
```

## Running and validating your project

- `yarn codegen` should run without errors
- `yarn tsc:lint` should run without errors
- `yarn dev` should run without errors

If the above commands are working correctly you should now have a working
project. Validate if everything looks right, especially the parts that have
manual changes.

You are done with the upgrade! 🎉

Commit, push and deploy!
