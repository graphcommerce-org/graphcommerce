---
'@graphcommerce/framer-next-pages': patch
---

Calling back multiple times in succession doens’t work on ipad and causes flashes on other devices. Replace with window.history.go(-x)
