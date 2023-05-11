import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _toPropertyKey from "@babel/runtime/helpers/esm/toPropertyKey";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import { GRID_ROOT_GROUP_ID } from '@mui/x-data-grid';
export var getGroupRowIdFromPath = function getGroupRowIdFromPath(path) {
  var pathStr = path.map(function (groupingCriteria) {
    return "".concat(groupingCriteria.field, "/").concat(groupingCriteria.key);
  }).join('-');
  return "auto-generated-row-".concat(pathStr);
};
export var getNodePathInTree = function getNodePathInTree(_ref) {
  var id = _ref.id,
    tree = _ref.tree;
  var path = [];
  var node = tree[id];
  while (node.id !== GRID_ROOT_GROUP_ID) {
    path.push({
      field: node.groupingField,
      key: node.groupingKey
    });
    node = tree[node.parent];
  }
  return path;
};
export var addGroupDefaultExpansion = function addGroupDefaultExpansion(_ref2) {
  var node = _ref2.node,
    isGroupExpandedByDefault = _ref2.isGroupExpandedByDefault,
    defaultGroupingExpansionDepth = _ref2.defaultGroupingExpansionDepth;
  var childrenExpanded;
  if (node.id === GRID_ROOT_GROUP_ID) {
    childrenExpanded = true;
  } else if (isGroupExpandedByDefault) {
    childrenExpanded = isGroupExpandedByDefault(node);
  } else {
    childrenExpanded = defaultGroupingExpansionDepth === -1 || defaultGroupingExpansionDepth > node.depth;
  }
  return _extends({}, node, {
    childrenExpanded: childrenExpanded
  });
};

/**
 * Insert a node in the tree
 */
export var insertNodeInTree = function insertNodeInTree(_ref3) {
  var _treeDepths$node$dept;
  var node = _ref3.node,
    tree = _ref3.tree,
    treeDepths = _ref3.treeDepths;
  // 1. Insert node in the tree.
  tree[node.id] = node;

  // 2. Increment the `treeDepths` object for the node's depth.
  treeDepths[node.depth] = ((_treeDepths$node$dept = treeDepths[node.depth]) != null ? _treeDepths$node$dept : 0) + 1;

  // 3. Register the new node in its parent.
  var parentNode = tree[node.parent];
  if (node.type === 'footer') {
    // For footers,
    // Register the node from its parent `footerId` property.
    tree[node.parent] = _extends({}, parentNode, {
      footerId: node.id
    });
  } else if (node.type === 'group' || node.type === 'leaf') {
    var _groupingField, _groupingKey, _parentNode$childrenF;
    // For groups and leaves,
    // Register the node from its parents `children` and `childrenFromPath` properties.
    var groupingField = (_groupingField = node.groupingField) != null ? _groupingField : '__no_field__';
    var groupingKey = (_groupingKey = node.groupingKey) != null ? _groupingKey : '__no_key__';
    tree[node.parent] = _extends({}, parentNode, {
      childrenFromPath: _extends({}, parentNode.childrenFromPath, _defineProperty({}, groupingField, _extends({}, (_parentNode$childrenF = parentNode.childrenFromPath) == null ? void 0 : _parentNode$childrenF[groupingField], _defineProperty({}, groupingKey.toString(), node.id)))),
      children: [].concat(_toConsumableArray(parentNode.children), [node.id])
    });
  }
};

/**
 * Removes a node from the tree
 */
export var removeNodeFromTree = function removeNodeFromTree(_ref4) {
  var node = _ref4.node,
    tree = _ref4.tree,
    treeDepths = _ref4.treeDepths;
  // 1. Remove node from the tree.
  delete tree[node.id];

  // 2. Decrement the `treeDepths` object for the node's depth.
  var nodeDepth = node.depth;
  var currentNodeCount = treeDepths[nodeDepth];
  if (currentNodeCount === 1) {
    delete treeDepths[nodeDepth];
  } else {
    treeDepths[nodeDepth] = currentNodeCount - 1;
  }

  // 3. Unregister the new node in its parent.
  var parentNode = tree[node.parent];
  // For footers,
  // Unregister the node from its parent `footerId` property.
  if (node.type === 'footer') {
    tree[parentNode.id] = _extends({}, parentNode, {
      footerId: null
    });
  }
  // For groups and leaves,
  // Unregister the node from its parents `children` and `childrenFromPath` properties.
  else {
    var _groupingField2, _groupingKey2, _parentNode$childrenF2, _parentNode$childrenF3;
    var groupingField = (_groupingField2 = node.groupingField) != null ? _groupingField2 : '__no_field__';
    var groupingKey = (_groupingKey2 = node.groupingKey) != null ? _groupingKey2 : '__no_key__';
    var _ref5 = (_parentNode$childrenF2 = (_parentNode$childrenF3 = parentNode.childrenFromPath) == null ? void 0 : _parentNode$childrenF3[groupingField]) != null ? _parentNode$childrenF2 : {},
      _groupingKey$toString = groupingKey.toString(),
      childrenToRemove = _ref5[_groupingKey$toString],
      newChildrenFromPathWithField = _objectWithoutProperties(_ref5, [_groupingKey$toString].map(_toPropertyKey));

    // TODO rows v6: Can we avoid this linear complexity ?
    var children = parentNode.children.filter(function (childId) {
      return childId !== node.id;
    });
    var childrenFromPath = _extends({}, parentNode.childrenFromPath);
    if (Object.keys(newChildrenFromPathWithField).length === 0) {
      delete childrenFromPath[groupingField];
    } else {
      childrenFromPath[groupingField] = newChildrenFromPathWithField;
    }
    tree[parentNode.id] = _extends({}, parentNode, {
      children: children,
      childrenFromPath: childrenFromPath
    });
  }
};

/**
 * Updates the `id` and `isAutoGenerated` properties of a group node.
 */
export var updateGroupNodeIdAndAutoGenerated = function updateGroupNodeIdAndAutoGenerated(_ref6) {
  var node = _ref6.node,
    updatedNode = _ref6.updatedNode,
    tree = _ref6.tree,
    treeDepths = _ref6.treeDepths;
  // 1. Set the new parent for all children from the old group
  node.children.forEach(function (childId) {
    tree[childId] = _extends({}, tree[childId], {
      parent: updatedNode.id
    });
  });

  // 2. Remove the old group from the tree
  removeNodeFromTree({
    node: node,
    tree: tree,
    treeDepths: treeDepths
  });

  // 3. Add the new group in the tree
  var groupNode = _extends({}, node, updatedNode);
  insertNodeInTree({
    node: groupNode,
    tree: tree,
    treeDepths: treeDepths
  });
};
export var createUpdatedGroupsManager = function createUpdatedGroupsManager() {
  return {
    value: {},
    addAction: function addAction(groupId, action) {
      if (!this.value[groupId]) {
        this.value[groupId] = {};
      }
      this.value[groupId][action] = true;
    }
  };
};