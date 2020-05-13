import React, { useState, useEffect, PropsWithChildren } from 'react'
import dynamic, { Loader } from 'next/dynamic'

type DynamicIntersect<P> = {
  loader: Loader<P>
  skeleton: React.ComponentType<P> | JSX.Element
  measureRef: React.RefObject<HTMLElement>
  intersectionObserver?: IntersectionObserverInit
  debugShowSkeleton?: boolean
} & P

const AsyncComponent = <T extends {}>({
  loader,
  skeleton,
  children,
  measureRef,
  intersectionObserver,
  debugShowSkeleton,
  ...props
}: PropsWithChildren<DynamicIntersect<T>>) => {
  const [intersected, setIntersected] = useState<boolean>(false)

  useEffect(() => {
    if (!measureRef.current) return () => {}
    const io = new IntersectionObserver(([entry]) => {
      if (!intersected && entry.isIntersecting && !debugShowSkeleton) {
        setIntersected(entry.isIntersecting)
        if (measureRef.current) io.unobserve(measureRef.current)
      }
    }, intersectionObserver)
    io.observe(measureRef.current)
    return () => io.disconnect()
  }, [intersected, measureRef, intersectionObserver, debugShowSkeleton])

  const LoadingComponent = () => <>{skeleton}</>
  if (!intersected) return <LoadingComponent />
  const DynamicComponent = dynamic(loader, { loading: LoadingComponent })
  return <DynamicComponent {...(props as any)}>{children}</DynamicComponent>
}

export default AsyncComponent
