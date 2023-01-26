import type React from 'react';
export * from './utils/isMonorepo';
export * from './utils/resolveDependenciesSync';
export * from './configure';
export * from './configuration';
export type PluginProps<P extends Record<string, unknown> = Record<string, unknown>> = P & {
    Prev: React.FC<P>;
};
