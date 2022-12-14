import { Compiler } from 'webpack';
export declare class InterceptorPlugin {
    private interceptors;
    private interceptorByDepependency;
    private resolveDependency;
    constructor();
    apply(compiler: Compiler): void;
}
