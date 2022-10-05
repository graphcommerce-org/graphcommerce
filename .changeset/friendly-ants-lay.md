---
'@graphcommerce/graphql': patch
---

ApolloClient is not persisted to localStorage before we restore from localStorage.  
Fixes a race condition where the current cartId wasn't persisted.
