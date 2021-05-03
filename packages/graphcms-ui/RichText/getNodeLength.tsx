import { isElementNode, isTextNode, Node } from '.'

export default function getNodeLength(node: Node): number {
  if (isElementNode(node))
    return node.children.map(getNodeLength).reduce<number>((prev, curr) => prev + curr, 0)

  if (isTextNode(node)) return node.text.length

  return 0
}
