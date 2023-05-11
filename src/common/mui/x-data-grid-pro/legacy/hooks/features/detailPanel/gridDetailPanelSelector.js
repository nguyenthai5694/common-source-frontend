import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createSelector } from '@mui/x-data-grid/internals';
export var gridDetailPanelExpandedRowIdsSelector = function gridDetailPanelExpandedRowIdsSelector(state) {
  return state.detailPanel.expandedRowIds;
};
export var gridDetailPanelExpandedRowsContentCacheSelector = function gridDetailPanelExpandedRowsContentCacheSelector(state) {
  return state.detailPanel.contentCache;
};
export var gridDetailPanelRawHeightCacheSelector = function gridDetailPanelRawHeightCacheSelector(state) {
  return state.detailPanel.heightCache;
};

// TODO v6: Make this selector return the full object, including the autoHeight flag
export var gridDetailPanelExpandedRowsHeightCacheSelector = createSelector(gridDetailPanelRawHeightCacheSelector, function (heightCache) {
  return Object.entries(heightCache).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      id = _ref2[0],
      height = _ref2[1].height;
    acc[id] = height || 0;
    return acc;
  }, {});
});