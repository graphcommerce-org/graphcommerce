import path from 'path'
import { Compiler } from 'webpack'
import { ResolveDependency, resolveDependency } from '../utils/resolveDependency'
import { findPlugins } from './findPlugins'
import { generateInterceptors, GenerateInterceptorsReturn } from './generateInterceptors'
import { writeInterceptors } from './writeInterceptors'

export class InterceptorPlugin {
  private interceptors: GenerateInterceptorsReturn

  private resolveDependency: ResolveDependency

  constructor() {
    this.resolveDependency = resolveDependency()
    this.interceptors = generateInterceptors(findPlugins(), this.resolveDependency)
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
