import { NextConfig } from 'next/dist/server/config-shared';
import type React from 'react';
export * from './utils/isMonorepo';
export * from './utils/resolveDependenciesSync';
export * from './withGraphCommerce';
export declare function withYarn1Workspaces(packages?: string[]): (config: NextConfig) => NextConfig;
export declare function withYarn1Scopes(packages?: string[]): (config: NextConfig) => NextConfig;
export type PluginProps<P extends Record<string, unknown> = Record<string, unknown>> = P & {
    Prev: React.FC<P>;
};
