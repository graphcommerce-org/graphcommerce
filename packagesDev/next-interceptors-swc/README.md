# GraphCommerce SWC Interceptor Plugin

This SWC plugin is designed to replace the webpack InterceptorPlugin in
GraphCommerce, preparing for Turbopack compatibility.

## Building

```bash
cd ~/Sites/graphcommerce/packagesDev/next-interceptors-swc && cargo build --release --target wasm32-wasi && cp target/wasm32-wasi/release/next_interceptors_swc.wasm .
```

## How it Works

The plugin transforms imports to their interceptor variants when they exist. For
example:

```typescript
// Original import
import { Logo } from './Logo'
// Transformed to (if Logo.interceptor.tsx exists)
import { Logo } from './Logo.interceptor'
```

### Import Chain Example

1. `examples/magento-open-source/components/Layout/Logo.tsx`:
   ```typescript
   import { Logo as LogoBase } from '@graphcommerce/next-ui'
   ```
2. `packages/next-ui/LayoutParts/index.ts`:
   ```typescript
   export * from './Logo'
   ```
3. `packages/next-ui/LayoutParts/Logo.tsx` -> has corresponding
   `Logo.interceptor.tsx`

## Design Decisions

1. **Package vs Relative Imports**

   - Only transform relative imports (starting with `./` or `../`)
   - Never transform package imports (like `@graphcommerce/next-ui`)
   - Package imports are handled by Node.js module resolution

2. **Filesystem Checks**

   - Only check for interceptor files for relative imports
   - Check both `.ts` and `.tsx` extensions
   - Only transform if the interceptor file exists

3. **Configuration**
   - Uses `moduleSuffixes` from Next.js config
   - Default suffix is `.interceptor`
   - Validates config to ensure suffixes are provided

## Known Issues & Solutions

1. **Source File Information**

   - SWC plugin metadata may not contain source file information
   - This affects the ability to resolve relative paths correctly
   - Potential solutions: a. Pass source file info through Next.js config b. Use
     import path analysis to determine file location c. Use workspace root +
     relative path resolution

2. **Path Resolution**

   - Current approach relies on source file metadata
   - Need to implement fallback strategies when metadata is unavailable
   - Consider using workspace root as base for path resolution

3. **Debugging**
   - Added extensive logging to track file resolution
   - Log format: 🔍 for searches, ✅ for successes, ❌ for failures
   - Monitor logs for "No source file information in metadata" errors

## Future Improvements

1. **Manifest File**

   - Generate a manifest from `generateInterceptors.ts`
   - Provide a map of all valid interceptor paths
   - Could improve performance by avoiding filesystem checks

2. **Better Path Resolution**

   - Implement multiple strategies for path resolution: a. Source file metadata
     (when available) b. Workspace root + relative path c. Import path analysis
   - Fall back gracefully between strategies

3. **Performance**

   - Cache filesystem checks
   - Only check directories that might contain interceptors
   - Use manifest file for faster lookups

4. **Error Handling**
   - Better error messages for path resolution failures
   - Provide suggestions for fixing common issues
   - Add debug mode for detailed logging

## Configuration

In `next.config.js` via `withGraphCommerce`:

```typescript
experimental: {
  swcPlugins: [
    [
      '@graphcommerce/next-interceptors-swc',
      { moduleSuffixes: ['.interceptor', ''] },
    ],
  ]
}
```

## Testing

The plugin includes unit tests for:

- Configuration validation
- Import transformations
- File existence checks

## Migration from Webpack

This plugin replaces the webpack InterceptorPlugin (`InterceptorPlugin.ts`). Key
differences:

1. No access to webpack's module resolution
2. Simpler approach focusing on relative imports
3. Relies on Node.js module resolution for package imports

```

```
