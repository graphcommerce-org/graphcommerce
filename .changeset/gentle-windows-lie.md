---
'@graphcommerce/next-ui': minor
---

Previously when the persisted selected value didn't exist in the list of ActionCard items, all items would be hidden. In this fix we set the hidden prop in the ActionCardList component, where we check if the value exists, if not, we display all items
