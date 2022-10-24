import { Compiler } from 'webpack';
export declare class InterceptorPlugin {
    private interceptors;
    private resolveDependency;
    constructor();
    private watched;
    watchList(): string[];
    apply(compiler: Compiler): void;
}
