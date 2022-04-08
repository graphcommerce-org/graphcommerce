import { getAdvanced } from '../../utils'

export default (node) => ({
  content: node.innerHTML,
  ...getAdvanced(node),
})
