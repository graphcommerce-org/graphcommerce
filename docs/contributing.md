# Contributing to GraphCommerce

**Requirements**

- Install and use node 14: `nvm install 14 && nvm use 14`
- Install yarn: `npm install --global yarn`

### Download GraphCommerce

1. `git clone ... graphcommerce`
2. `cd graphcommerce/examples/magento-graphcms/`
3. `cp -R .env.example .env`

**Start the development environment**

- `yarn` Install the dependencies
- `yarn codegen` Converts all .graphql files to typescript files
- `yarn dev` Run the app

Visit the dev environment at http://localhost:3000.

### Making changes

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

GraphCommerce uses ESLint for linting and Prettier for code formatting.

Install the [recommended VS Code extensions](../docs/getting-started/vscode.md)

### Contributing

1. Create a pull request. The PR can stay open until you are ready to merge.
2. Add your changes
3. Add a changeset

- Run 'yarn changeset' and select minor bump. Commit the changeset that is created.

<figure>

![yarn changeset](https://user-images.githubusercontent.com/1251986/157868337-0fa27e88-cf35-4e38-a59c-72c72ef6b054.jpg)
  
  <figcaption>Select minor bump when running `yarn changeset`</figcaption>
</figure>

- Check if your changeset is detected

<figure>

![Github changeset detected](https://user-images.githubusercontent.com/1251986/157868587-a761fde9-b0ec-418d-9e43-2e6375f37358.jpg)
    
  <figcaption>Changeset detected on the PR github page</figcaption>
</figure>


4. When you are ready to merge your PR, please select the `Squash and Merge`
  option. This helps reduce the commit noise in the Git repository.


## Next steps

- Discuss your ideas and learnings in the
  [Slack community ↗](https://join.slack.com/t/graphcommerce/shared_invite/zt-11rmgq1ad-F~0daNtKcSvtcC4eQRzjeQ)
