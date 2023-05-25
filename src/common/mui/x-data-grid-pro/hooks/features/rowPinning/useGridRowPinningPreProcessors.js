/* eslint-disable no-mixed-operators */
/* eslint-disable max-len */
import * as React from 'react';
import { GRID_ROOT_GROUP_ID } from '@mui/x-data-grid';
import { useGridRegisterPipeProcessor } from '@mui/x-data-grid/internals';
import _extends from '@babel/runtime/helpers/esm/extends';
import { insertNodeInTree } from '../../../utils/tree/utils';

export function addPinnedRow({
  groupingParams,
  rowModel,
  rowId,
  position,
  apiRef,
  isAutoGenerated,
}) {
  var _groupingParams$addit, _groupingParams$addit2, _groupingParams$addit3, _groupingParams$addit4;
  const dataRowIdToModelLookup = _extends({}, groupingParams.dataRowIdToModelLookup);
  const dataRowIdToIdLookup = _extends({}, groupingParams.dataRowIdToIdLookup);
  const tree = _extends({}, groupingParams.tree);
  const treeDepths = _extends({}, groupingParams.treeDepths);

  // TODO: warn if id is already present in `props.rows`

  const node = {
    type: 'pinnedRow',
    id: rowId,
    depth: 0,
    parent: GRID_ROOT_GROUP_ID,
    isAutoGenerated,
  };

  insertNodeInTree({
    node,
    tree,
    treeDepths,
  });

  if (!isAutoGenerated) {
    dataRowIdToModelLookup[rowId] = rowModel;
    dataRowIdToIdLookup[rowId] = rowId;
  }
  // Do not push it to ids list so that pagination is not affected by pinned rows

  apiRef.current.caches.rows.dataRowIdToModelLookup[rowId] = _extends({}, rowModel);
  apiRef.current.caches.rows.dataRowIdToIdLookup[rowId] = rowId;
  const previousPinnedRows = ((_groupingParams$addit = groupingParams.additionalRowGroups) == null ? void 0 : _groupingParams$addit.pinnedRows) || {};
  const newPinnedRow = {
    id: rowId,
    model: rowModel,
  };

  if ((_groupingParams$addit2 = groupingParams.additionalRowGroups) != null && (_groupingParams$addit3 = _groupingParams$addit2.pinnedRows) != null && (_groupingParams$addit4 = _groupingParams$addit3[position]) != null && _groupingParams$addit4.includes(newPinnedRow)) {
    return _extends({}, groupingParams, {
      dataRowIdToModelLookup,
      dataRowIdToIdLookup,
      tree,
      treeDepths,
    });
  }

  return _extends({}, groupingParams, {
    dataRowIdToModelLookup,
    dataRowIdToIdLookup,
    tree,
    treeDepths,
    additionalRowGroups: _extends({}, groupingParams.additionalRowGroups, {
      pinnedRows: _extends({}, previousPinnedRows, {
        [position]: [...(previousPinnedRows[position] || []), newPinnedRow],
      }),
    }),
  });
}
export const useGridRowPinningPreProcessors = apiRef => {
  const addPinnedRows = React.useCallback(groupingParams => {
    var _pinnedRowsCache$topI, _pinnedRowsCache$bott, _pinnedRowsCache$bott2, _pinnedRowsCache$topI2;
    const pinnedRowsCache = apiRef.current.caches.pinnedRows || {};
    let newGroupingParams = _extends({}, groupingParams, {
      additionalRowGroups: _extends({}, groupingParams.additionalRowGroups, {
        // reset pinned rows state
        pinnedRows: {},
      }),
    });

    (_pinnedRowsCache$topI = pinnedRowsCache.topIds) == null ? void 0 : _pinnedRowsCache$topI.forEach(rowId => {
      newGroupingParams = addPinnedRow({
        groupingParams: newGroupingParams,
        rowModel: pinnedRowsCache.idLookup[rowId],
        rowId,
        position: 'top',
        apiRef,
        isAutoGenerated: false,
      });
    });
    (_pinnedRowsCache$bott = pinnedRowsCache.bottomIds) == null ? void 0 : _pinnedRowsCache$bott.forEach(rowId => {
      newGroupingParams = addPinnedRow({
        groupingParams: newGroupingParams,
        rowModel: pinnedRowsCache.idLookup[rowId],
        rowId,
        position: 'bottom',
        apiRef,
        isAutoGenerated: false,
      });
    });

    // If row with the same `id` is present both in `rows` and `pinnedRows` - remove it from the root group children
    if ((_pinnedRowsCache$bott2 = pinnedRowsCache.bottomIds) != null && _pinnedRowsCache$bott2.length || (_pinnedRowsCache$topI2 = pinnedRowsCache.topIds) != null && _pinnedRowsCache$topI2.length) {
      const shouldKeepRow = rowId => {
        if (newGroupingParams.tree[rowId] && newGroupingParams.tree[rowId].type === 'pinnedRow') {
          return false;
        }

        return true;
      };
      const rootGroupNode = newGroupingParams.tree[GRID_ROOT_GROUP_ID];

      newGroupingParams.tree[GRID_ROOT_GROUP_ID] = _extends({}, rootGroupNode, {
        children: rootGroupNode.children.filter(shouldKeepRow),
      });
      newGroupingParams.dataRowIds = newGroupingParams.dataRowIds.filter(shouldKeepRow);
    }

    return newGroupingParams;
  }, [apiRef]);

  useGridRegisterPipeProcessor(apiRef, 'hydrateRows', addPinnedRows);
};