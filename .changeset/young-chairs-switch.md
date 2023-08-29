---
'@graphcommerce/graphql': patch
---

Customer related information was stored in the users local storage indefintely causing cache mismatches:

- 1. It stores a lot less by using the newly created _persistenceMapper_.
- 2. The 'createCacheReviver' would recreate the ApolloClient-cache on each navigation, it wont do that anymore.
- 3. The _persistenceMapper_ now has a hard coded blacklist of entries that aren't allowed to be stored in the local storage. In a future PR we'll make this blacklist configurable.
