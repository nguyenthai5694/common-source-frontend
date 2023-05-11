"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridRowGroupingSanitizedModelSelector = exports.gridRowGroupingModelSelector = void 0;
var _xDataGridPro = require("@mui/x-data-grid-pro");
var _internals = require("@mui/x-data-grid-pro/internals");
const gridRowGroupingStateSelector = state => state.rowGrouping;
const gridRowGroupingModelSelector = (0, _internals.createSelector)(gridRowGroupingStateSelector, rowGrouping => rowGrouping.model);
exports.gridRowGroupingModelSelector = gridRowGroupingModelSelector;
const gridRowGroupingSanitizedModelSelector = (0, _internals.createSelector)(gridRowGroupingModelSelector, _xDataGridPro.gridColumnLookupSelector, (model, columnsLookup) => model.filter(field => !!columnsLookup[field] && columnsLookup[field].groupable));
exports.gridRowGroupingSanitizedModelSelector = gridRowGroupingSanitizedModelSelector;