---
'@graphcommerce/next-config': patch
---

`findParentPath()` returns a parent `@graphcommerce` package only when its `workspaces` contain the directory. Codegen in a checkout inside another GraphCommerce repository, such as a git worktree in `.tmp`, changes only the files of that checkout.
