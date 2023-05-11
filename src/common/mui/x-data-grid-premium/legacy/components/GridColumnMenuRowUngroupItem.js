import * as React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { gridColumnLookupSelector, useGridSelector } from '@mui/x-data-grid-pro';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { gridRowGroupingSanitizedModelSelector } from '../hooks/features/rowGrouping/gridRowGroupingSelector';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function GridColumnMenuRowUngroupItem(props) {
  var _columnsLookup$colDef;
  var colDef = props.colDef,
    onClick = props.onClick;
  var apiRef = useGridApiContext();
  var rowGroupingModel = useGridSelector(apiRef, gridRowGroupingSanitizedModelSelector);
  var columnsLookup = useGridSelector(apiRef, gridColumnLookupSelector);
  var rootProps = useGridRootProps();
  if (!colDef.groupable) {
    return null;
  }
  var ungroupColumn = function ungroupColumn(event) {
    apiRef.current.removeRowGroupingCriteria(colDef.field);
    onClick(event);
  };
  var groupColumn = function groupColumn(event) {
    apiRef.current.addRowGroupingCriteria(colDef.field);
    onClick(event);
  };
  var name = (_columnsLookup$colDef = columnsLookup[colDef.field].headerName) != null ? _columnsLookup$colDef : colDef.field;
  if (rowGroupingModel.includes(colDef.field)) {
    return /*#__PURE__*/_jsxs(MenuItem, {
      onClick: ungroupColumn,
      children: [/*#__PURE__*/_jsx(ListItemIcon, {
        children: /*#__PURE__*/_jsx(rootProps.slots.columnMenuUngroupIcon, {
          fontSize: "small"
        })
      }), /*#__PURE__*/_jsx(ListItemText, {
        children: apiRef.current.getLocaleText('unGroupColumn')(name)
      })]
    });
  }
  return /*#__PURE__*/_jsxs(MenuItem, {
    onClick: groupColumn,
    children: [/*#__PURE__*/_jsx(ListItemIcon, {
      children: /*#__PURE__*/_jsx(rootProps.slots.columnMenuGroupIcon, {
        fontSize: "small"
      })
    }), /*#__PURE__*/_jsx(ListItemText, {
      children: apiRef.current.getLocaleText('groupColumn')(name)
    })]
  });
}
process.env.NODE_ENV !== "production" ? GridColumnMenuRowUngroupItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
} : void 0;
export { GridColumnMenuRowUngroupItem };