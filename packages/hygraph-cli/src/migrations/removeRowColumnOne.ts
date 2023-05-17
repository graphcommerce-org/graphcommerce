import { initClient } from '../client'

export const removeRowColumnOne = async (name: string | undefined) => {
  const client = initClient(name)

  client.deleteModel({ apiId: 'RowColumnOne' })

  return client.run(true)
}
