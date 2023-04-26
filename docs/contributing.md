# Contributing to GraphCommerce

Looking to contribute something to GraphCommerce? Here's how you can help.

Please take a moment to review this document in order to make the contribution
process easy and effective for everyone involved.

### Bug reports

Well-written, thorough bug reports are a great way to contribute to the project.
Before raising a new issue, please check our
[issues list ↗](https://github.com/graphcommerce-org/graphcommerce/issues) to
determine whether the issue you encountered has already been reported.

A good bug report should be self-explanatory. Use the
[bug report template ↗](https://github.com/graphcommerce-org/graphcommerce/issues/new/choose)
to create a bug report.

### Feature requests

Feature requests are welcome. Please take a moment to find out whether your idea
fits with the scope and aims of the project. It's up to you to make a strong
case to convince us of the merits of this feature.

Provide as much detail and context as possible. Use the
[feature request template ↗](https://github.com/graphcommerce-org/graphcommerce/issues/new/choose)
to create a feature request.

## Pull requests

Good pull requests (e.g. patches, improvements, new features) are a fantastic
help. Please
[ask first ↗](https://join.slack.com/t/graphcommerce/shared_invite/zt-11rmgq1ad-F~0daNtKcSvtcC4eQRzjeQ)
before embarking on any significant pull request (e.g. implementing features or
refactoring code), otherwise you risk spending a lot of time working on
something that might not be relevant to the project.

### File structure

```txt
File structure of GraphCommerce

├── docs
├── examples
    └── magento-graphcms
├── packages
```

- To make changes to the magento-graphcms template, edit the files in
  examples/magento-graphcms.

- To modify GraphCommerce framework, components, edit the files in
  packages/graphcommerce.

- To make changes to the docs, edit the files in docs

### Formatting and Linting

GraphCommerce uses ESLint for linting and Prettier for code formatting. Install
the [recommended VS Code extensions](../docs/getting-started/vscode.md)

<!--
### Contributor License Agreement

Please make sure you have signed our Contributor License Agreement. We are not
asking you to assign copyright to us, but to give us the right to distribute
your code without restriction. We ask this of all contributors in order to
assure our users of the origin and continuing existence of the code. You only
need to sign the CLA once.
-->

### Creating a branch

1. Fork the repository and clone it locally.
2. Create a branch for your PR based on the `canary` branch. Use the following
   naming convention: `feature/your-branch-name` or `fix/your-branch-name`

### Creating a pull request

1. Create a pull request. The PR can stay open until you are ready to merge.
2. Add your changes
3. Add a changeset

- Run 'yarn changeset' and select 'patch' for bugfixes and 'minor' for new
  features. Commit the changeset that is created.

<figure>

![yarn changeset](https://user-images.githubusercontent.com/1251986/157868337-0fa27e88-cf35-4e38-a59c-72c72ef6b054.jpg)

  <figcaption>Select 'patch' or 'minor' when running `yarn changeset`</figcaption>
</figure>

### Merge checklist for your pull request

- Code must pass the CI checks.
- Code must be formatted with prettier
- Changeset is available
- Eslint must not report any errors in the changed files
- Eslint should not give any warnings in the changed files
- Bundle size should not increase significantly
- Lingui translations must be
  [generated](https://www.graphcommerce.org/docs/framework/translations#generating-translation-files-with-all-translations)
  and translated
- Changes made to `examples/magento-graphcms` should be kept to a minimum,
  because every change made here must be applied by every developer upgrading a
  GraphCommerce project
  - Extract code changes made and move them into packages where possible.
  - Stylistic only changes usually aren't prefered, less changes often is
    better.

## Next steps

- Discuss your ideas in the public
  [ Slack community. ↗](https://join.slack.com/t/graphcommerce/shared_invite/zt-11rmgq1ad-F~0daNtKcSvtcC4eQRzjeQ)
  chat
