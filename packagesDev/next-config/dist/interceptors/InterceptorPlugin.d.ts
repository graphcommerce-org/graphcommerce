import { Compiler } from 'webpack';
export declare class InterceptorPlugin {
    private interceptors;
    private interceptorByDepependency;
    private resolveDependency;
    constructor();
    private watched;
    watchList(): string[];
    apply(compiler: Compiler): void;
}
