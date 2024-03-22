import path from 'path'
import { Compiler } from 'webpack'
import { GraphCommerceConfig } from '../generated/config'
import { ResolveDependency, resolveDependency } from '../utils/resolveDependency'
import { findPlugins } from './findPlugins'
import { generateInterceptors, GenerateInterceptorsReturn } from './generateInterceptors'
import { writeInterceptors } from './writeInterceptors'

let interceptors: GenerateInterceptorsReturn | undefined
let interceptorByDepependency: GenerateInterceptorsReturn | undefined

let generating = false

let totalGenerationTime = 0

export class InterceptorPlugin {
  private resolveDependency: ResolveDependency

  constructor(
    private config: GraphCommerceConfig,
    private regenerate: boolean = false,
  ) {
    this.resolveDependency = resolveDependency()

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (regenerate) this.#generateInterceptors()
  }

  #generateInterceptors = async () => {
    if (generating) return {}
    generating = true
    const start = Date.now()

    // console.log('Generating interceptors...')

    const [plugins, errors] = findPlugins(this.config)

    // console.log(errors)

    // const found = Date.now()
    // console.log('Found plugins in', found - start, 'ms')

    const generatedInterceptors = await generateInterceptors(
      plugins,
      this.resolveDependency,
      this.config.debug,
    )

    // const generated = Date.now()
    // console.log('Generated interceptors in', generated - found, 'ms')

    await writeInterceptors(generatedInterceptors)

    // const wrote = Date.now()
    // console.log('Wrote interceptors in', wrote - generated, 'ms')

    interceptors = generatedInterceptors

    interceptorByDepependency = Object.fromEntries(
      Object.values(interceptors).map((i) => [i.dependency, i]),
    )

    totalGenerationTime += Date.now() - start
    generating = false

    return generatedInterceptors
  }

  apply(compiler: Compiler): void {
    const logger = compiler.getInfrastructureLogger('InterceptorPlugin')

    // After the compilation has succeeded we watch all possible plugin locations.
    if (this.regenerate) {
      compiler.hooks.afterCompile.tap('InterceptorPlugin', (compilation) => {
        // console.log('generate interceptors after compile')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [plugins, errors] = findPlugins(this.config)

        plugins.forEach((p) => {
          const source = this.resolveDependency(p.sourceModule)
          if (source) {
            const absoluteFilePath = `${path.join(process.cwd(), source.fromRoot)}.tsx`
            compilation.fileDependencies.add(absoluteFilePath)
          }
        })

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.#generateInterceptors().then((i) => {
          Object.entries(i).forEach(([key, { sourcePath }]) => {
            const absoluteFilePath = path.join(process.cwd(), sourcePath)
            compilation.fileDependencies.add(absoluteFilePath)
          })
        })
      })
    }

    compiler.hooks.normalModuleFactory.tap('InterceptorPlugin', (nmf) => {
      nmf.hooks.beforeResolve.tap('InterceptorPlugin', (resource) => {
        const issuer = resource.contextInfo.issuer ?? ''

        const requestPath = path.relative(
          process.cwd(),
          path.resolve(resource.context, resource.request),
        )

        if (!interceptors || !interceptorByDepependency) {
          // console.log('interceptors not ready')
          return
        }

        const split = requestPath.split('/')
        const searchFor = `${split[split.length - 1]}.interceptor.tsx`

        if (issuer.endsWith(searchFor) && interceptors[requestPath]) {
          logger.log(`Interceptor ${issuer} is requesting the original ${requestPath}`)
          return
        }

        const interceptorForRequest = interceptorByDepependency[resource.request]
        if (interceptorForRequest) {
          resource.request = `${interceptorForRequest.denormalized}.interceptor.tsx`
          logger.log(`Intercepting dep... ${interceptorForRequest.dependency}`, resource.request)
        }

        const interceptorForPath = interceptors[requestPath]
        if (interceptorForPath) {
          resource.request = `${resource.request}.interceptor.tsx`
          logger.log(`Intercepting fromRoot... ${interceptorForPath.dependency}`, resource.request)
        }
      })
    })
  }
}
