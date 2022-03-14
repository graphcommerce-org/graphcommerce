# Contributing to GraphCommerce

Want to get involved? There are plenty of ways you can help. Please take a
moment to review this guide to make the contribution process easy and effective
for everyone involved.

### Bug reports

Well-written, thorough bug reports are a great way to contribute to the project.
Before raising a new issue, please check our
[issues list ↗](https://github.com/graphcommerce-org/graphcommerce/issues) to
determine whether the issue you encountered has already been reported.

A good bug report should be self-explanatory. Use the
[bug report template ↗](https://github.com/graphcommerce-org/graphcommerce/issues/new/choose)
to create a bug report.

### Feature requests

Feature requests are welcome. Please take your time to document the feature as
much as possible - it is up to you to convince the project's maintainers of the
merits of this feature, and its alignment with the scope and goals of the
project.

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

### Creating a pull request

1. Create a pull request. The PR can stay open until you are ready to merge.
2. Add your changes
3. Add a changeset

- Run 'yarn changeset' and select minor bump. Commit the changeset that is
  created.

<figure>

![yarn changeset](https://user-images.githubusercontent.com/1251986/157868337-0fa27e88-cf35-4e38-a59c-72c72ef6b054.jpg)

  <figcaption>Select minor bump when running `yarn changeset`</figcaption>
</figure>

## Next steps

- Discuss your ideas and learnings in the public
  [ Slack community. ↗](https://join.slack.com/t/graphcommerce/shared_invite/zt-11rmgq1ad-F~0daNtKcSvtcC4eQRzjeQ)
  chat
