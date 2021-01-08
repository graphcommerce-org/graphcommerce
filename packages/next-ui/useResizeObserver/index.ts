import {
  useEffect,
  useState,
  useRef,
  useMemo,
  RefObject,
  RefCallback,
  useCallback,
  MutableRefObject,
} from 'react'

type SubscriberCleanup = () => void
type SubscriberResponse = SubscriberCleanup | void

// This of course could've been more streamlined with internal state instead of
// refs, but then host hooks / components could not opt out of renders.
// This could've been exported to its own module, but the current build doesn't
// seem to work with module imports and I had no more time to spend on this...
function useResolvedElement<T extends HTMLElement>(
  subscriber: (element: T) => SubscriberResponse,
  refOrElement?: T | MutableRefObject<T>,
): RefCallback<T> {
  // The default ref has to be non-conditionally declared here whether or not
  // it'll be used as that's how hooks work.
  // @see https://reactjs.org/docs/hooks-rules.html#explanation
  let ref: MutableRefObject<T> | undefined // Default ref
  const refElement = useRef<T>()
  const callbackRefElement = useRef<T>()
  const lastReportedElementRef = useRef<T>()
  const cleanupRef = useRef<SubscriberResponse | null>()

  const callSubscriber = useCallback(() => {
    let element: T | undefined
    if (callbackRefElement.current) {
      element = callbackRefElement.current
    } else if (refElement.current) {
      element = refElement.current
    } else if (refOrElement instanceof HTMLElement) {
      element = refOrElement
    }

    if (lastReportedElementRef.current === element) {
      return
    }

    if (cleanupRef.current) {
      cleanupRef.current()
      // Making sure the cleanup is not called accidentally multiple times.
      cleanupRef.current = null
    }
    lastReportedElementRef.current = element

    // Only calling the subscriber, if there's an actual element to report.
    if (element) {
      cleanupRef.current = subscriber(element)
    }
  }, [refOrElement, subscriber])

  const refCallback = useCallback(
    (element: T) => {
      callbackRefElement.current = element
      callSubscriber()
    },
    [callSubscriber],
  )

  if (refOrElement && !(refOrElement instanceof HTMLElement)) {
    // Overriding the default ref with the given one
    ref = refOrElement
  }

  // On each render, we check whether a ref changed, or if we got a new raw
  // element.
  useEffect(() => {
    // Note that this does not mean that "element" will necessarily be whatever
    // the ref currently holds. It'll simply "update" `element` each render to
    // the current ref value, but there's no guarantee that the ref value will
    // not change later without a render.
    // This may or may not be a problem depending on the specific use case.
    if (ref) {
      refElement.current = ref.current
    }
    callSubscriber()
  }, [callSubscriber, ref, refOrElement])

  return refCallback
}

type ResizeHandler = (size: ResizeObserverEntry) => void

type HookResponse<T extends HTMLElement> = {
  ref: RefCallback<T>
} & Partial<Omit<ResizeObserverEntry, 'target'>>

export default function useResizeObserver<T extends HTMLElement>(
  opts: {
    ref?: MutableRefObject<T> | T | undefined
    onResize?: ResizeHandler
  } = {},
): HookResponse<T> {
  // Saving the callback as a ref. With this, I don't need to put onResize in the
  // effect dep array, and just passing in an anonymous function without memoising
  // will not reinstantiate the hook's ResizeObserver
  const { onResize } = opts
  const onResizeRef = useRef<ResizeHandler>()
  onResizeRef.current = onResize

  // Using a single instance throughout the hook's lifetime
  const resizeObserverRef = useRef<ResizeObserver>()

  const [size, setSize] = useState<Omit<ResizeObserverEntry, 'target'>>()

  // In certain edge cases the RO might want to report a size change just after
  // the component unmounted.
  const didUnmount = useRef(false)
  useEffect(
    () => () => {
      didUnmount.current = true
    },
    [],
  )

  // Using a ref to track the previous width / height to avoid unnecessary renders
  const previous = useRef<Omit<ResizeObserverEntry, 'target'>>()

  // This block is kinda like a useEffect, only it's called whenever a new
  // element could be resolved based on the ref option. It also has a cleanup
  // function.
  const refCallback = useResolvedElement<T>((element) => {
    // Initialising the RO instance
    if (!resizeObserverRef.current) {
      // Saving a single instance, used by the hook from this point on.
      resizeObserverRef.current = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) {
          return
        }

        // Since we only observe the one element, we don't need to loop over the
        // array
        if (!entries.length) {
          return
        }

        const entry = entries[0]

        // `Math.round` is in line with how CSS resolves sub-pixel values
        const newWidth = Math.round(entry.contentRect.width)
        const newHeight = Math.round(entry.contentRect.height)

        // if (previous.current.width !== newWidth || previous.current.height !== newHeight) {
        // const newSize = { width: newWidth, height: newHeight }
        // if (onResizeRef.current) {
        // onResizeRef.current(newSize)
        // } else {
        // previous.current.width = newWidth
        // previous.current.height = newHeight
        if (!didUnmount.current) {
          console.log(entry)
          setSize(entry)
        }
        // }
        // }
      })
    }

    console.log('hiii', element)
    resizeObserverRef.current.observe(element)

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.unobserve(element)
      }
    }
  }, opts.ref)

  return useMemo(() => ({ ...size, ref: refCallback }), [refCallback, size])
}
