"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterceptorPlugin = void 0;
const path_1 = __importDefault(require("path"));
const resolveDependency_1 = require("../utils/resolveDependency");
const findPlugins_1 = require("./findPlugins");
const generateInterceptors_1 = require("./generateInterceptors");
const writeInterceptors_1 = require("./writeInterceptors");
class InterceptorPlugin {
    config;
    interceptors;
    interceptorByDepependency;
    resolveDependency;
    constructor(config) {
        this.config = config;
        this.resolveDependency = (0, resolveDependency_1.resolveDependency)();
        console.log('generating plugin interceptors');
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.#generateInterceptors();
    }
    #generateInterceptors = async () => {
        const [plugins, errors] = (0, findPlugins_1.findPlugins)(this.config);
        const interceptors = await (0, generateInterceptors_1.generateInterceptors)(plugins, this.resolveDependency, this.config.debug);
        await (0, writeInterceptors_1.writeInterceptors)(interceptors);
        this.interceptors = interceptors;
        this.interceptorByDepependency = Object.fromEntries(Object.values(interceptors).map((i) => [i.dependency, i]));
    };
    apply(compiler) {
        const logger = compiler.getInfrastructureLogger('InterceptorPlugin');
        // After the compilation has succeeded we watch all possible plugin locations.
        compiler.hooks.afterCompile.tap('InterceptorPlugin', (compilation) => {
            console.log('generate interceptors after compile');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [plugins, errors] = (0, findPlugins_1.findPlugins)(this.config);
            plugins.forEach((p) => {
                const source = this.resolveDependency(p.sourceModule);
                // const target = this.resolveDependency(p.targetModule)
                if (source) {
                    const absoluteFilePath = `${path_1.default.join(process.cwd(), source.fromRoot)}.tsx`;
                    compilation.fileDependencies.add(absoluteFilePath);
                }
            });
            this.#generateInterceptors();
        });
        compiler.hooks.normalModuleFactory.tap('InterceptorPlugin', (nmf) => {
            nmf.hooks.beforeResolve.tap('InterceptorPlugin', (resource) => {
                const issuer = resource.contextInfo.issuer ?? '';
                const requestPath = path_1.default.relative(process.cwd(), path_1.default.resolve(resource.context, resource.request));
                if (!this.interceptors || !this.interceptorByDepependency) {
                    console.log('interceptors not ready');
                    return;
                }
                const split = requestPath.split('/');
                const searchFor = `${split[split.length - 1]}.interceptor.tsx`;
                if (issuer.endsWith(searchFor) && this.interceptors[requestPath]) {
                    logger.log(`Interceptor ${issuer} is requesting the original ${requestPath}`);
                    return;
                }
                const interceptorForRequest = this.interceptorByDepependency[resource.request];
                if (interceptorForRequest) {
                    resource.request = `${interceptorForRequest.denormalized}.interceptor.tsx`;
                    logger.log(`Intercepting dep... ${interceptorForRequest.dependency}`, resource.request);
                }
                const interceptorForPath = this.interceptors[requestPath];
                if (interceptorForPath) {
                    resource.request = `${resource.request}.interceptor.tsx`;
                    logger.log(`Intercepting fromRoot... ${interceptorForPath.dependency}`, resource.request);
                }
            });
        });
    }
}
exports.InterceptorPlugin = InterceptorPlugin;
