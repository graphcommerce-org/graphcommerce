---
'@graphcommerce/next-config': patch
---

`loadConfig` gives each worker thread its own temporary config file. Worker threads of one process have the same pid, so two threads that loaded the config at the same time wrote and removed the same file, and `yarn lingui` stopped responding.
