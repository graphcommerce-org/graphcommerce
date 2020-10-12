export default function DebugSpacer({
  height = 250,
  color = '#eee',
}: {
  height?: number
  color?: string
}) {
  let increment = 0
  // eslint-disable-next-line no-return-assign
  const rows = new Array(Math.ceil(height / 100)).fill(0).map(() => {
    increment += 100
    return Math.min(increment, height)
  })

  return (
    <div
      style={{
        background: `repeating-linear-gradient(-45deg, transparent, transparent 20px, ${color} 20px, ${color} 40px)`,
        boxShadow: `${color} 0px 0px 0px 3px inset`,
      }}
    >
      {rows.map((nr) => {
        return (
          <div
            style={{
              color: `rgba(0,0,0,0.3)`,
              overflow: 'hidden',
              height: nr % 100 || 100,
              borderTop: `3px solid ${color}`,
              width: '100%',
              textAlign: 'center',
              fontSize: 50,
            }}
            key={nr}
          >
            {nr} {typeof window !== 'undefined' ? window.scrollY : 0}px
          </div>
        )
      })}
    </div>
  )
}
