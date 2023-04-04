import { TreeNodeData } from './'

interface ArrayTuple<V1, V2> extends Array<V1 | V2> {
  0: V1, 1: V2,
}

export function getNodeInfo(nodeId, nodes: TreeNodeData[]): ArrayTuple<number[], TreeNodeData> {
  let openedNodePath: number[] = [];
  let found = false;
  let foundNode: TreeNodeData;

  const findParent = (nodes: TreeNodeData[], parentIndex) => {
    const findNode = nodes.find((node, index) => {
      const found = node.id === nodeId;

      if (found) {
        foundNode = node;
        openedNodePath.push(index);
      }

      return found;
    });

    if (findNode) {
      found = true;

      return;
    }

    const childNodes = nodes[parentIndex].children;

    if (childNodes.length === 0) {
      return;
    }

    for (let i = 0; i < childNodes.length; i++) {
      findParent(childNodes, i);

      if (!found) continue;

      openedNodePath.push(parentIndex)

      return;
    }
  }

  for (let i = 0; i < nodes.length; i++) {
    openedNodePath = [];
    findParent(nodes, i);

    if (found) break;
  }

  if (!found) return [[], null];

  return [openedNodePath.reverse(), foundNode];
}

export function activeNodeByPath(nodes, activeNodePath: number[]) {
  if (activeNodePath.length === 0) {
    return;
  }

  function setNodeStatus(node: TreeNodeData, indexes: number[]) {
    if (indexes.length === 0) {
      node.isOpen = !node.isOpen;

      if (!node.isOpen) closeAll(node.children);

      return;
    }

    node.isOpen = true;
    setNodeStatus(node.children[indexes.shift()], indexes);
  }

  setNodeStatus(nodes[activeNodePath.shift()], activeNodePath)
}

export function closeAll(nodes: TreeNodeData[]) {
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].isOpen = false;

    closeAll(nodes[i].children);
  }
}
