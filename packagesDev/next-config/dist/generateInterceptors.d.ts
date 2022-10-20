import { ResolveDependency, ResolveDependencyReturn } from './utils/resolveDependency';
export declare type PluginConfig = {
    component: string;
    exported: string;
    plugin: string;
};
declare type Plugin = ResolveDependencyReturn & {
    components: Record<string, PluginConfig[]>;
    target: string;
    template?: string;
};
export declare type MaterializedPlugin = Plugin & {
    template: string;
};
export declare function generateInterceptor(plugin: Plugin): MaterializedPlugin;
export declare type GenerateInterceptorsReturn = Record<string, MaterializedPlugin>;
export declare function generateInterceptors(plugins: PluginConfig[], resolve: ResolveDependency): GenerateInterceptorsReturn;
export declare function rmInterceptors(cwd?: string): string[];
export declare function writeInterceptors(interceptors: GenerateInterceptorsReturn, cwd?: string): void;
export {};
