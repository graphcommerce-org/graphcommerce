"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopologicalSort = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const assert_1 = __importDefault(require("assert"));
class TopologicalSort {
    #nodes;
    #visitedNodes;
    #sortedKeysStack;
    constructor(nodes) {
        this.#nodes = new Map();
        this.addMultipleInternalNodes(nodes);
    }
    addNode(key, node) {
        return this.addInternalNode(key, node);
    }
    addNodes(nodes) {
        this.addMultipleInternalNodes(nodes);
    }
    addEdge(fromKey, toKey) {
        (0, assert_1.default)(this.#nodes.has(fromKey), `Source package with ${fromKey} key should exist`);
        (0, assert_1.default)(this.#nodes.has(toKey), `Target package with ${toKey} key should exist`);
        const sourceNode = this.#nodes.get(fromKey);
        const targetNode = this.#nodes.get(toKey);
        assert_1.default.strictEqual(sourceNode !== undefined, true, `Source package with key ${fromKey} doesn't exist`);
        assert_1.default.strictEqual(targetNode !== undefined, true, `Target package with key ${toKey} doesn't exist`);
        assert_1.default.strictEqual(sourceNode.children.has(toKey), false, `Source package ${fromKey} already has an edge to target node ${toKey}`);
        sourceNode.children.set(toKey, targetNode);
    }
    sort() {
        this.#visitedNodes = new Set();
        this.#sortedKeysStack = [];
        const output = new Map();
        for (const [key] of this.#nodes) {
            this.exploreNode(key, []);
        }
        for (let i = this.#sortedKeysStack.length - 1; i >= 0; i--) {
            const node = this.#nodes.get(this.#sortedKeysStack[i]);
            output.set(this.#sortedKeysStack[i], node);
        }
        return output;
    }
    exploreNode(nodeKey, explorePath) {
        const newExplorePath = [...explorePath, nodeKey];
        // we should check circular dependencies starting from node 2
        if (explorePath.length) {
            if (explorePath.includes(nodeKey)) {
                throw Error(`Package ${nodeKey} forms circular dependency: ${newExplorePath
                    .slice(newExplorePath.indexOf(nodeKey))
                    .join(' -> ')}`);
            }
        }
        const node = this.#nodes.get(nodeKey);
        if (this.#visitedNodes.has(node))
            return;
        // mark node as visited so that it and its children
        // won't be explored next time
        this.#visitedNodes.add(node);
        for (const [childNodeKey] of node.children) {
            this.exploreNode(childNodeKey, newExplorePath);
        }
        this.#sortedKeysStack.push(nodeKey);
    }
    addInternalNode(key, node) {
        assert_1.default.strictEqual(this.#nodes.has(key), false, `Node ${key} already exists`);
        this.#nodes.set(key, {
            children: new Map(),
            node,
        });
        return this;
    }
    addMultipleInternalNodes(nodes) {
        const nodesFlat = [...nodes];
        for (let i = nodes.size - 1; i >= 0; i--) {
            const [key, node] = nodesFlat[i];
            this.addInternalNode(key, node);
        }
    }
}
exports.TopologicalSort = TopologicalSort;
