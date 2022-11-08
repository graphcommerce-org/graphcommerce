import path from 'path'
import { Compiler } from 'webpack'
import { ResolveDependency, resolveDependency } from '../utils/resolveDependency'
import { findPlugins } from './findPlugins'
import { generateInterceptors, GenerateInterceptorsReturn } from './generateInterceptors'
import { writeInterceptors } from './writeInterceptors'

export class InterceptorPlugin {
  private interceptors: GenerateInterceptorsReturn

  private interceptorByDepependency: GenerateInterceptorsReturn

  private resolveDependency: ResolveDependency

  constructor() {
    this.resolveDependency = resolveDependency()

    this.watched = this.watchList()
    this.interceptors = generateInterceptors(findPlugins(), this.resolveDependency)
    this.interceptorByDepependency = Object.fromEntries(
      Object.values(this.interceptors).map((i) => [i.dependency, i]),
    )

    writeInterceptors(this.interceptors)
  }

  private watched: string[] = []

  watchList() {
    return [
      ...new Set(
        findPlugins()
          .map((p) => this.resolveDependency(p.plugin))
          .map((p) => p.fromRoot),
      ),
    ]
  }

  apply(compiler: Compiler): void {
    const logger = compiler.getInfrastructureLogger('InterceptorPlugin')

    // After the compilation has succeeded we watch all possible plugin locations.
    compiler.hooks.afterCompile.tap('InterceptorPlugin', (compilation) => {
      const watchList = this.watchList()
      const added = watchList.filter((d) => !this.watched.includes(d))
      const removed = this.watched.filter((d) => !watchList.includes(d))
      this.watched = watchList

      if (added.length > 0) {
        added.forEach((context) => compilation.contextDependencies.add(context))
      }
      if (removed.length > 0) {
        removed.forEach((context) => compilation.contextDependencies.delete(context))
      }
      if (added.length > 0 || removed.length > 0) {
        this.interceptors = generateInterceptors(findPlugins(), this.resolveDependency)
        this.interceptorByDepependency = Object.fromEntries(
          Object.values(this.interceptors).map((i) => [i.dependency, i]),
        )
        writeInterceptors(this.interceptors)
      }
    })

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

        const interceptorForRequest = this.interceptorByDepependency[resource.request]
        if (interceptorForRequest) {
          logger.log(`Intercepting dep... ${interceptorForRequest.dependency}`)
          resource.request = `${interceptorForRequest.denormalized}.interceptor.tsx`
        }

        const interceptorForPath = this.interceptors[requestPath]
        if (interceptorForPath) {
          logger.log(`Intercepting fromRoot... ${interceptorForPath.fromRoot}`)
          resource.request = `${resource.request}.interceptor.tsx`
        }
      })
    })
  }
}
