import { BuildFlags } from './buildFlags';
export type GraphCommerceConfig = {
    /** Additional packages that should be transpiled, usually this auto generated. */
    packages?: string[];
    /**
     * Build flags are used to enable/disable features during build time.
     *
     * - Build flags are only available during build time and all values are inlined in the build
     *   output. Setting these values at runtime will have no effect.
     * - Build flags allow 'three shaking' for code that is not used, allow to reduce bundle size.
     *
     * ### Configuring build flags
     *
     * In your `next.config.js` you can configure your build flags:
     *
     * ```ts
     * const withGraphCommerce = configure({ buildFlags: { advancedFilters: true })
     * ```
     *
     * ### Configuring via .env file
     *
     * You can also configure build flags via a `.env` file. This is useful for CI/CD environments.
     *
     * ```bash
     * BUILD_FLAG_ADVANCED_FILTERS = 1
     * ```
     *
     * ### Using your build flags
     *
     * ```ts
     * if (process.env.BUILD_FLAG_ADVANCED_FILTERS) {
     *   // do something
     * }
     * ```
     *
     * Next.js will replace process.env.BUILD_FLAG_ADVANCED_FILTERS with `'1'` or `undefined` at build
     * time. Trying to destructure process.env variables won't work due to the nature of webpack
     * DefinePlugin.
     *
     * #### Creating your own build flags
     *
     * To declare a new build flag 'myBuildFlag', add a new entry to the `NodeJS.ProcessEnv` interface
     * in your `types.d.ts`:
     *
     * ```ts
     * declare namespace NodeJS {
     *   export interface ProcessEnv {
     *     BUILD_FLAG_MY_BUILD_FLAG: '1' | undefined
     *   }
     * }
     * ```
     *
     * Note: Currently it is not possible to pass any other type than `'1' | undefined` to the build
     * flags. If you want to define configuration that is a configuration use NEXT_PUBLIC_.
     */
    buildFlags?: BuildFlags;
};
