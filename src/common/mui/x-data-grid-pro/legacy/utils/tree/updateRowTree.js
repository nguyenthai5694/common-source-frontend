import _extends from "@babel/runtime/helpers/esm/extends";
import { GRID_ROOT_GROUP_ID } from '@mui/x-data-grid';
import { isDeepEqual, getTreeNodeDescendants } from '@mui/x-data-grid/internals';
import { insertDataRowInTree } from './insertDataRowInTree';
import { removeDataRowFromTree } from './removeDataRowFromTree';
import { createUpdatedGroupsManager, getNodePathInTree } from './utils';
export var updateRowTree = function updateRowTree(params) {
  var tree = _extends({}, params.previousTree);
  var treeDepths = _extends({}, params.previousTreeDepth);
  var updatedGroupsManager = createUpdatedGroupsManager();
  for (var i = 0; i < params.nodes.inserted.length; i += 1) {
    var _params$nodes$inserte = params.nodes.inserted[i],
      id = _params$nodes$inserte.id,
      path = _params$nodes$inserte.path;
    insertDataRowInTree({
      tree: tree,
      treeDepths: treeDepths,
      updatedGroupsManager: updatedGroupsManager,
      id: id,
      path: path,
      onDuplicatePath: params.onDuplicatePath,
      isGroupExpandedByDefault: params.isGroupExpandedByDefault,
      defaultGroupingExpansionDepth: params.defaultGroupingExpansionDepth
    });
  }
  for (var _i = 0; _i < params.nodes.removed.length; _i += 1) {
    var nodeId = params.nodes.removed[_i];
    removeDataRowFromTree({
      tree: tree,
      treeDepths: treeDepths,
      updatedGroupsManager: updatedGroupsManager,
      id: nodeId
    });
  }
  for (var _i2 = 0; _i2 < params.nodes.modified.length; _i2 += 1) {
    var _params$nodes$modifie = params.nodes.modified[_i2],
      _id = _params$nodes$modifie.id,
      _path = _params$nodes$modifie.path;
    var pathInPreviousTree = getNodePathInTree({
      tree: tree,
      id: _id
    });
    var isInSameGroup = isDeepEqual(pathInPreviousTree, _path);
    if (!isInSameGroup) {
      removeDataRowFromTree({
        tree: tree,
        treeDepths: treeDepths,
        updatedGroupsManager: updatedGroupsManager,
        id: _id
      });
      insertDataRowInTree({
        tree: tree,
        treeDepths: treeDepths,
        updatedGroupsManager: updatedGroupsManager,
        id: _id,
        path: _path,
        onDuplicatePath: params.onDuplicatePath,
        isGroupExpandedByDefault: params.isGroupExpandedByDefault,
        defaultGroupingExpansionDepth: params.defaultGroupingExpansionDepth
      });
    } else {
      updatedGroupsManager == null ? void 0 : updatedGroupsManager.addAction(tree[_id].parent, 'modifyChildren');
    }
  }

  // TODO rows v6: Avoid walking the whole tree, we should be able to generate the new list only using slices.
  var dataRowIds = getTreeNodeDescendants(tree, GRID_ROOT_GROUP_ID, true);
  return {
    tree: tree,
    treeDepths: treeDepths,
    groupingName: params.groupingName,
    dataRowIds: dataRowIds,
    updatedGroupsManager: updatedGroupsManager
  };
};