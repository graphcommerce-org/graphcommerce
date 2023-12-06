import { MotionValue } from 'framer-motion'
import React, { useState, useRef, useLayoutEffect, startTransition } from 'react'

function withHydrationOnDemandServerSide<P extends object>() {
  return (Component: React.ComponentType<P>) => (props: P) => (
    <section data-lazy-hydrate>
      <Component {...props} />
    </section>
  )
}

function withHydrationOnDemandClientSide<P extends object>() {
  return (Component: React.ComponentType<P>) => {
    function ComponentWithHydration(props: P & { hydrateManually?: MotionValue<boolean> }) {
      const { hydrateManually } = props
      const rootRef = useRef<HTMLElement>(null)

      const [isHydrated, setIsHydrated] = useState(hydrateManually?.get())

      useLayoutEffect(() => {
        // If we are manually hydrating, we watch that value and do not use the IntersectionObserver
        if (isHydrated || !rootRef.current) return undefined
        const wasRenderedServerSide = rootRef.current?.hasAttribute('data-lazy-hydrate')
        if (!wasRenderedServerSide) {
          setIsHydrated(true)
          return undefined
        }

        hydrateManually?.on('change', (val) => val && setIsHydrated(val))
        if (hydrateManually) return undefined

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0) {
              startTransition(() => setIsHydrated(true))
            }
          },
          { rootMargin: '190px' },
        )
        observer.observe(rootRef.current)

        return () => observer.disconnect()
      }, [hydrateManually, isHydrated])

      return !isHydrated ? (
        <section
          ref={rootRef}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: '' }}
          suppressHydrationWarning
        />
      ) : (
        <section>
          <Component {...props} />
        </section>
      )
    }

    return ComponentWithHydration
  }
}

export function lazyHydrate<P extends object>(Component: React.ComponentType<P>) {
  return typeof window !== 'undefined'
    ? withHydrationOnDemandClientSide<P>()(Component)
    : withHydrationOnDemandServerSide<P>()(Component)
}

export type LazyHydrateProps = {
  children: React.ReactNode
  /**
   * When eager is set to true, it disables all functionality and render the component regularly
   */
  eager?: boolean

  hydrateManually?: MotionValue<boolean>
}

export function LazyHydrate(props: LazyHydrateProps) {
  const { children, eager = false, hydrateManually } = props
  const LazyComponent = lazyHydrate(() => children)
  return eager ? children : <LazyComponent hydrateManually={hydrateManually} />
}
