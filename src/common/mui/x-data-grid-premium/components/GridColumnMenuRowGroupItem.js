import * as React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';
import PropTypes from 'prop-types';
import { useGridSelector, gridColumnLookupSelector } from '../../x-data-grid-pro';
import { gridRowGroupingSanitizedModelSelector } from '../hooks/features/rowGrouping/gridRowGroupingSelector';
import {
  getRowGroupingCriteriaFromGroupingField,
  GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD, isGroupingColumn,
} from '../hooks/features/rowGrouping/gridRowGroupingUtils';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';

function GridColumnMenuRowGroupItem(props) {
  const {
    colDef,
    onClick,
  } = props;
  const apiRef = useGridApiContext();
  const rowGroupingModel = useGridSelector(apiRef, gridRowGroupingSanitizedModelSelector);
  const columnsLookup = useGridSelector(apiRef, gridColumnLookupSelector);
  const rootProps = useGridRootProps();
  const renderUnGroupingMenuItem = field => {
    var _columnsLookup$field$;
    const ungroupColumn = event => {
      apiRef.current.removeRowGroupingCriteria(field);
      onClick(event);
    };
    const name = (_columnsLookup$field$ = columnsLookup[field].headerName) != null ? _columnsLookup$field$ : field;

    return /*#__PURE__*/_jsxs(MenuItem, {
      onClick: ungroupColumn,
      children: [/*#__PURE__*/_jsx(ListItemIcon, {
        children: /*#__PURE__*/_jsx(rootProps.slots.columnMenuUngroupIcon, {
          fontSize: 'small',
        }),
      }), /*#__PURE__*/_jsx(ListItemText, {
        children: apiRef.current.getLocaleText('unGroupColumn')(name),
      })],
    }, field);
  };

  if (!colDef || !isGroupingColumn(colDef.field)) {
    return null;
  }

  if (colDef.field === GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD) {
    return /*#__PURE__*/_jsx(React.Fragment, {
      children: rowGroupingModel.map(renderUnGroupingMenuItem),
    });
  }

  return renderUnGroupingMenuItem(getRowGroupingCriteriaFromGroupingField(colDef.field));
}
process.env.NODE_ENV !== 'production' ? GridColumnMenuRowGroupItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
} : void 0;
export { GridColumnMenuRowGroupItem };