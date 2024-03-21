import path from 'path'
import { Compiler } from 'webpack'
import { GraphCommerceConfig } from '../generated/config'
import { ResolveDependency, resolveDependency } from '../utils/resolveDependency'
import { findPlugins } from './findPlugins'
import { generateInterceptors, GenerateInterceptorsReturn } from './generateInterceptors'
import { writeInterceptors } from './writeInterceptors'

export class InterceptorPlugin {
  private interceptors: GenerateInterceptorsReturn | undefined

  private interceptorByDepependency: GenerateInterceptorsReturn | undefined

  private resolveDependency: ResolveDependency

  constructor(private config: GraphCommerceConfig) {
    this.resolveDependency = resolveDependency()

    console.log('generating plugin interceptors')

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.#generateInterceptors()
  }

  #generateInterceptors = async () => {
    const [plugins, errors] = findPlugins(this.config)

    const interceptors = await generateInterceptors(
      plugins,
      this.resolveDependency,
      this.config.debug,
    )

    await writeInterceptors(interceptors)
    this.interceptors = interceptors

    this.interceptorByDepependency = Object.fromEntries(
      Object.values(interceptors).map((i) => [i.dependency, i]),
    )
  }

  apply(compiler: Compiler): void {
    const logger = compiler.getInfrastructureLogger('InterceptorPlugin')

    // After the compilation has succeeded we watch all possible plugin locations.
    compiler.hooks.afterCompile.tap('InterceptorPlugin', (compilation) => {
      console.log('generate interceptors after compile')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [plugins, errors] = findPlugins(this.config)

      plugins.forEach((p) => {
        const source = this.resolveDependency(p.sourceModule)
        // const target = this.resolveDependency(p.targetModule)
        if (source) {
          const absoluteFilePath = `${path.join(process.cwd(), source.fromRoot)}.tsx`
          compilation.fileDependencies.add(absoluteFilePath)
        }
      })

      this.#generateInterceptors()
    })

    compiler.hooks.normalModuleFactory.tap('InterceptorPlugin', (nmf) => {
      nmf.hooks.beforeResolve.tap('InterceptorPlugin', (resource) => {
        const issuer = resource.contextInfo.issuer ?? ''

        const requestPath = path.relative(
          process.cwd(),
          path.resolve(resource.context, resource.request),
        )

        if (!this.interceptors || !this.interceptorByDepependency) {
          console.log('interceptors not ready')
          return
        }

        const split = requestPath.split('/')
        const searchFor = `${split[split.length - 1]}.interceptor.tsx`

        if (issuer.endsWith(searchFor) && this.interceptors[requestPath]) {
          logger.log(`Interceptor ${issuer} is requesting the original ${requestPath}`)
          return
        }

        const interceptorForRequest = this.interceptorByDepependency[resource.request]
        if (interceptorForRequest) {
          resource.request = `${interceptorForRequest.denormalized}.interceptor.tsx`
          logger.log(`Intercepting dep... ${interceptorForRequest.dependency}`, resource.request)
        }

        const interceptorForPath = this.interceptors[requestPath]
        if (interceptorForPath) {
          resource.request = `${resource.request}.interceptor.tsx`
          logger.log(`Intercepting fromRoot... ${interceptorForPath.dependency}`, resource.request)
        }
      })
    })
  }
}
