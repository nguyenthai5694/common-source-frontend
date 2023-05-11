"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPinnedRow = addPinnedRow;
exports.useGridRowPinningPreProcessors = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _internals = require("@mui/x-data-grid/internals");
var _xDataGrid = require("@mui/x-data-grid");
var _utils = require("../../../utils/tree/utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function addPinnedRow({
  groupingParams,
  rowModel,
  rowId,
  position,
  apiRef,
  isAutoGenerated
}) {
  const dataRowIdToModelLookup = (0, _extends2.default)({}, groupingParams.dataRowIdToModelLookup);
  const dataRowIdToIdLookup = (0, _extends2.default)({}, groupingParams.dataRowIdToIdLookup);
  const tree = (0, _extends2.default)({}, groupingParams.tree);
  const treeDepths = (0, _extends2.default)({}, groupingParams.treeDepths);

  // TODO: warn if id is already present in `props.rows`

  const node = {
    type: 'pinnedRow',
    id: rowId,
    depth: 0,
    parent: _xDataGrid.GRID_ROOT_GROUP_ID,
    isAutoGenerated
  };
  (0, _utils.insertNodeInTree)({
    node,
    tree,
    treeDepths
  });
  if (!isAutoGenerated) {
    dataRowIdToModelLookup[rowId] = rowModel;
    dataRowIdToIdLookup[rowId] = rowId;
  }
  // Do not push it to ids list so that pagination is not affected by pinned rows

  apiRef.current.caches.rows.dataRowIdToModelLookup[rowId] = (0, _extends2.default)({}, rowModel);
  apiRef.current.caches.rows.dataRowIdToIdLookup[rowId] = rowId;
  const previousPinnedRows = groupingParams.additionalRowGroups?.pinnedRows || {};
  const newPinnedRow = {
    id: rowId,
    model: rowModel
  };
  if (groupingParams.additionalRowGroups?.pinnedRows?.[position]?.includes(newPinnedRow)) {
    return (0, _extends2.default)({}, groupingParams, {
      dataRowIdToModelLookup,
      dataRowIdToIdLookup,
      tree,
      treeDepths
    });
  }
  return (0, _extends2.default)({}, groupingParams, {
    dataRowIdToModelLookup,
    dataRowIdToIdLookup,
    tree,
    treeDepths,
    additionalRowGroups: (0, _extends2.default)({}, groupingParams.additionalRowGroups, {
      pinnedRows: (0, _extends2.default)({}, previousPinnedRows, {
        [position]: [...(previousPinnedRows[position] || []), newPinnedRow]
      })
    })
  });
}
const useGridRowPinningPreProcessors = apiRef => {
  const addPinnedRows = React.useCallback(groupingParams => {
    const pinnedRowsCache = apiRef.current.caches.pinnedRows || {};
    let newGroupingParams = (0, _extends2.default)({}, groupingParams, {
      additionalRowGroups: (0, _extends2.default)({}, groupingParams.additionalRowGroups, {
        // reset pinned rows state
        pinnedRows: {}
      })
    });
    pinnedRowsCache.topIds?.forEach(rowId => {
      newGroupingParams = addPinnedRow({
        groupingParams: newGroupingParams,
        rowModel: pinnedRowsCache.idLookup[rowId],
        rowId,
        position: 'top',
        apiRef,
        isAutoGenerated: false
      });
    });
    pinnedRowsCache.bottomIds?.forEach(rowId => {
      newGroupingParams = addPinnedRow({
        groupingParams: newGroupingParams,
        rowModel: pinnedRowsCache.idLookup[rowId],
        rowId,
        position: 'bottom',
        apiRef,
        isAutoGenerated: false
      });
    });

    // If row with the same `id` is present both in `rows` and `pinnedRows` - remove it from the root group children
    if (pinnedRowsCache.bottomIds?.length || pinnedRowsCache.topIds?.length) {
      const shouldKeepRow = rowId => {
        if (newGroupingParams.tree[rowId] && newGroupingParams.tree[rowId].type === 'pinnedRow') {
          return false;
        }
        return true;
      };
      const rootGroupNode = newGroupingParams.tree[_xDataGrid.GRID_ROOT_GROUP_ID];
      newGroupingParams.tree[_xDataGrid.GRID_ROOT_GROUP_ID] = (0, _extends2.default)({}, rootGroupNode, {
        children: rootGroupNode.children.filter(shouldKeepRow)
      });
      newGroupingParams.dataRowIds = newGroupingParams.dataRowIds.filter(shouldKeepRow);
    }
    return newGroupingParams;
  }, [apiRef]);
  (0, _internals.useGridRegisterPipeProcessor)(apiRef, 'hydrateRows', addPinnedRows);
};
exports.useGridRowPinningPreProcessors = useGridRowPinningPreProcessors;