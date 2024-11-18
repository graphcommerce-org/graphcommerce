---
'@graphcommerce/next-config': minor
'@graphcommerce/graphql-mesh': minor
---

Solves the issue `TypeError: url?.startsWith is not a function`. The generated `.mesh/index.ts` would be generated as a requirejs module while next.js expects an esm module. In the end we properly generated the mesh correctly and now there is an `import.meta.url` instead of using `require('node:url')`. To solve this we needed to solve a chain of issues:

1. The generation of the mesh is based on the version of the mesh that is imported (esm or commonjs). See [source](https://github.com/ardatan/graphql-mesh/blob/bf588d372c0078378aaa24beea2da794af7949e6/scripts/replace-import-meta-url-in-cjs.ts#L9-L10) for the lines that need to be different. This meant that we needed to change the @graphcommerce/cli package to be of type:module instead of a commonjs module.

2) To properly convert the module to an esm module we've migrated the build of the cli package to use 'pkgroll' instead of tsc, because tsc is limited in what it outputs and can't really convert classic imports to esm.

3) To load possible mesh plugins we require additional .ts files to be loaded with [tsx](https://tsx.is/). To get the tsx loader to work properly in combination with esm modules, we need at least [node 18.19.0](https://nodejs.org/en/blog/release/v18.19.0#new-nodemodule-api-register-for-module-customization-hooks-new-initialize-hook). Minimal Node version upped to 18.19.0 and add support for node 22.
