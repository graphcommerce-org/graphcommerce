import { useRef, useLayoutEffect } from 'react'

export type DangerousElementProps = {
  markup: string
}
export function DangerousElement({ markup }: DangerousElementProps) {
  const elRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const range = document.createRange()
    range.selectNode(elRef.current!)
    const documentFragment = range.createContextualFragment(markup)

    // Inject the markup, triggering a re-run!
    elRef.current!.innerHTML = ''
    elRef.current!.append(documentFragment)
  }, [markup])

  return (
    <div
      ref={elRef}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}
