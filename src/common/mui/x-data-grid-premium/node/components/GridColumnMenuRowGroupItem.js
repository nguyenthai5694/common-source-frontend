"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnMenuRowGroupItem = GridColumnMenuRowGroupItem;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _ListItemIcon = _interopRequireDefault(require("@mui/material/ListItemIcon"));
var _ListItemText = _interopRequireDefault(require("@mui/material/ListItemText"));
var _xDataGridPro = require("@mui/x-data-grid-pro");
var _useGridApiContext = require("../hooks/utils/useGridApiContext");
var _gridRowGroupingSelector = require("../hooks/features/rowGrouping/gridRowGroupingSelector");
var _gridRowGroupingUtils = require("../hooks/features/rowGrouping/gridRowGroupingUtils");
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function GridColumnMenuRowGroupItem(props) {
  const {
    colDef,
    onClick
  } = props;
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rowGroupingModel = (0, _xDataGridPro.useGridSelector)(apiRef, _gridRowGroupingSelector.gridRowGroupingSanitizedModelSelector);
  const columnsLookup = (0, _xDataGridPro.useGridSelector)(apiRef, _xDataGridPro.gridColumnLookupSelector);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const renderUnGroupingMenuItem = field => {
    const ungroupColumn = event => {
      apiRef.current.removeRowGroupingCriteria(field);
      onClick(event);
    };
    const name = columnsLookup[field].headerName ?? field;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MenuItem.default, {
      onClick: ungroupColumn,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.columnMenuUngroupIcon, {
          fontSize: "small"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemText.default, {
        children: apiRef.current.getLocaleText('unGroupColumn')(name)
      })]
    }, field);
  };
  if (!colDef || !(0, _gridRowGroupingUtils.isGroupingColumn)(colDef.field)) {
    return null;
  }
  if (colDef.field === _gridRowGroupingUtils.GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(React.Fragment, {
      children: rowGroupingModel.map(renderUnGroupingMenuItem)
    });
  }
  return renderUnGroupingMenuItem((0, _gridRowGroupingUtils.getRowGroupingCriteriaFromGroupingField)(colDef.field));
}
process.env.NODE_ENV !== "production" ? GridColumnMenuRowGroupItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: _propTypes.default.object.isRequired,
  onClick: _propTypes.default.func.isRequired
} : void 0;