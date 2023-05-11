import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { GRID_ROOT_GROUP_ID } from '@mui/x-data-grid';
import { buildRootGroup } from '@mui/x-data-grid/internals';
import { insertDataRowInTree } from './insertDataRowInTree';
/**
 * Transform a list of rows into a tree structure where each row references its parent and children.
 */
export var createRowTree = function createRowTree(params) {
  var dataRowIds = [];
  var tree = _defineProperty({}, GRID_ROOT_GROUP_ID, buildRootGroup());
  var treeDepths = {};
  for (var i = 0; i < params.nodes.length; i += 1) {
    var node = params.nodes[i];
    dataRowIds.push(node.id);
    insertDataRowInTree({
      tree: tree,
      id: node.id,
      path: node.path,
      onDuplicatePath: params.onDuplicatePath,
      treeDepths: treeDepths,
      isGroupExpandedByDefault: params.isGroupExpandedByDefault,
      defaultGroupingExpansionDepth: params.defaultGroupingExpansionDepth
    });
  }
  return {
    tree: tree,
    treeDepths: treeDepths,
    groupingName: params.groupingName,
    dataRowIds: dataRowIds
  };
};