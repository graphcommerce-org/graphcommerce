import { useEffect, useRef, useState } from 'react'

export default function Timer(props: any) {
  const { maxSeconds, maxMilliseconds, reset } = props
  const [seconds, setSeconds] = useState(0)
  const [milliseconds, setMilliseconds] = useState(0)

  useEffect(() => {
    if (reset > 0) {
      const myInterval = setInterval(() => {
        setMilliseconds(+milliseconds + 1)

        if (milliseconds > 100) {
          setSeconds(seconds + 1)
          setMilliseconds(0)
        }
      }, 10)
      if (seconds === maxSeconds) {
        if (milliseconds === maxMilliseconds) {
          clearInterval(myInterval)
        }
      }
      return () => {
        clearInterval(myInterval)
      }
    }
  })

  return (
    <div>
      <span>
        {('00' + `${seconds}`).slice(-2)}:{('00' + `${milliseconds}`).slice(-2)}
      </span>
    </div>
  )
}
