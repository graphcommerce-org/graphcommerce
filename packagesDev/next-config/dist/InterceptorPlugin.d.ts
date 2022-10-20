import { Compiler } from 'webpack';
import { PluginConfig } from './generateInterceptors';
export declare class InterceptorPlugin {
    private interceptors;
    private resolveDependency;
    constructor(plugins: PluginConfig[]);
    apply(compiler: Compiler): void;
}
