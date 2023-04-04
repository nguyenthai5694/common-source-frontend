import React from 'react';
import { activeNodeByPath, getNodeInfo } from './lazy-tree.helper'
import TreeNode from './tree-node.component';
import { TreeNodeData } from './type';

interface TreeProps {
  id?: string;

  data: TreeNodeData[];

  onSelect?: (arg?: any) => void;

  /**
   * @see TreeNodeData.id
   */
  defaultOpenNodeId?: string;

  lastOpenNodeId?: string;

  onToggleTree?: (node) => void;

  onGetChildrenNode: (parentNode: TreeNodeData) => void;

  setCurretNode?: (node) => void

  // For common lazy tree (has disable note with auth)
  hasDisableNodeWithAuth?: boolean;
  isCheckDisplayNode?: boolean;
}

interface TreeState {
  nodes: TreeNodeData[];
  selectingNodeId?: string;
}

export class LazyTree extends React.Component<TreeProps, TreeState> {
  constructor(props) {
    super(props);

    this.state = {
      nodes: this.props.data,
      selectingNodeId: null,
    };
  }

  componentDidMount() {
    this.setInitTreeStatus();
  }

  private setInitTreeStatus() {
    const { defaultOpenNodeId, lastOpenNodeId, setCurretNode } = this.props

    if (!defaultOpenNodeId) {
      return;
    }

    const { nodes } = this.state;

    const [activeNodePath, foundNode] = getNodeInfo(lastOpenNodeId || defaultOpenNodeId, nodes)

    activeNodeByPath(nodes, activeNodePath);
    setCurretNode && setCurretNode(foundNode)
    this.setState({ nodes }, () => {
      if (!foundNode) return;

      this.onNodeSelect(foundNode);
    });
  }

  onToggleAllNodes = (isOpen) => {
    // const { nodes } = this.state;
    // const updatedNodes = nodes.map(node => ({ ...node, isOpen }));

    // this.setState({ nodes: updatedNodes });
  }

  onToggle = (targetNode: TreeNodeData) => {
    const { nodes } = this.state;
    const [activePath, foundNode] = getNodeInfo(targetNode.id, nodes);

    activeNodeByPath(nodes, activePath);

    const { onToggleTree, onGetChildrenNode } = this.props;

    onToggleTree && onToggleTree(targetNode);

    const shouldFetchChildrenNode = foundNode.isOpen && foundNode.children.length > 0;

    shouldFetchChildrenNode && onGetChildrenNode(foundNode);

    this.setState({ nodes });
  }

  onNodeSelect = (node: TreeNodeData) => {
    // if (node.enabled !== undefined && !node.enabled) {
    //   return;
    // }

    const { onSelect } = this.props;

    this.setState({ selectingNodeId: node.id });

    requestAnimationFrame(() => {
      onSelect && onSelect(node);
    });
  }

  render() {
    return (
      <ul id={this.props.id} className='p-tree__list -root'>
        {this.state.nodes.map((node, index) => (
          <TreeNode
            selectingNodeId={this.state.selectingNodeId}
            key={node.id + index}
            node={node}
            onToggle={this.onToggle}
            onNodeSelect={this.onNodeSelect}
            hasDisableNodeWithAuth={this.props.hasDisableNodeWithAuth}
            isCheckDisplayNode={this.props.isCheckDisplayNode}
          />
        ))}
      </ul>
    )
  }
}
