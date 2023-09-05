---
menu: Upgrading step by step
---

# Upgrading

This guide describes how to upgrade your GraphCommerce project files and its
dependencies, while keeping your customizations.

### After you've finished this upgrading guide, you'll have accomplished the following:

- Created a changes.patch file and applied it to your project
- Upgraded all dependencies to the latest version
- Incorporated all the latest changes in your project, while keeping your
  customizations

## Step 1: Creating and applying a patch file

1. In package.json, find your version:

   ```json
   // Example from package.json

   {
     "dependencies": {
       //...
       "@graphcommerce/next-ui": "6.1.0"
       //...
     }
   }
   ```

2. Download a fresh copy of the repository:

   ```bash
   git clone -b main https://github.com/graphcommerce-org/graphcommerce.git
   ```

3. Navigate to the /upgrade directory you've just created. Run the following
   command, but replace `OLD_VERSION` with your version of
   `@graphcommerce/next-ui`:

   ```bash
   git diff -w --relative=examples/magento-graphcms "@graphcommerce/next-ui@OLD_VERSION" examples/magento-graphcms ':!examples/magento-graphcms/CHANGELOG.md' > changes.patch
   ```

4. Move the `changes.patch` file from the /upgrade directory to the root of your
   project.

5. Apply the patch to your project (It's recommended to apply changes on a new
   branch):

   ```bash
   git apply --reject --ignore-whitespace --exclude=README.md changes.patch
   ```

## Step 2: Resolving issues

### Resolving package.json issues

If running the upgrade steps results in a `package.json.rej` file and the diff
is large, it can be easier to manually update the `package.json` file.

Compare your local /package.json with the example's
`/upgrade/examples/magento-graphcms/package.json` you just downloaded and:

1. Replace your local `dependencies` with the example's `dependencies`. Keep any
   additional installed local dependencies and
   [remove PSP's](./getting-started/create.md#remove-unused-psps) your backend
   doesn't support.
2. Replace your local `devDependencies` with the example's `devDependencies`
3. Replace your local `resolutions` with the example's `resolutions`

After updating the package.json file, run the following to install the latest
packages:

- `rm yarn.lock && yarn` Remove lock and install the dependencies
- `yarn codegen` Converts all .graphql files to typescript files
- `yarn dev` Run the app

### Resolving diff issues

When you run `git apply ...` (step 5), git will try and apply all the diffs from
the patch file to your project files. When applying a diff fails, a
[reject ↗](https://git-scm.com/docs/git-apply#Documentation/git-apply.txt---reject)
`.rej` file will be created for _each_ file that could not be upgraded.

It can very well be that some files can't be updated automatically, because of
modifications you made. The CLI will show you the location of these files, as
well as the number of hunks:

```
Applying patch pages/_app.tsx with 2 rejects...
Rejected hunk #1.
Rejected hunk #2.
```

The suggested changes have to be reviewed _manually_ (a diff tool can provide
insight, but won't be able to apply diffs). Manually apply the suggested changes
you want. Discard the .rej files of the suggested changes you don't want. Before
you commit, make sure to delete all the .rej files:

```bash
find . -type f -name '*.rej' -delete
```

After resolving the diff issues, manually process upgrade instructions:

- [Upgrading to GraphCommerce 5 to 6](../upgrading/graphcommerce-5-to-6.md)
- [Upgrading to GraphCommerce 6 to 7](../upgrading/graphcommerce-6-to-7.md)

Run and validate your local environment:

- `yarn codegen` should run without errors
- `yarn tsc:lint` should run without errors
- `yarn dev` should run without errors

## Next steps

- Learn how to [contribute to GraphCommerce](../contributing.md)
