import { useEffect, useRef, useState } from 'react'
import { useStackRouter, useStackLevel } from '../pages/_app'

export default function StackDebug() {
  const stackRouter = useStackRouter()
  const stackLevel = useStackLevel()
  const [color, setColor] = useState<string>()

  useEffect(() => {
    setColor(Math.floor(Math.random() * 16777215).toString(16))
  }, [])

  return (
    <code
      style={{
        background: `#${color}`,
        display: 'block',
        marginLeft: -40,
        padding: 20,
        paddingLeft: 60,
      }}
    >
      <strong>Color change means: This component is recreated</strong>
      <br />
      asPath: {stackRouter.asPath}
      <br />
      pathname: {stackRouter.pathname}
      <br />
      stackLevel: {stackLevel}
    </code>
  )
}
