import { ResolveDependency, ResolveDependencyReturn } from '../utils/resolveDependency';
export declare type PluginConfig = {
    component: string;
    exported: string;
    plugin: string;
    ifEnv?: string;
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
export {};
