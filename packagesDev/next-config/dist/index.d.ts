import { NextConfig } from 'next/dist/server/config-shared';
export * from './utils/isMonorepo';
export * from './utils/resolveDependenciesSync';
export * from './withGraphCommerce';
export declare function withYarn1Workspaces(packages?: string[]): (config: NextConfig) => NextConfig;
export declare function withYarn1Scopes(packages?: string[]): (config: NextConfig) => NextConfig;
