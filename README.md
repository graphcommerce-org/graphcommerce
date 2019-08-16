# Description

Demonstration on how to use some of the benefits of relay with react-apollo (or any graphql framework) by using the relay-compiler as a graphql-codegen plugin to transform/optimize queries.

Benefits:

- More optimized Queries
- Use Relay Features With Apollo
  - Fragment Arguments
  - Data Masking

# Packages [![CircleCI](https://circleci.com/gh/n1ru4l/graphql-codegen-relay-plugins/tree/master.svg?style=svg)](https://circleci.com/gh/n1ru4l/graphql-codegen-relay-plugins/tree/master)

## [`@n1ru4l/graphql-codegen-relay-optimizer-plugin`](packages/graphql-codegen-relay-optimizer-plugin)

Use the relay-compiler foro ptimizing your GraphQL Queries.

## [`todo-app-example`](packages/todo-app-example)

Example usage of the `packages/graphql-codegen-relay-optimizer-plugin` plugin.

# TODO

- [ ] Generate Fragment Types that can be used for the Components
- [x] Add todo-app from relay-examples and convert it to react-apollo
- [ ] Add support for `@relay(plural: Boolean)`
- [ ] Add support for masking (https://relay.dev/docs/en/graphql-in-relay#relaymask-boolean)
