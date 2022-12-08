import { ResolveDependency, ResolveDependencyReturn } from '../utils/resolveDependency';
export type PluginConfig = {
    component?: string;
    exported?: string;
    plugin: string;
    ifEnv?: string;
};
type Plugin = ResolveDependencyReturn & {
    components: Record<string, PluginConfig[]>;
    target: string;
    template?: string;
};
export type MaterializedPlugin = Plugin & {
    template: string;
};
export declare function generateInterceptor(plugin: Plugin): MaterializedPlugin;
export type GenerateInterceptorsReturn = Record<string, MaterializedPlugin>;
export declare function generateInterceptors(plugins: PluginConfig[], resolve: ResolveDependency): GenerateInterceptorsReturn;
export {};
