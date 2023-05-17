import { initClient } from '../client'

export const removeRowColumnTwo = async (name: string | undefined) => {
  const client = initClient(name)

  client.deleteModel({ apiId: 'RowColumnTwo' })

  return client.run(true)
}
