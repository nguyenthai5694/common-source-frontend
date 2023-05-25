import { gridColumnLookupSelector } from 'common/mui/x-data-grid-pro';
import { createSelector } from 'common/mui/x-data-grid-pro/internals';
var gridRowGroupingStateSelector = function gridRowGroupingStateSelector(state) {
  return state.rowGrouping;
};
export var gridRowGroupingModelSelector = createSelector(gridRowGroupingStateSelector, function (rowGrouping) {
  return rowGrouping.model;
});
export var gridRowGroupingSanitizedModelSelector = createSelector(gridRowGroupingModelSelector, gridColumnLookupSelector, function (model, columnsLookup) {
  return model.filter(function (field) {
    return !!columnsLookup[field] && columnsLookup[field].groupable;
  });
});