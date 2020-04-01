### [3.2.1](https://github.com/ho-nl/project-reachdigital.nl/compare/v3.2.0...v3.2.1) (2020-04-01)

### Performance Improvements

- remove roboto from header, since its not used
  ([7290ffb](https://github.com/ho-nl/project-reachdigital.nl/commit/7290ffbd5c2d7c58f045ed6756626cf1ea0b117c))

## [3.2.0](https://github.com/ho-nl/project-reachdigital.nl/compare/v3.1.0...v3.2.0) (2020-04-01)

### Features

- **graphcms:** added RichText renderer for GraphCMS fields
  ([1b22331](https://github.com/ho-nl/project-reachdigital.nl/commit/1b2233183a022757f93a85be046830728863f46b))
- added Graphik font
  ([06d3bf8](https://github.com/ho-nl/project-reachdigital.nl/commit/06d3bf8ebdf81826a5e075a85bc5995d6811a2ab))

### Bug Fixes

- **graphcms:** add updated graphql schema
  ([5624b75](https://github.com/ho-nl/project-reachdigital.nl/commit/5624b75f5a21042d8e0cb1a85f4190a1372705e3))

## [3.1.0](https://github.com/ho-nl/project-reachdigital.nl/compare/v3.0.2...v3.1.0) (2020-03-31)

### Features

- **container:** new container component added based on sleep21
  ([faa8778](https://github.com/ho-nl/project-reachdigital.nl/commit/faa87785996eb61969b738d985f927903f5f89f0))
- **graphcms:** created ScrollSnapSlider for basic slider functionality
  ([b48318d](https://github.com/ho-nl/project-reachdigital.nl/commit/b48318df5ec81332fec8acac878264098ad4d2e6))
- **rowpeople:** added RowPeopleWithText
  ([92d8714](https://github.com/ho-nl/project-reachdigital.nl/commit/92d8714cd96c405538bbd9f3029abbb56fc29b87))
- added ScrollSnapSlider scale animations
  ([35a0f32](https://github.com/ho-nl/project-reachdigital.nl/commit/35a0f3201657efa41e95660a120904119cffeab7))
- **storybook:** material-ui theming support in storybook
  ([c5c018f](https://github.com/ho-nl/project-reachdigital.nl/commit/c5c018fbd5c8fe1a69ea8910d41567a8fc512dbe))

### Bug Fixes

- **container:** @material-ui/styles required as dependency
  ([89b2aa2](https://github.com/ho-nl/project-reachdigital.nl/commit/89b2aa2650d6e4b48877078fa3351cf8ecd8d068))
- **container:** optional classes property added
  ([6a11d95](https://github.com/ho-nl/project-reachdigital.nl/commit/6a11d954ad24d3c5824cdadbe83a20997a1d20c4))
- **linkinternal:** correctly render description
  ([eff070d](https://github.com/ho-nl/project-reachdigital.nl/commit/eff070d8abc9beada2157379977e8ccd57f81e82))
- **rowcompanyslider:** using container for center align
  ([1a20bfc](https://github.com/ho-nl/project-reachdigital.nl/commit/1a20bfc5d9604738462fe5fcdb2b3c2122280af7))
- **scrollsnapslider:** prev/next visible until element is fully visible
  ([ece3c5e](https://github.com/ho-nl/project-reachdigital.nl/commit/ece3c5eb948333a10bd256c0084df7b3b8147408))

### Build

- fixed some typescript types
  ([2a0d2b1](https://github.com/ho-nl/project-reachdigital.nl/commit/2a0d2b134370c9cdd4b2fc87f71c0b81f1542845))

### [3.0.2](https://github.com/ho-nl/project-reachdigital.nl/compare/v3.0.1...v3.0.2) (2020-03-27)

### Bug Fixes

- **graphcms:** fix react capitalization issues with playsinline attr
  ([607bc95](https://github.com/ho-nl/project-reachdigital.nl/commit/607bc9507a2c91453cad7363ab3e523cd7628faa))
- **storybook:** made components compatible with storybook
  ([aa5ee2f](https://github.com/ho-nl/project-reachdigital.nl/commit/aa5ee2f5b3769fa20cfc5d5e9a1739090bc6fcf6))

### [3.0.1](https://github.com/ho-nl/project-reachdigital.nl/compare/v3.0.0...v3.0.1) (2020-03-27)

### Bug Fixes

- **graphcms:** a Link already includes the anchor tag
  ([21c7b10](https://github.com/ho-nl/project-reachdigital.nl/commit/21c7b10e74420941383514d8e541a20257db47af))
- **graphcms:** moved RowHeroVideo styling to JSS instead of css modules
  ([77f0eef](https://github.com/ho-nl/project-reachdigital.nl/commit/77f0eef0a6e7718ef102a7333074201739cef136))
- **graphcms:** remove redundant \_\_typename from queries
  ([c7313ba](https://github.com/ho-nl/project-reachdigital.nl/commit/c7313ba6deb8c2d9a6e2bdf89e2d38ce00e3b36c))

## [3.0.0](https://github.com/ho-nl/project-reachdigital.nl/compare/v2.2.0...v3.0.0) (2020-03-26)

### ⚠ BREAKING CHANGES

- **graphcms:** Removed support for material/ui, reverting to CSS modules for
  now until alternative has been found.

### Features

- added stylelint to lint css files
  ([810b666](https://github.com/ho-nl/project-reachdigital.nl/commit/810b66689ffa1080ef34b9cd69f47588f33f1bf1))
- **graphcm:** added LinkInternal, LinkExternal components
  ([e0f9b83](https://github.com/ho-nl/project-reachdigital.nl/commit/e0f9b832b2366d07f2e0c5e922039b08f1472583))
- **graphcms:** css module added for RowHeroVideo
  ([c961041](https://github.com/ho-nl/project-reachdigital.nl/commit/c96104109cdf3be67040eb31ecafd5715a7ae9d9))
- **graphcms:** removed material/ui
  ([cf39903](https://github.com/ho-nl/project-reachdigital.nl/commit/cf39903e1e347dda62d6d9ce68ef33149bbf843e))

### Bug Fixes

- clearer RowHeroVideo links
  ([6d5f644](https://github.com/ho-nl/project-reachdigital.nl/commit/6d5f64409f72b1823ce4d7a25769c6925129ab11))
- **graphcms:** renamed HeroBanner to RowHeroVideo
  ([d730f60](https://github.com/ho-nl/project-reachdigital.nl/commit/d730f60b94f629170bb16f60fb385b5c7e1c78ff))

## [2.2.0](https://github.com/ho-nl/project-reachdigital.nl/compare/v2.1.0...v2.2.0) (2020-03-25)

### Features

- **graphcms:** added ContentRenderer component
  ([f4cb990](https://github.com/ho-nl/project-reachdigital.nl/commit/f4cb9906bb7f45ae71b3510666feb7e4c7288890))
- **graphcms:** migrated to next.graphcms.com
  ([a5e24a1](https://github.com/ho-nl/project-reachdigital.nl/commit/a5e24a19712e1457895cac96287aab78a872bb2a))

### Bug Fixes

- **graphcms:** fix build issue where build-storybook couldn’t be found
  ([7fdd4df](https://github.com/ho-nl/project-reachdigital.nl/commit/7fdd4dfde6d8bb33b52c1228e3b79adb9a5e7be0))
- **graphcms:** fix build, blog not yet implemented
  ([2fad799](https://github.com/ho-nl/project-reachdigital.nl/commit/2fad79943b26ab9c3ce370022fde020deec30222))
- **graphcms:** fix deploy, again
  ([05d7888](https://github.com/ho-nl/project-reachdigital.nl/commit/05d78880ebe0b42397780d4942a064ce5c9957c4))
- **graphcms:** temporarily disable build-storybook to fix build
  ([2c0bb2e](https://github.com/ho-nl/project-reachdigital.nl/commit/2c0bb2e113584f89aa59458db1da937ba797567b))

## [2.1.0](https://github.com/ho-nl/project-reachdigital.nl/compare/v2.0.1...v2.1.0) (2020-03-23)

### Features

- **semantic-release:** added better sorting of commits
  ([a7ec176](https://github.com/ho-nl/project-reachdigital.nl/commit/a7ec1769c2a623a32da42678bbd4862b23e1f1d9))

### Bug Fixes

- change name to honor namespace
  ([d9a90e5](https://github.com/ho-nl/project-reachdigital.nl/commit/d9a90e50536037b2b13e490d7fff7ae1fd649f0e))

## [2.0.1](https://github.com/ho-nl/project-reachdigital.nl/compare/v2.0.0...v2.0.1) (2020-03-23)

### Reverts

- Revert "feat(semantic-release): added support for adding notes in release
  notes"
  ([04a5626](https://github.com/ho-nl/project-reachdigital.nl/commit/04a562662db7cd34eaea4d899f45c84a8e5769d8))

# [2.0.0](https://github.com/ho-nl/project-reachdigital.nl/compare/v1.1.1...v2.0.0) (2020-03-23)

### Bug Fixes

- **seo:** simplified head tag
  ([44c6057](https://github.com/ho-nl/project-reachdigital.nl/commit/44c6057f4068e87bf7ef6c4e655a2ebdb5dbfc9f))

### Features

- **semantic-release:** added support for adding notes in release notes
  ([91b6737](https://github.com/ho-nl/project-reachdigital.nl/commit/91b67373a35ca8bffce595b607f2145b95ccb94b))

### BREAKING CHANGES

- **semantic-release:** With this new version we’re introducing the ability to
  add human written notes. Simply write `Note:` to add notes to the top of the
  document.

## [1.1.1](https://github.com/ho-nl/project-reachdigital.nl/compare/v1.1.0...v1.1.1) (2020-03-22)

### Bug Fixes

- **semantic-release:** move commitlint config to package.json
  ([030cb3a](https://github.com/ho-nl/project-reachdigital.nl/commit/030cb3ae1b473f1e1196e55d31de5cf74592cc65))
- **semantic-release:** remove canary, update package.json version
  ([edebad8](https://github.com/ho-nl/project-reachdigital.nl/commit/edebad848245281496af2d45d5a6dbfb6850378e))

# [1.1.0](https://github.com/ho-nl/project-reachdigital.nl/compare/v1.0.0...v1.1.0) (2020-03-22)

### Bug Fixes

- **semantic-release:** actually notify on release
  ([e07c6b4](https://github.com/ho-nl/project-reachdigital.nl/commit/e07c6b4462c7b3032fa993773bd634e7f2521e51))
- **semantic-release:** add SLACK_WEBHOOK to github actions
  ([f8d77a9](https://github.com/ho-nl/project-reachdigital.nl/commit/f8d77a9ddc445cf18f3046182a37c4cdce217fa1))

### Features

- **semantic-release:** added Slack notification for releases
  ([084d7d1](https://github.com/ho-nl/project-reachdigital.nl/commit/084d7d1d31f9733a5d88bfeac2f30c599b6a426d))

# 1.0.0 (2020-03-22)

### Bug Fixes

- **semantic-release:** generate changelog properly
  ([70b81cb](https://github.com/ho-nl/project-reachdigital.nl/commit/70b81cbe070601de6bcd0b565a9437a4a721331c))
- added canary as a prerelease branch for github actions
  ([aa7462b](https://github.com/ho-nl/project-reachdigital.nl/commit/aa7462b0d4ca2096286b33ba9ae5b5efd24dea28))
- run github action with yarn instead of npm
  ([77bfb7f](https://github.com/ho-nl/project-reachdigital.nl/commit/77bfb7fe8bace072d704bda6d4eb32b358131b73))

### Features

- added commitlint + semantic-release
  ([a3ac31a](https://github.com/ho-nl/project-reachdigital.nl/commit/a3ac31ae99e1e5b7001bdeef7a2bfb82c044a81b))

# [1.0.0-canary.2](https://github.com/ho-nl/project-reachdigital.nl/compare/v1.0.0-canary.1...v1.0.0-canary.2) (2020-03-22)

### Bug Fixes

- **semantic-release:** generate changelog properly
  ([70b81cb](https://github.com/ho-nl/project-reachdigital.nl/commit/70b81cbe070601de6bcd0b565a9437a4a721331c))
