"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _TopologicalSort_nodes, _TopologicalSort_visitedNodes, _TopologicalSort_sortedKeysStack;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopologicalSort = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const assert_1 = __importDefault(require("assert"));
class TopologicalSort {
    constructor(nodes) {
        _TopologicalSort_nodes.set(this, void 0);
        _TopologicalSort_visitedNodes.set(this, void 0);
        _TopologicalSort_sortedKeysStack.set(this, void 0);
        __classPrivateFieldSet(this, _TopologicalSort_nodes, new Map(), "f");
        this.addMultipleInternalNodes(nodes);
    }
    addNode(key, node) {
        return this.addInternalNode(key, node);
    }
    addNodes(nodes) {
        this.addMultipleInternalNodes(nodes);
    }
    addEdge(fromKey, toKey) {
        (0, assert_1.default)(__classPrivateFieldGet(this, _TopologicalSort_nodes, "f").has(fromKey), `Source package with ${fromKey} key should exist`);
        (0, assert_1.default)(__classPrivateFieldGet(this, _TopologicalSort_nodes, "f").has(toKey), `Target package with ${toKey} key should exist`);
        const sourceNode = __classPrivateFieldGet(this, _TopologicalSort_nodes, "f").get(fromKey);
        const targetNode = __classPrivateFieldGet(this, _TopologicalSort_nodes, "f").get(toKey);
        assert_1.default.strictEqual(sourceNode !== undefined, true, `Source package with key ${fromKey} doesn't exist`);
        assert_1.default.strictEqual(targetNode !== undefined, true, `Target package with key ${toKey} doesn't exist`);
        assert_1.default.strictEqual(sourceNode.children.has(toKey), false, `Source package ${fromKey} already has an edge to target node ${toKey}`);
        sourceNode.children.set(toKey, targetNode);
    }
    sort() {
        __classPrivateFieldSet(this, _TopologicalSort_visitedNodes, new Set(), "f");
        __classPrivateFieldSet(this, _TopologicalSort_sortedKeysStack, [], "f");
        const output = new Map();
        for (const [key] of __classPrivateFieldGet(this, _TopologicalSort_nodes, "f")) {
            this.exploreNode(key, []);
        }
        for (let i = __classPrivateFieldGet(this, _TopologicalSort_sortedKeysStack, "f").length - 1; i >= 0; i--) {
            const node = __classPrivateFieldGet(this, _TopologicalSort_nodes, "f").get(__classPrivateFieldGet(this, _TopologicalSort_sortedKeysStack, "f")[i]);
            output.set(__classPrivateFieldGet(this, _TopologicalSort_sortedKeysStack, "f")[i], node);
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
        const node = __classPrivateFieldGet(this, _TopologicalSort_nodes, "f").get(nodeKey);
        if (__classPrivateFieldGet(this, _TopologicalSort_visitedNodes, "f").has(node))
            return;
        // mark node as visited so that it and its children
        // won't be explored next time
        __classPrivateFieldGet(this, _TopologicalSort_visitedNodes, "f").add(node);
        for (const [childNodeKey] of node.children) {
            this.exploreNode(childNodeKey, newExplorePath);
        }
        __classPrivateFieldGet(this, _TopologicalSort_sortedKeysStack, "f").push(nodeKey);
    }
    addInternalNode(key, node) {
        assert_1.default.strictEqual(__classPrivateFieldGet(this, _TopologicalSort_nodes, "f").has(key), false, `Node ${key} already exists`);
        __classPrivateFieldGet(this, _TopologicalSort_nodes, "f").set(key, {
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
_TopologicalSort_nodes = new WeakMap(), _TopologicalSort_visitedNodes = new WeakMap(), _TopologicalSort_sortedKeysStack = new WeakMap();
