---
'@graphcommerce/next-config': patch
---

When a dependency is optional or has peerDependenciesMeta set to optional, make sure it doesn't crash when it is not found when calling resolveDependenciesSync
