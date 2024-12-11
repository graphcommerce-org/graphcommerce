import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { PageDepthDebug } from './PageDepthDebug'
import { useRenderCount } from './useRenderCount'

export function StackDebug() {
  const pageRouter = useRouter()
  const [color] = useState<string>(Math.floor(Math.random() * 16777215).toString(16))
  const renderCounter = useRenderCount()

  return (
    <>
      <code
        style={{
          display: 'block',
          // marginLeft: '-60px',
          paddingBlock: 20,
          textAlign: 'center',
        }}
      >
        uid: <span style={{ backgroundColor: `#${color}` }}>{color}</span>
        <br />
        renderCount: {renderCounter}
        <br />
        asPath: {pageRouter.asPath}
        <br />
        pathname: {pageRouter.pathname}
        <br />
        depth: <PageDepthDebug />
        {/* rendercount: {renderCounter} */}
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
                padding: '6px',
                width: 40,
                textAlign: 'center',
                lineHeight: '28px',
                color: '#ccc',
                background: 'rgba(255,255,255,0.7)',
                borderRight: '1px solid #efefef',
              }}
            >
              <code>{k * 100}</code>
            </div>
          ))}
      </div>
    </>
  )
}
