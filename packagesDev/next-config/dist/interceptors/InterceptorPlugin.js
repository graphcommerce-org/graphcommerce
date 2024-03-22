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
let interceptors;
let interceptorByDepependency;
let generating = false;
let totalGenerationTime = 0;
class InterceptorPlugin {
    config;
    regenerate;
    resolveDependency;
    constructor(config, regenerate = false) {
        this.config = config;
        this.regenerate = regenerate;
        this.resolveDependency = (0, resolveDependency_1.resolveDependency)();
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        if (regenerate)
            this.#generateInterceptors();
    }
    #generateInterceptors = async () => {
        if (generating)
            return {};
        generating = true;
        const start = Date.now();
        // console.log('Generating interceptors...')
        const [plugins, errors] = (0, findPlugins_1.findPlugins)(this.config);
        // console.log(errors)
        // const found = Date.now()
        // console.log('Found plugins in', found - start, 'ms')
        const generatedInterceptors = await (0, generateInterceptors_1.generateInterceptors)(plugins, this.resolveDependency, this.config.debug);
        // const generated = Date.now()
        // console.log('Generated interceptors in', generated - found, 'ms')
        await (0, writeInterceptors_1.writeInterceptors)(generatedInterceptors);
        // const wrote = Date.now()
        // console.log('Wrote interceptors in', wrote - generated, 'ms')
        interceptors = generatedInterceptors;
        interceptorByDepependency = Object.fromEntries(Object.values(interceptors).map((i) => [i.dependency, i]));
        totalGenerationTime += Date.now() - start;
        generating = false;
        return generatedInterceptors;
    };
    apply(compiler) {
        const logger = compiler.getInfrastructureLogger('InterceptorPlugin');
        // After the compilation has succeeded we watch all possible plugin locations.
        if (this.regenerate) {
            compiler.hooks.afterCompile.tap('InterceptorPlugin', (compilation) => {
                // console.log('generate interceptors after compile')
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const [plugins, errors] = (0, findPlugins_1.findPlugins)(this.config);
                plugins.forEach((p) => {
                    const source = this.resolveDependency(p.sourceModule);
                    if (source) {
                        const absoluteFilePath = `${path_1.default.join(process.cwd(), source.fromRoot)}.tsx`;
                        compilation.fileDependencies.add(absoluteFilePath);
                    }
                });
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                this.#generateInterceptors().then((i) => {
                    Object.entries(i).forEach(([key, { sourcePath }]) => {
                        const absoluteFilePath = path_1.default.join(process.cwd(), sourcePath);
                        compilation.fileDependencies.add(absoluteFilePath);
                    });
                });
            });
        }
        compiler.hooks.normalModuleFactory.tap('InterceptorPlugin', (nmf) => {
            nmf.hooks.beforeResolve.tap('InterceptorPlugin', (resource) => {
                const issuer = resource.contextInfo.issuer ?? '';
                const requestPath = path_1.default.relative(process.cwd(), path_1.default.resolve(resource.context, resource.request));
                if (!interceptors || !interceptorByDepependency) {
                    // console.log('interceptors not ready')
                    return;
                }
                const split = requestPath.split('/');
                const searchFor = `${split[split.length - 1]}.interceptor.tsx`;
                if (issuer.endsWith(searchFor) && interceptors[requestPath]) {
                    logger.log(`Interceptor ${issuer} is requesting the original ${requestPath}`);
                    return;
                }
                const interceptorForRequest = interceptorByDepependency[resource.request];
                if (interceptorForRequest) {
                    resource.request = `${interceptorForRequest.denormalized}.interceptor.tsx`;
                    logger.log(`Intercepting dep... ${interceptorForRequest.dependency}`, resource.request);
                }
                const interceptorForPath = interceptors[requestPath];
                if (interceptorForPath) {
                    resource.request = `${resource.request}.interceptor.tsx`;
                    logger.log(`Intercepting fromRoot... ${interceptorForPath.dependency}`, resource.request);
                }
            });
        });
    }
}
exports.InterceptorPlugin = InterceptorPlugin;
