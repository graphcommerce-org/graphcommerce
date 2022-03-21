> **Developer preview**  
> This is a developer preview of GraphCommerce. The documentation will be
> updated as GraphCommerce introduces
> [new features and refines existing functionality](https://github.com/graphcommerce-org/graphcommerce/releases)

# Upgrading

This guide describes how to upgrade your GraphCommerce project files and its
dependencies, while keeping your customizations.

### After you've finished this upgrading guide, you'll have accomplished the following:

- Created a changes.patch file and applied it to your project
- Upgraded all dependencies to the latest version
- Incorporated all the latest changes in your project, while keeping your
  customizations

## Create and apply a patch file

1. In package.json, find your version:

```json
// Example from package.json

{
  "dependencies": {
    //...
    "@graphcommerce/next-ui": "^4.2.0"
    //...
  }
}
```

2. Download a fresh copy of the repository:

   ```bash
   git clone git@github.com:graphcommerce-org/graphcommerce.git upgrade
   ```

3. Navigate to the /upgrade directory you've just created. Run the following
   command, but replace `OLD_VERSION` with your version of
   `@graphcommerce/next-ui`:

   ```bash
   git diff --relative=examples/magento-graphcms "@graphcommerce/next-ui@OLD_VERSION" examples/magento-graphcms ':!examples/magento-graphcms/CHANGELOG.md' > changes.patch
   ```

4. Move the `changes.patch` file from the /upgrade directory to the root of your
   project.

5. Apply the patch to your project (It's advised to apply on a new branch):

   ```bash
   git apply --reject --ignore-whitespace --exclude=README.md changes.patch
   ```

6. Resolve any issues

7. Run and validate your local environment:

- `yarn codegen` should run without errors
- `yarn tsc:lint` should run without errors
- `yarn dev` should run without errors

8. Commit, push and deploy

## Resolving issues

When you run `git apply ...` (step 4), git will try and apply all the diffs from
the patch file to your project files. When applying a diff fails, a `.rej` file
will be created for _each_ file that could not be upgraded.

It can very well be that some files can't be updated automatically, because of
modifications you made. The CLI will show you the location of these files, as
well as the number of hunks:

```
Applying patch pages/_app.tsx with 2 rejects...
Rejected hunk #1.
Rejected hunk #2.
```

It's recommended to review all suggested changes using VS code's build in
functionality, or any other diff tool. Apply the suggested diffs you want.
Discard the .rej files of those you don't want. Before you commit, make sure to
delete all th .rej files:

```bash
find . -type f -name '*.rej' -delete
```

### Resolving package.json issues

If running the upgrade steps results in a `package.json.rej` file and the diff
is large, it can be easier to manually update the `package.json` file:

1. Replace your local `dependencies` with the example's `dependencies` (and
   [remove PSP's](./getting-started/create.md#remove-unused-psps) your backend
   doesn't support)
2. Replace your local `devDependencies` with the example's `devDependencies`
3. Replace your local `scripts` with the example's `scripts_local`

Keep any additional installed local dependencies. After updating the
package.json file, run the following to install the latest packages:

- `rm package.json.rej` remove diff file
- `rm yarn.lock`
- `yarn` Install the dependencies
- `yarn codegen` Converts all .graphql files to typescript files
- `yarn dev` Run the app

## Next steps

- Learn how to [contribute to GraphCommerce](./contributing.md)
