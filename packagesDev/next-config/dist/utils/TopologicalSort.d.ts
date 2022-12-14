export interface INodeWithChildren<KeyType, ValueType> {
    children: InternalNodesMap<KeyType, ValueType>;
    node: ValueType;
}
export type InternalNodesMap<KeyType, ValueType> = Map<KeyType, INodeWithChildren<KeyType, ValueType>>;
export declare class TopologicalSort<KeyType, ValueType> {
    #private;
    constructor(nodes: Map<KeyType, ValueType>);
    addNode(key: KeyType, node: ValueType): this;
    addNodes(nodes: Map<KeyType, ValueType>): void;
    addEdge(fromKey: KeyType, toKey: KeyType): void;
    sort(): Map<KeyType, INodeWithChildren<KeyType, ValueType>>;
    private exploreNode;
    private addInternalNode;
    private addMultipleInternalNodes;
}
