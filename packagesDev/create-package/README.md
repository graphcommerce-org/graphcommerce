# Create Package

`yarn create-package packages/my-package`

## Updating packages

`yarn create-package "packages/*"`

## Dev

```
yarn dev
```

```
node packagesDev/create-package/dist/index.js "packages/*"
```

## Known issue

- It will add devDependencies to dependencies..
