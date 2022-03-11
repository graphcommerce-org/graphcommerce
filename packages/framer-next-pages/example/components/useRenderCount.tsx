import { useRef } from 'react'

export function useRenderCount() {
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <input
      style={{
        borderRadius: '6px',
        padding: 0,
        border: 0,
        height: 20,
        textAlign: 'center',
        width: 20,
      }}
      readOnly
      value={String(renderCount.current)}
    />
  )
}
