import { NextConfig } from 'next/dist/server/config-shared';
import React from 'react';
export * from './utils/isMonorepo';
export * from './utils/resolveDependenciesSync';
export * from './withGraphCommerce';
export declare function withYarn1Workspaces(packages?: string[]): (config: NextConfig) => NextConfig;
export declare function withYarn1Scopes(packages?: string[]): (config: NextConfig) => NextConfig;
export declare type Plugin<C extends React.FC<P>, P> = (Component: C) => C;
