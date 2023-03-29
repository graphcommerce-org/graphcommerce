import { useState, useRef, useEffect, useLayoutEffect, useCallback, startTransition } from 'react'

type WithHydrationOnDemandOptions = {
  wrapperProps?: React.ComponentProps<'div'>
  forceHydration?: boolean
}

function withHydrationOnDemandServerSide<P extends object>(options: WithHydrationOnDemandOptions) {
  const { wrapperProps } = options
  return (Component: React.ComponentType<P>) => (props: P) =>
    (
      <section data-hydration-on-demand {...wrapperProps}>
        <Component {...props} />
      </section>
    )
}

function withHydrationOnDemandClientSide<P extends object>(incoming: WithHydrationOnDemandOptions) {
  const { wrapperProps, forceHydration = false } = incoming

  return (Component: React.ComponentType<P>) => {
    function ComponentWithHydration(props: P & { forceHydration?: boolean }) {
      const rootRef = useRef<HTMLElement>(null)

      const isInputPending = () => {
        // @ts-expect-error navigator.scheduling is not defined in the types
        const isPending = navigator?.scheduling?.isInputPending?.()
        return isPending ?? true
      }

      const getDefaultHydrationState = () => {
        const isNotInputPending = false && !isInputPending()
        return isNotInputPending || forceHydration
      }

      const [isHydrated, setIsHydrated] = useState(getDefaultHydrationState())

      const hydrate = useCallback(() => {
        startTransition(() => setIsHydrated(true))
      }, [])

      useLayoutEffect(() => {
        if (isHydrated) return

        if (forceHydration) {
          hydrate()
          return
        }

        const wasRenderedServerSide = !!rootRef.current?.getAttribute('data-hydration-on-demand')
        const shouldHydrate = !wasRenderedServerSide && !false

        if (shouldHydrate) hydrate()
      }, [forceHydration])

      useEffect(() => {
        if (isHydrated || !rootRef.current) return undefined

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0) return hydrate()
          },
          { rootMargin: '200px' },
        )

        observer.observe(rootRef.current)
        return () => observer.disconnect()
      }, [hydrate, isHydrated])

      return !isHydrated ? (
        <section
          ref={rootRef}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: '' }}
          suppressHydrationWarning
          {...wrapperProps}
        />
      ) : (
        <section {...wrapperProps}>
          <Component {...props} />
        </section>
      )
    }

    if (process.env.NODE_ENV !== 'production') {
      ComponentWithHydration.displayName = `withHydrationOnDemand(${
        Component.displayName ?? Component.name ?? 'Component'
      })`
    }

    return ComponentWithHydration
  }
}

export function lazyHydrate<P extends object>(Component: React.ComponentType<P>) {
  return typeof window !== 'undefined'
    ? withHydrationOnDemandClientSide<P>({})(Component)
    : withHydrationOnDemandServerSide<P>({})(Component)
}
