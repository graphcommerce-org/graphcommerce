/* eslint-disable @typescript-eslint/no-non-null-assertion */
import assert from 'assert'

export interface INodeWithChildren<KeyType, ValueType> {
  children: InternalNodesMap<KeyType, ValueType>
  node: ValueType
}

export type InternalNodesMap<KeyType, ValueType> = Map<
  KeyType,
  INodeWithChildren<KeyType, ValueType>
>

export class TopologicalSort<KeyType, ValueType> {
  #nodes: InternalNodesMap<KeyType, ValueType>

  #visitedNodes?: Set<INodeWithChildren<KeyType, ValueType>>

  #sortedKeysStack?: KeyType[]

  constructor(nodes: Map<KeyType, ValueType>) {
    this.#nodes = new Map()
    this.addMultipleInternalNodes(nodes)
  }

  /** @public */
  addNode(key: KeyType, node: ValueType) {
    return this.addInternalNode(key, node)
  }

  /** @public */
  addNodes(nodes: Map<KeyType, ValueType>) {
    this.addMultipleInternalNodes(nodes)
  }

  /** @public */
  addEdge(fromKey: KeyType, toKey: KeyType) {
    assert(this.#nodes.has(fromKey), `Source package with ${fromKey} key should exist`)
    assert(this.#nodes.has(toKey), `Target package with ${toKey} key should exist`)

    const sourceNode = this.#nodes.get(fromKey)
    const targetNode = this.#nodes.get(toKey)

    assert.strictEqual(
      sourceNode !== undefined,
      true,
      `Source package with key ${fromKey} doesn't exist`,
    )
    assert.strictEqual(
      targetNode !== undefined,
      true,
      `Target package with key ${toKey} doesn't exist`,
    )

    assert.strictEqual(
      sourceNode!.children.has(toKey),
      false,
      `Source package ${fromKey} already has an edge to target node ${toKey}`,
    )

    sourceNode!.children.set(toKey, targetNode!)
  }

  /** @public */
  sort(): Map<KeyType, INodeWithChildren<KeyType, ValueType>> {
    this.#visitedNodes = new Set()
    this.#sortedKeysStack = []
    const output = new Map<KeyType, INodeWithChildren<KeyType, ValueType>>()

    for (const [key] of this.#nodes) {
      this.exploreNode(key, [])
    }

    for (let i = this.#sortedKeysStack.length - 1; i >= 0; i--) {
      const node = this.#nodes.get(this.#sortedKeysStack[i])!
      output.set(this.#sortedKeysStack[i], node)
    }

    return output
  }

  private exploreNode(nodeKey: KeyType, explorePath: KeyType[]) {
    const newExplorePath = [...explorePath, nodeKey]

    // we should check circular dependencies starting from node 2
    if (explorePath.length) {
      if (explorePath.includes(nodeKey)) {
        throw Error(
          `Package ${nodeKey} forms circular dependency: ${newExplorePath
            .slice(newExplorePath.indexOf(nodeKey))
            .join(' -> ')}`,
        )
      }
    }

    const node = this.#nodes.get(nodeKey)
    if (this.#visitedNodes!.has(node!)) return

    // mark node as visited so that it and its children
    // won't be explored next time
    this.#visitedNodes!.add(node!)

    for (const [childNodeKey] of node!.children) {
      this.exploreNode(childNodeKey, newExplorePath)
    }

    this.#sortedKeysStack!.push(nodeKey)
  }

  private addInternalNode(key: KeyType, node: ValueType) {
    assert.strictEqual(this.#nodes.has(key), false, `Node ${key} already exists`)

    this.#nodes.set(key, {
      children: new Map(),
      node,
    })

    return this
  }

  private addMultipleInternalNodes(nodes: Map<KeyType, ValueType>) {
    const nodesFlat = [...nodes]

    for (let i = nodes.size - 1; i >= 0; i--) {
      const [key, node] = nodesFlat[i]
      this.addInternalNode(key, node)
    }
  }
}
