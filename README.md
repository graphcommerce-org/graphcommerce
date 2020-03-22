# Reach Digital

# Install

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

- Dry-run `GH_TOKEN="bla" yarn semantic-release`

# Deploy

Push branch to master
