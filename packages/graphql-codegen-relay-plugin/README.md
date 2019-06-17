# @n1ru4l/graphql-codegen-relay-plugin

**This is alpha software, use it at your own risk, functionality might change!**

## Description

[GraphQL Codegen Plugin](https://github.com/dotansimha/graphql-code-generator) for bringing the benefits of relay to react-apollo.

### Current List of Features

- [Optimize Queries](https://relay.dev/docs/en/compiler-architecture#transforms)
  - Inline Fragments
  - Flatten Transform
  - Skip Redundant Node Transform
- FragmentArguments
  - [`@argumentsDefinition`](https://relay.dev/docs/en/graphql-in-relay#argumentdefinitions)
  - [`@arguments`](https://relay.dev/docs/en/graphql-in-relay#arguments)

## Install Instructions

`yarn add -D -E @n1ru4l/graphql-codegen-relay-plugin`

## Usage Instructions

**codegen.yml**

```yaml
overwrite: true
schema: schema.graphql
generates:
  src/generated-types.tsx:
    documents: "src/documents/**/*.graphql"
    config:
      withHOC: true
      withComponent: true
      withHooks: true
      withFragmentContainer: true
    plugins:
      - "typescript"
      - "@n1ru4l/graphql-codegen-relay-plugin"
      - "typescript-operations"
      - "typescript-react-apollo"
```
