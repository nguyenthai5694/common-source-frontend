import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridRegisterPipeProcessor } from '@mui/x-data-grid/internals';
import { GRID_ROOT_GROUP_ID } from '@mui/x-data-grid';
export var GRID_SKELETON_ROW_ROOT_ID = 'auto-generated-skeleton-row-root';
var getSkeletonRowId = function getSkeletonRowId(index) {
  return "".concat(GRID_SKELETON_ROW_ROOT_ID, "-").concat(index);
};
export var useGridLazyLoaderPreProcessors = function useGridLazyLoaderPreProcessors(privateApiRef, props) {
  var _props$experimentalFe;
  var _ref = (_props$experimentalFe = props.experimentalFeatures) != null ? _props$experimentalFe : {},
    lazyLoading = _ref.lazyLoading;
  var addSkeletonRows = React.useCallback(function (groupingParams) {
    var tree = _extends({}, groupingParams.tree);
    var rootGroup = tree[GRID_ROOT_GROUP_ID];
    if (!lazyLoading || props.rowsLoadingMode !== 'server' || !props.rowCount || rootGroup.children.length >= props.rowCount) {
      return groupingParams;
    }
    var rootGroupChildren = _toConsumableArray(rootGroup.children);
    for (var i = 0; i < props.rowCount - rootGroup.children.length; i += 1) {
      var skeletonId = getSkeletonRowId(i);
      rootGroupChildren.push(skeletonId);
      var skeletonRowNode = {
        type: 'skeletonRow',
        id: skeletonId,
        parent: GRID_ROOT_GROUP_ID,
        depth: 0
      };
      tree[skeletonId] = skeletonRowNode;
    }
    tree[GRID_ROOT_GROUP_ID] = _extends({}, rootGroup, {
      children: rootGroupChildren
    });
    return _extends({}, groupingParams, {
      tree: tree
    });
  }, [props.rowCount, props.rowsLoadingMode, lazyLoading]);
  useGridRegisterPipeProcessor(privateApiRef, 'hydrateRows', addSkeletonRows);
};