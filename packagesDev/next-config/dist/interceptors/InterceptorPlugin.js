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
    constructor(config) {
        this.config = config;
        this.resolveDependency = (0, resolveDependency_1.resolveDependency)();
        this.interceptors = (0, generateInterceptors_1.generateInterceptors)((0, findPlugins_1.findPlugins)(this.config), this.resolveDependency);
        this.interceptorByDepependency = Object.fromEntries(Object.values(this.interceptors).map((i) => [i.dependency, i]));
        (0, writeInterceptors_1.writeInterceptors)(this.interceptors);
    }
    apply(compiler) {
        const logger = compiler.getInfrastructureLogger('InterceptorPlugin');
        // After the compilation has succeeded we watch all possible plugin locations.
        compiler.hooks.afterCompile.tap('InterceptorPlugin', (compilation) => {
            const plugins = (0, findPlugins_1.findPlugins)(this.config);
            plugins.forEach((p) => {
                const absoluteFilePath = `${path_1.default.join(process.cwd(), this.resolveDependency(p.plugin).fromRoot)}.tsx`;
                compilation.fileDependencies.add(absoluteFilePath);
            });
            this.interceptors = (0, generateInterceptors_1.generateInterceptors)(plugins, this.resolveDependency);
            this.interceptorByDepependency = Object.fromEntries(Object.values(this.interceptors).map((i) => [i.dependency, i]));
            (0, writeInterceptors_1.writeInterceptors)(this.interceptors);
        });
        compiler.hooks.normalModuleFactory.tap('InterceptorPlugin', (nmf) => {
            nmf.hooks.beforeResolve.tap('InterceptorPlugin', (resource) => {
                const issuer = resource.contextInfo.issuer ?? '';
                const requestPath = path_1.default.relative(process.cwd(), path_1.default.resolve(resource.context, resource.request));
                if (issuer.endsWith('interceptor.tsx') && this.interceptors[requestPath]) {
                    logger.log(`Interceptor ${issuer} is requesting the original ${requestPath}`);
                    return;
                }
                const interceptorForRequest = this.interceptorByDepependency[resource.request];
                if (interceptorForRequest) {
                    logger.log(`Intercepting dep... ${interceptorForRequest.dependency}`);
                    resource.request = `${interceptorForRequest.denormalized}.interceptor.tsx`;
                }
                const interceptorForPath = this.interceptors[requestPath];
                if (interceptorForPath) {
                    logger.log(`Intercepting fromRoot... ${interceptorForPath.fromRoot}`);
                    resource.request = `${resource.request}.interceptor.tsx`;
                }
            });
        });
    }
}
exports.InterceptorPlugin = InterceptorPlugin;
