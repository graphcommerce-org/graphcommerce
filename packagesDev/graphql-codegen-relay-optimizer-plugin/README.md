# @n1ru4l/graphql-codegen-relay-optimizer-plugin [![CircleCI](https://circleci.com/gh/n1ru4l/graphql-codegen-relay-plugins/tree/master.svg?style=svg)](https://circleci.com/gh/n1ru4l/graphql-codegen-relay-plugins/tree/master)

## Description

[GraphQL Codegen Plugin](https://github.com/dotansimha/graphql-code-generator) for bringing the benefits of Relay to GraphQL Codegen.

### Current List of Features

- [Optimize Queries](https://relay.dev/docs/en/compiler-architecture#transforms) TL;DR: reduce query size
  - Inline Fragments
  - Flatten Transform
  - Skip Redundant Node Transform
- FragmentArguments
  - [`@argumentsDefinition`](https://relay.dev/docs/en/graphql-in-relay#argumentdefinitions)
  - [`@arguments`](https://relay.dev/docs/en/graphql-in-relay#arguments)

## Install Instructions [![npm](https://img.shields.io/npm/dm/@n1ru4l/graphql-codegen-relay-optimizer-plugin.svg)](https://www.npmjs.com/package/@n1ru4l/graphql-codegen-relay-optimizer-plugin)

`yarn add -D -E @n1ru4l/graphql-codegen-relay-optimizer-plugin`

## Usage Instructions

**codegen.yml**

```yaml
overwrite: true
schema: schema.graphql
generates:
  src/generated-types.tsx:
    documents: "src/documents/**/*.graphql"
    config:
      skipDocumentsValidation: true
    plugins:
      - "@n1ru4l/graphql-codegen-relay-optimizer-plugin"
      - "typescript"
      - "typescript-operations"
      - "typescript-react-apollo"
```
