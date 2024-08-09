# Graphql Gc Api

A generic GraphQL API layer for GraphCommerce.

## Goals

- Reduce the Hygraph dependency in the example/magento-hygraph to a bare minumm
  so that other examples like examples/magento-nocms and
  examples/magento-othercms can be created.

- Allow the API to be easily extended without having to map all sorts of data
  but still have all the flexibility.

- Offer a set of default components that can be used as extension points.

## GraphQL Schema

This package offers the following new queries

```graphql
extend type Query {
  page(input: GCPageInput!): Page
}

type Page {
  """
  The head of the page.
  """
  head: PageHead

  """
  When the redirect is defined the page should not be rendered and the user should be redirected to the specified URL.
  """
  redirect: PageRedirect
}
```

- [Query { page }](./schema/Query_page.graphqls)
- [Page](./schema/Page.graphqls)
- [PageHead](./schema/PageHead.graphqls)
- [PageRedirect](./schema/GCPageRedirect.graphqls)

### Creating the GraphQL schema integration

There are a few important steps to integrate with the GraphQL schema. First we
need to make your type compatible with Page. We take Hygraph as an example here.

For example we would normally execute the following query:

```graphql
query Pages {
  pagesConnection(where: { url: "page/home" }) {
    edges {
      node {
        url
      }
      head {
        title
        description
        alternate {
          rel
          href
          hreflang
        }
      }
    }
  }
}
```

And in the end we would like to have the following query working:

```graphql
query Pages {
  pagesConnection(where: { url: "page/home" }) {
    edges {
      node {
        url
      }
      # This part is the PageHead
      head {
        title
        description
        alternate {
          rel
          href
          hreflang
        }
        redirect {
          href
          permanent
        }
      }
    }
  }
}
```

### Extend your type

RENAME your type to Page.

Note: After making changines to the schema or .meshrc.yaml you always need to
run `yarn codegen` to see your changes.

If you now run `yarn codegen` you'll in the GraphiQL interface that your Page
implements `Page`. When running the query you will see an empty `head` and empty
redirect.

### Implement the `head`/`redirect` fields for your type

1. Extend the mesh configuration with a
   [plugin that references an additionalResolver](../hygraph-ui/plugins/meshConfigHygraph.ts)
2. Create the resolver in [mesh/resolvers.ts](../hygraph-ui/mesh/resolvers.ts).
3. Run `yarn codegen` to add the configuration.

Note: when developing your resolver you do not need to run yarn codegen after
every change, only when you change the schema or the mesh configuration.

You should now see the `head` and `redirect` fields populated with data in your
original query.

### Resolve the page query to your created type.

Now we want to be able to resolve this query.

```graphql
query GCPage {
  page(input: { href: "page/home" }) {
    head {
      title
      canonical {
        hreflang
        href
      }
      description
      alternate {
        hreflang
        href
      }
      robots {
        name
        content
      }
    }
    ... on Page {
      head {
        __typename
      }
      content {
        __typename
      }
    }
  }
}
```

### Resolve the page query to your own query

We define a `@resolveTo` for the page query in the mesh configuration.

So in this case we want to run the earlier pagesConnection query (as mentioned
above) when the page query is called.

The pagesConnection (sourceName) Query (sourceTypeName) should be calling
hygraph (sourceName).

We want to take the href argument (args.input.href) from the page query and pass
it to the `url` input field of the pagesConnection. (sourceArgs).

Finally when the pagesConnection has ran, we want to get the first edge and
return the node as the result. (result).

Resulting in the following code:

```graphql
extend type Query {
  page(input: GCPageInput!): Page
    @resolveTo(
      sourceName: "hygraph"
      sourceTypeName: "Query"
      sourceFieldName: "pagesConnection"
      sourceArgs: { where: { url: "{args.input.href}" } }
      result: "edges[0].node"
    )
}
```

Learn more about
[combining multiple sources](https://the-guild.dev/graphql/mesh/docs/getting-started/combine-multiple-sources)

Note: Because we change the schema, we need to run `yarn codegen` again. Note:
The resolveTo directive can doesn't really give warnings configured wrongly.

After everything is set up you should be able to run the page query and get the
data from the pagesConnection query.

## Frontend integration

## Whats next
