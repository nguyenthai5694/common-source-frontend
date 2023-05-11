import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridRegisterPipeProcessor } from '@mui/x-data-grid/internals';
import { GRID_ROOT_GROUP_ID } from '@mui/x-data-grid';
export const GRID_SKELETON_ROW_ROOT_ID = 'auto-generated-skeleton-row-root';
const getSkeletonRowId = index => `${GRID_SKELETON_ROW_ROOT_ID}-${index}`;
export const useGridLazyLoaderPreProcessors = (privateApiRef, props) => {
  var _props$experimentalFe;
  const {
    lazyLoading
  } = (_props$experimentalFe = props.experimentalFeatures) != null ? _props$experimentalFe : {};
  const addSkeletonRows = React.useCallback(groupingParams => {
    const tree = _extends({}, groupingParams.tree);
    const rootGroup = tree[GRID_ROOT_GROUP_ID];
    if (!lazyLoading || props.rowsLoadingMode !== 'server' || !props.rowCount || rootGroup.children.length >= props.rowCount) {
      return groupingParams;
    }
    const rootGroupChildren = [...rootGroup.children];
    for (let i = 0; i < props.rowCount - rootGroup.children.length; i += 1) {
      const skeletonId = getSkeletonRowId(i);
      rootGroupChildren.push(skeletonId);
      const skeletonRowNode = {
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
      tree
    });
  }, [props.rowCount, props.rowsLoadingMode, lazyLoading]);
  useGridRegisterPipeProcessor(privateApiRef, 'hydrateRows', addSkeletonRows);
};