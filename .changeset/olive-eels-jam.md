---
'@graphcommerce/magento-graphcms': minor
---

Use only ApolloClient when running getStaticProps/getServerSideProps and direct all traffic to /api/graphql

The reason we're not reusing the methods that are called inside /api/graphql is to reduce the startup time of the serverless functions that are responsible. The serverless bootup times are getting very high.
