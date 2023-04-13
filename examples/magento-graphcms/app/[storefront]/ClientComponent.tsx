import { useState } from 'react'
import { Button } from './Components'

export type CallServer = (toServer: string) => Promise<string>

export function ClientComponent(props: { cb: CallServer }) {
  const { cb } = props
  const [serverMsg, setServerMsg] = useState<string>()

  return (
    <>
      <Button onClick={async () => setServerMsg(await cb('Hello server'))}>Ask server</Button>
      {serverMsg && <>Server responds with: {serverMsg}</>}
    </>
  )
}
