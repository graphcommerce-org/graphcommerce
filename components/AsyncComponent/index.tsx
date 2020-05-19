import React, { useState, useEffect, PropsWithChildren, useRef } from 'react'
import dynamic, { Loader } from 'next/dynamic'

type DynamicIntersect<P> = {
  loader: Loader<P>
  skeleton: (ref: React.RefObject<any>) => React.ComponentType<P> | JSX.Element
  intersectionObserver?: IntersectionObserverInit
  debugShowSkeleton?: boolean
} & P

const AsyncComponent = <T extends {}>({
  loader,
  skeleton,
  children,
  intersectionObserver,
  debugShowSkeleton,
  ...props
}: PropsWithChildren<DynamicIntersect<T>>) => {
  const measureRef = useRef<any>(null)
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
  const DynamicComponent = dynamic(loader, { loading: LoadingComponent })
  return <DynamicComponent {...(props as any)}>{children}</DynamicComponent>
}

export default AsyncComponent
