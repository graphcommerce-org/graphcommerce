import path from 'path'
import { Compiler } from 'webpack'
import {
  PluginConfig,
  generateInterceptors,
  GenerateInterceptorsReturn,
  writeInterceptors,
} from './generateInterceptors'
import { ResolveDependency, resolveDependency } from './utils/resolveDependency'

export class InterceptorPlugin {
  private interceptors: GenerateInterceptorsReturn

  private resolveDependency: ResolveDependency

  constructor(plugins: PluginConfig[]) {
    this.resolveDependency = resolveDependency()
    this.interceptors = generateInterceptors(plugins, this.resolveDependency)
    writeInterceptors(this.interceptors)
  }

  apply(compiler: Compiler): void {
    const logger = compiler.getInfrastructureLogger('InterceptorPlugin')

    compiler.hooks.normalModuleFactory.tap('InterceptorPlugin', (nmf) => {
      nmf.hooks.beforeResolve.tap('InterceptorPlugin', (resource) => {
        const issuer = resource.contextInfo.issuer ?? ''

        const requestPath = path.relative(
          process.cwd(),
          path.resolve(resource.context, resource.request),
        )

        if (issuer.endsWith('interceptor.tsx') && this.interceptors[requestPath]) {
          logger.log(`Interceptor ${issuer} is requesting the original ${requestPath}`)
          return
        }

        if (this.interceptors[requestPath]) {
          logger.log(`Intercepting... ${this.interceptors[requestPath].fromRoot}}`)
          resource.request = `${resource.request}.interceptor.tsx`
        }
      })
    })
  }
}
