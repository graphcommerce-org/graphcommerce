import React, { useState, useEffect, PropsWithChildren, useRef } from 'react'
import dynamic, { Loader } from 'next/dynamic'
import classes from './styles.module.css'

type MagentoDynamicProps<P> = {
  loader: Loader<P>
  skeleton?: (ref: React.RefObject<any>) => React.ComponentType<P> | JSX.Element
  intersectionObserver?: IntersectionObserverInit
  debugShowSkeleton?: boolean
} & P

const MagentoDynamic = <P extends {}>({
  loader,
  skeleton,
  children,
  intersectionObserver,
  debugShowSkeleton,
  ...props
}: PropsWithChildren<MagentoDynamicProps<P>>) => {
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

  if (!intersected) return <LoadingComponent />
  const DynamicComponent = dynamic(loader, { loading: LoadingComponent })
  const MagentoProvider = dynamic(() => import('./App'), { loading: LoadingComponent })

  return (
    <div className={classes.MagentoDynamic}>
      <MagentoProvider>
        <DynamicComponent {...(props as any)}>{children}</DynamicComponent>
      </MagentoProvider>
    </div>
  )
}

export default MagentoDynamic
