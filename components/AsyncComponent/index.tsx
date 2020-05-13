import React, { useState, useEffect, PropsWithChildren } from 'react'
import dynamic, { LoaderComponent } from 'next/dynamic'

type DynamicIntersect<P> = {
  loader: () => LoaderComponent<P>
  skeleton: React.ComponentType<P> | JSX.Element
  measureRef: React.RefObject<HTMLElement>
  intersectionObserver?: IntersectionObserverInit
} & P

const AsyncComponent = <T extends {}>({
  loader,
  skeleton,
  children,
  measureRef,
  intersectionObserver,
  ...props
}: PropsWithChildren<DynamicIntersect<T>>) => {
  const [intersected, setIntersected] = useState<boolean>(false)

  useEffect(() => {
    if (!measureRef.current) return () => {}
    const io = new IntersectionObserver(([entry]) => {
      if (!intersected && entry.isIntersecting) {
        setIntersected(entry.isIntersecting)
        if (measureRef.current) io.unobserve(measureRef.current)
      }
    }, intersectionObserver)
    io.observe(measureRef.current)
    return () => io.disconnect()
  }, [intersected, measureRef, intersectionObserver])

  const LoadingComponent = () => <>{skeleton}</>
  if (!intersected) return <LoadingComponent />
  const DynamicComponent = dynamic(loader, { loading: LoadingComponent })
  return <DynamicComponent {...(props as any)}>{children}</DynamicComponent>
}

export default AsyncComponent
