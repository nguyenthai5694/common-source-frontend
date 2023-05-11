"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DATA_GRID_PRO_DEFAULT_SLOTS_COMPONENTS = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _internals = require("@mui/x-data-grid/internals");
var _GridProColumnMenu = require("../components/GridProColumnMenu");
var _GridColumnHeaders = require("../components/GridColumnHeaders");
var _material = _interopRequireDefault(require("../material"));
const DATA_GRID_PRO_DEFAULT_SLOTS_COMPONENTS = (0, _extends2.default)({}, _internals.DATA_GRID_DEFAULT_SLOTS_COMPONENTS, _material.default, {
  ColumnMenu: _GridProColumnMenu.GridProColumnMenu,
  ColumnHeaders: _GridColumnHeaders.GridColumnHeaders
});
exports.DATA_GRID_PRO_DEFAULT_SLOTS_COMPONENTS = DATA_GRID_PRO_DEFAULT_SLOTS_COMPONENTS;