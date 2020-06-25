import React, { useState, useEffect, PropsWithChildren, useRef } from 'react'
import dynamic, { Loader } from 'next/dynamic'

type MagentoDynamicProps<P> = {
  loader: Loader<P>
  skeleton: (ref: React.RefObject<any>) => React.ComponentType<P> | JSX.Element
  intersectionObserver?: IntersectionObserverInit
  debugShowSkeleton?: boolean
} & P

const MagentoDynamic = <P extends Record<string, unknown>>({
  loader,
  skeleton,
  children,
  intersectionObserver,
  debugShowSkeleton,
  ...props
}: PropsWithChildren<MagentoDynamicProps<P>>): JSX.Element => {
  const ref = useRef<any>(null)
  const [intersected, setIntersected] = useState<boolean>(false)

  useEffect(() => {
    if (!ref.current) return () => {}
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!intersected && entry.isIntersecting && !debugShowSkeleton) {
          setIntersected(entry.isIntersecting)
          if (ref.current) io.unobserve(ref.current)
        }
      },
      { rootMargin: '50%', ...intersectionObserver },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [intersected, ref, intersectionObserver, debugShowSkeleton])

  const LoadingComponent = () => <>{skeleton ? skeleton(ref) : null}</>

  const DynamicComponent = dynamic(loader, { loading: LoadingComponent, ssr: false })
  const MagentoProvider = dynamic(() => import('./App'), { loading: LoadingComponent, ssr: false })

  return !intersected ? (
    <LoadingComponent />
  ) : (
    <MagentoProvider>
      <DynamicComponent {...(props as never)}>{children}</DynamicComponent>
    </MagentoProvider>
  )
}

export default MagentoDynamic
