import type { NextConfig } from 'next';
/**
 * GraphCommerce configuration accepts packages and buildFlags:
 *
 * ```ts
 * const withGraphCommerce = configure({
 *   buildFlags: {
 *     myBuildFlag: true,
 *   },
 * })
 * ```
 */
export declare function withGraphCommerce(config: NextConfig): NextConfig;
