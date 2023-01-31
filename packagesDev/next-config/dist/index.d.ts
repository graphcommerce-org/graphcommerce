import type React from 'react';
export * from './utils/isMonorepo';
export * from './utils/resolveDependenciesSync';
export * from './withGraphCommerce';
export * from './config/loadConfig';
export * from './buildFlags';
export * from './generated/config';
export type PluginProps<P extends Record<string, unknown> = Record<string, unknown>> = P & {
    Prev: React.FC<P>;
};
