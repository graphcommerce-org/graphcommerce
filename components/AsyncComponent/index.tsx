import dynamic, { Loader } from 'next/dynamic'
import React, { useState, useEffect, PropsWithChildren, useRef } from 'react'

type DynamicIntersect<P> = {
  loader: Loader<P>
  skeleton: (ref: React.RefObject<Record<string, unknown>>) => React.ComponentType<P> | JSX.Element
  intersectionObserver?: IntersectionObserverInit
  debugShowSkeleton?: boolean
} & P

const AsyncComponent = <T extends Record<string, unknown>>({
  loader,
  skeleton,
  children,
  intersectionObserver,
  debugShowSkeleton,
  ...props
}: PropsWithChildren<DynamicIntersect<T>>) => {
  const measureRef = useRef<HTMLElement>(null)
  const [intersected, setIntersected] = useState<boolean>(false)

  useEffect(() => {
    if (!measureRef.current) return () => {}
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!intersected && entry.isIntersecting && !debugShowSkeleton) {
          setIntersected(entry.isIntersecting)
          if (measureRef.current) io.unobserve(measureRef.current)
        }
      },
      { rootMargin: '50%', ...intersectionObserver },
    )
    io.observe(measureRef.current)
    return () => io.disconnect()
  }, [intersected, measureRef, intersectionObserver, debugShowSkeleton])

  const LoadingComponent = () => <>{skeleton(measureRef)}</>
  if (!intersected) return <LoadingComponent />
  const DynamicComponent = dynamic<Record<string, unknown>>(loader, { loading: LoadingComponent })
  return <DynamicComponent {...(props as Record<string, unknown>)}>{children}</DynamicComponent>
}

export default AsyncComponent
