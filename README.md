# Description

Demonstration on how to use some of the benefits of relay with react-apollo by using the relay-compiler as a graphql-codegen plugin to transform/optimize queries.

Benefits:

- More optimized Queries
- Use Relay Features With Apollo
  - Fragment Arguments
  - Data Masking

# Instructions

- `yarn`
- `yarn workspace todo-app-example generate:types`
- check `packages/todo-app-example/src/generated-types.tsx`

# TODO

- [ ] Generate Fragment Types that can be used for the Components
- [ ] Add todo-app from relay-examples and convert it to react-apollo
- [ ] Add support for `@relay(plural: Boolean)`
- [ ] Add support for masking (https://relay.dev/docs/en/graphql-in-relay#relaymask-boolean)
