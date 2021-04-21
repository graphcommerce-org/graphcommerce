# Writing GraphQL Components

## Using GraphQL Fragments

- Every GraphQL fragment has a component (Money.gql + Money.tsx)
- Fragments are as tiny as the fragment you write, they prevent you from making
  up new props. Encouraging us to reuse code.
- Queries never have a component
- Preferably fetch as much as you can in a single query, because of caching
