export default function DebugSpacer({ height = 250 }: { height?: number }) {
  let increment = 0
  // eslint-disable-next-line no-return-assign
  const rows = new Array(Math.ceil(height / 100)).fill(0).map(() => {
    increment += 100
    return Math.min(increment, height)
  })

  return (
    <div
      style={{
        background: `repeating-linear-gradient(-45deg, transparent, transparent 20px, #eee 20px, #eee 40px)`,
        boxShadow: `rgb(239, 239, 239) 0px 0px 0px 3px inset`,
      }}
    >
      {rows.map((nr) => {
        return (
          <div
            style={{
              color: '#bbb',
              overflow: 'hidden',
              height: nr % 100 || 100,
              borderTop: '3px solid #efefef',
              width: '100%',
              textAlign: 'center',
            }}
            key={nr}
          >
            {nr}
          </div>
        )
      })}
    </div>
  )
}
