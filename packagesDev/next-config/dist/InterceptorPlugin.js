"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterceptorPlugin = void 0;
const path_1 = __importDefault(require("path"));
const generateInterceptors_1 = require("./generateInterceptors");
const resolveDependency_1 = require("./utils/resolveDependency");
class InterceptorPlugin {
    constructor(plugins) {
        this.resolveDependency = (0, resolveDependency_1.resolveDependency)();
        this.interceptors = (0, generateInterceptors_1.generateInterceptors)(plugins, this.resolveDependency);
        (0, generateInterceptors_1.writeInterceptors)(this.interceptors);
    }
    apply(compiler) {
        const logger = compiler.getInfrastructureLogger('InterceptorPlugin');
        compiler.hooks.normalModuleFactory.tap('InterceptorPlugin', (nmf) => {
            nmf.hooks.beforeResolve.tap('InterceptorPlugin', (resource) => {
                const issuer = resource.contextInfo.issuer ?? '';
                const requestPath = path_1.default.relative(process.cwd(), path_1.default.resolve(resource.context, resource.request));
                if (issuer.endsWith('interceptor.tsx') && this.interceptors[requestPath]) {
                    logger.log(`Interceptor ${issuer} is requesting the original ${requestPath}`);
                    return;
                }
                if (this.interceptors[requestPath]) {
                    logger.log(`Intercepting... ${this.interceptors[requestPath].fromRoot}}`);
                    resource.request = `${resource.request}.interceptor.tsx`;
                }
            });
        });
    }
}
exports.InterceptorPlugin = InterceptorPlugin;
