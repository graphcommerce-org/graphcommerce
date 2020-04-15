# Reach Digital

- [Next.js](https://nextjs.org/) + [React](https://reactjs.org/)
- [GraphQL](https://graphql.org/) +
  [GraphQL Code Generator](https://graphql-code-generator.com/) +
  [Apollo](https://www.apollographql.com/docs/react/)
- [GraphCMS](https://graphcms.com/)
- [Material UI](https://material-ui.com/)
- [Zeit](https://zeit.co/reachdigital)
- [Schema-dts](https://github.com/google/schema-dts)
- [react-schemaorg](https://github.com/google/react-schemaorg) +
  [schema-dts](https://github.com/google/schema-dts)

# Install

Make sure you're using Node >= 12 `nvm install 12 && nvm alias default node`

1. `yarn`
2. `cp .env.example .env` and fill values

# Run

Site:

- `yarn dev`
- `yarn storybook`

# Build

- `yarn build`
- `ANALYZE=true yarn build`

# Commits

Commits are validated with https://github.com/conventional-changelog/commitlint

Gittower: Gittower doesn't properly read your PATH variable and thus commit
validation doesn't work. Use `gittower .` to open this repo.

# Releases

Using https://semantic-release.gitbook.io/.

- Dry-run `GH_TOKEN="bla" SLACK_WEBHOOK="bla" yarn semantic-release`

# Deploy

- To deploy a testbranch, create a new branch and it will automatically be
  pushed.
- To deploy a release, push commits to master.
