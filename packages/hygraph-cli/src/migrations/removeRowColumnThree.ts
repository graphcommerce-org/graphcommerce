import { initClient } from '../client'

export const removeRowColumnThree = async (name: string | undefined) => {
  const client = initClient(name)

  client.deleteModel({ apiId: 'RowColumnThree' })

  return client.run(true)
}
