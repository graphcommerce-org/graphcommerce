import { usePageDepth, usePageRouter } from '@reachdigital/framer-next-pages'
import { useEffect, useState } from 'react'

export default function StackDebug() {
  const pageRouter = usePageRouter()
  const depth = usePageDepth()
  const [color, setColor] = useState<string>()

  useEffect(() => {
    setColor(Math.floor(Math.random() * 16777215).toString(16))
  }, [])

  return (
    <>
      <code
        style={{
          background: `#${color}`,
          display: 'block',
          marginLeft: -60,
          padding: 20,
          paddingInlineStart: 60,
          marginBlockEnd: 20,
        }}
      >
        <strong>Color change means: This component is recreated</strong>
        <br />
        asPath: {pageRouter.asPath}
        <br />
        pathname: {pageRouter.pathname}
        <br />
        depth: {depth}
      </code>

      <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
        {Array(30)
          .fill(undefined)
          .map((_, k) => k + 1)
          .map((k) => (
            <div
              key={k}
              style={{
                writingMode: 'vertical-lr',
                height: 100,
                borderBottom: '1px solid #efefef',
                boxSizing: 'border-box',
                padding: 6,
                width: 40,
                textAlign: 'center',
                lineHeight: `28px`,
                color: '#ccc',
                background: `rgba(255,255,255,0.7)`,
                borderRight: `1px solid #efefef`,
              }}
            >
              <code>{k * 100}</code>
            </div>
          ))}
      </div>
    </>
  )
}
