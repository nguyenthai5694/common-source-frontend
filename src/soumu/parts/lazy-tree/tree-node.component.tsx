import React, { useCallback, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { TreeNodeData } from './type'

interface TreeNodeProps {
  selectingNodeId: string;

  node: TreeNodeData;

  onToggle?: (node: TreeNodeData) => void;

  onNodeSelect?: (node: TreeNodeData) => void;

  // For common lazy tree (has disable note with auth)
  hasDisableNodeWithAuth?: boolean;
  isCheckDisplayNode?: boolean;
}

const ENTER_KEYCODE = 13;

const TreeNode = (props: TreeNodeProps) => {
  const { node, onToggle, onNodeSelect, selectingNodeId, hasDisableNodeWithAuth, isCheckDisplayNode = false } = props;

  const onKeydownToggleTree = useCallback(e => {
    if (e.keyCode === ENTER_KEYCODE) {
      e.preventDefault();
      onToggle(node);
    }
  }, [onToggle, node])
  const buttonRef = useRef(null);

  // // NOTE: tree data is getting from common API/dae API.
  // // Common API has authorization meanwhile dae API don't.
  useEffect(() => {
    if (buttonRef.current && hasDisableNodeWithAuth) {
      buttonRef.current.disabled = node.enabled === undefined ? false : !node.enabled;
    }
  }, [node.enabled, hasDisableNodeWithAuth])

  function getChildNodes(r) {
    return node.children;
  }

  const getChildNodesByDisplayFlg = () => {
    const childNode = node.children.filter(item => item.displayFlg)

    return childNode;
  }

  const hasChildNodeToDisplay = isCheckDisplayNode ? (getChildNodesByDisplayFlg().length > 0 ? true : false) : true

  if (isCheckDisplayNode && !node.displayFlg) {
    return null
  }

  return (
    <li className='p-tree__item'>
      <span
        className={
          clsx('p-tree__button',
            {
              '-open': node.isOpen,
              '-no-icon -no-child-nodes': getChildNodes(node).length === 0 || !hasChildNodeToDisplay,
              '-active': node.id === selectingNodeId,
              // NOTE: tree data is getting from common API/dae API.
              // Common API has authorization meanwhile dae API don't.
              // '-disabled': node.enabled === undefined ? false : !node.enabled,
            })
        }
        onClick={() => onToggle(node)}>
        {(!!!getChildNodes(node).length) &&
          <span className='p-tree__button--ghost-tab' onKeyDown={onKeydownToggleTree} tabIndex={0} />
        }

        <button ref={buttonRef} onClick={(e) => { onNodeSelect(node); e.stopPropagation() }}>{node.label}</button>
      </span>

      {getChildNodes(node).length > 0 && hasChildNodeToDisplay && <ul className='p-tree__list'>
        {node.isOpen && getChildNodes(node).filter(e => e !== undefined).map(childNode => (
          <TreeNode
            key={childNode.id}
            {...props}
            node={childNode}
          />
        ))}
      </ul>}
    </li>
  );
}

export default TreeNode;
