/**
 * Apollo Client 4.2+ type augmentations for the GraphCommerce setup.
 *
 * - `DefaultOptions.Input.preview` declares the `preview` extension GraphCommerce stuffs into
 *   defaultOptions so it's part of the type instead of needing an `as unknown` cast at every
 *   client-construction site.
 * - `DeclareDefaultOptions.Query.errorPolicy: 'all'` opts the SSR clients into errorPolicy 'all'
 *   so partial GraphQL responses are returned alongside errors instead of throwing on every
 *   field-level error during SSG.
 * - `signatureStyle: 'classic'` keeps the pre-4.2 query result typing (`T` instead of
 *   `DeepPartial<T> | undefined`) so the codebase doesn't need an app-wide migration to handle
 *   the now-correctly-modelled partial data. This is a deliberate trade-off — TS doesn't model
 *   the runtime reality of errorPolicy 'all', but it keeps consumer code ergonomic.
 */
import '@apollo/client'

declare module '@apollo/client' {
  namespace ApolloClient {
    namespace DefaultOptions {
      interface Input {
        preview: unknown
      }
    }
    namespace DeclareDefaultOptions {
      interface Query {
        errorPolicy?: 'all'
      }
    }
  }

  interface TypeOverrides {
    signatureStyle: 'classic'
  }
}
