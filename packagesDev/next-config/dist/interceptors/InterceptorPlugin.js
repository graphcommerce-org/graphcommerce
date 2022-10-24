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
    constructor() {
        this.watched = [];
        this.resolveDependency = (0, resolveDependency_1.resolveDependency)();
        this.watched = this.watchList();
        this.interceptors = (0, generateInterceptors_1.generateInterceptors)((0, findPlugins_1.findPlugins)(), this.resolveDependency);
        (0, writeInterceptors_1.writeInterceptors)(this.interceptors);
    }
    watchList() {
        return [
            ...new Set((0, findPlugins_1.findPlugins)()
                .map((p) => this.resolveDependency(p.plugin))
                .map((p) => p.fromRoot)),
        ];
    }
    apply(compiler) {
        const logger = compiler.getInfrastructureLogger('InterceptorPlugin');
        // After the compilation has succeeded we watch all possible plugin locations.
        compiler.hooks.afterCompile.tap('InterceptorPlugin', (compilation) => {
            const watchList = this.watchList();
            const added = watchList.filter((d) => !this.watched.includes(d));
            const removed = this.watched.filter((d) => !watchList.includes(d));
            this.watched = watchList;
            if (added.length > 0) {
                added.forEach((context) => compilation.contextDependencies.add(context));
            }
            if (removed.length > 0) {
                removed.forEach((context) => compilation.contextDependencies.delete(context));
            }
            if (added.length > 0 || removed.length > 0) {
                this.interceptors = (0, generateInterceptors_1.generateInterceptors)((0, findPlugins_1.findPlugins)(), this.resolveDependency);
                (0, writeInterceptors_1.writeInterceptors)(this.interceptors);
            }
        });
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
