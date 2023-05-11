import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useEventCallback } from '@mui/material/utils';
import { isNavigationKey, useGridRegisterPipeProcessor, useGridVisibleRows } from '@mui/x-data-grid-pro/internals';
import { useGridApiEventHandler, useGridApiMethod, GRID_ACTIONS_COLUMN_TYPE, GRID_CHECKBOX_SELECTION_COL_DEF, GRID_DETAIL_PANEL_TOGGLE_FIELD, gridRowsDataRowIdToIdLookupSelector, gridClasses, gridFocusCellSelector } from '@mui/x-data-grid-pro';
import { gridCellSelectionStateSelector } from './gridCellSelectionSelector';
export var cellSelectionStateInitializer = function cellSelectionStateInitializer(state, props) {
  var _props$unstable_cellS, _props$initialState;
  return _extends({}, state, {
    cellSelection: _extends({}, (_props$unstable_cellS = props.unstable_cellSelectionModel) != null ? _props$unstable_cellS : (_props$initialState = props.initialState) == null ? void 0 : _props$initialState.cellSelection)
  });
};
function isKeyboardEvent(event) {
  return !!event.key;
}
export var useGridCellSelection = function useGridCellSelection(apiRef, props) {
  var visibleRows = useGridVisibleRows(apiRef, props);
  var cellWithVirtualFocus = React.useRef();
  var lastMouseDownCell = React.useRef();
  apiRef.current.registerControlState({
    stateId: 'cellSelection',
    propModel: props.unstable_cellSelectionModel,
    propOnChange: props.unstable_onCellSelectionModelChange,
    stateSelector: gridCellSelectionStateSelector,
    changeEvent: 'cellSelectionChange'
  });
  var runIfCellSelectionIsEnabled = function runIfCellSelectionIsEnabled(callback) {
    return function () {
      if (props.unstable_cellSelection) {
        callback.apply(void 0, arguments);
      }
    };
  };
  var isCellSelected = React.useCallback(function (id, field) {
    if (!props.unstable_cellSelection) {
      return false;
    }
    var cellSelectionModel = gridCellSelectionStateSelector(apiRef.current.state);
    return cellSelectionModel[id] ? !!cellSelectionModel[id][field] : false;
  }, [apiRef, props.unstable_cellSelection]);
  var getCellSelectionModel = React.useCallback(function () {
    return gridCellSelectionStateSelector(apiRef.current.state);
  }, [apiRef]);
  var setCellSelectionModel = React.useCallback(function (newModel) {
    if (!props.unstable_cellSelection) {
      return;
    }
    apiRef.current.setState(function (prevState) {
      return _extends({}, prevState, {
        cellSelection: newModel
      });
    });
    apiRef.current.forceUpdate();
  }, [apiRef, props.unstable_cellSelection]);
  var selectCellRange = React.useCallback(function (start, end) {
    var keepOtherSelected = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var startRowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(start.id);
    var startColumnIndex = apiRef.current.getColumnIndex(start.field);
    var endRowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(end.id);
    var endColumnIndex = apiRef.current.getColumnIndex(end.field);
    var finalStartRowIndex = startRowIndex;
    var finalStartColumnIndex = startColumnIndex;
    var finalEndRowIndex = endRowIndex;
    var finalEndColumnIndex = endColumnIndex;
    if (finalStartRowIndex > finalEndRowIndex) {
      finalStartRowIndex = endRowIndex;
      finalEndRowIndex = startRowIndex;
    }
    if (finalStartColumnIndex > finalEndColumnIndex) {
      finalStartColumnIndex = endColumnIndex;
      finalEndColumnIndex = startColumnIndex;
    }
    var visibleColumns = apiRef.current.getVisibleColumns();
    var rowsInRange = visibleRows.rows.slice(finalStartRowIndex, finalEndRowIndex + 1);
    var columnsInRange = visibleColumns.slice(finalStartColumnIndex, finalEndColumnIndex + 1);
    var newModel = keepOtherSelected ? apiRef.current.unstable_getCellSelectionModel() : {};
    rowsInRange.forEach(function (row) {
      if (!newModel[row.id]) {
        newModel[row.id] = {};
      }
      columnsInRange.forEach(function (column) {
        newModel[row.id][column.field] = true;
      }, {});
    });
    apiRef.current.unstable_setCellSelectionModel(newModel);
  }, [apiRef, visibleRows.rows]);
  var getSelectedCellsAsArray = React.useCallback(function () {
    var model = apiRef.current.unstable_getCellSelectionModel();
    var idToIdLookup = gridRowsDataRowIdToIdLookupSelector(apiRef);
    return Object.entries(model).reduce(function (acc, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        id = _ref2[0],
        fields = _ref2[1];
      return [].concat(_toConsumableArray(acc), _toConsumableArray(Object.entries(fields).reduce(function (acc2, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          field = _ref4[0],
          isSelected = _ref4[1];
        return isSelected ? [].concat(_toConsumableArray(acc2), [{
          id: idToIdLookup[id],
          field: field
        }]) : acc2;
      }, [])));
    }, []);
  }, [apiRef]);
  var cellSelectionApi = {
    unstable_isCellSelected: isCellSelected,
    unstable_getCellSelectionModel: getCellSelectionModel,
    unstable_setCellSelectionModel: setCellSelectionModel,
    unstable_selectCellRange: selectCellRange,
    unstable_getSelectedCellsAsArray: getSelectedCellsAsArray
  };
  useGridApiMethod(apiRef, cellSelectionApi, 'public');
  var hasClickedValidCellForRangeSelection = React.useCallback(function (params) {
    if (params.field === GRID_CHECKBOX_SELECTION_COL_DEF.field) {
      return false;
    }
    if (params.field === GRID_DETAIL_PANEL_TOGGLE_FIELD) {
      return false;
    }
    var column = apiRef.current.getColumn(params.field);
    if (column.type === GRID_ACTIONS_COLUMN_TYPE) {
      return false;
    }
    return params.rowNode.type !== 'pinnedRow';
  }, [apiRef]);
  var handleCellMouseDown = React.useCallback(function (params, event) {
    var _apiRef$current$rootE, _apiRef$current$rootE2;
    // Skip if the click comes from the right-button or, only on macOS, Ctrl is pressed
    // Fix for https://github.com/mui/mui-x/pull/6567#issuecomment-1329155578
    var isMacOs = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    if (event.button !== 0 || event.ctrlKey && isMacOs) {
      return;
    }
    var focusedCell = gridFocusCellSelector(apiRef);
    if (hasClickedValidCellForRangeSelection(params) && event.shiftKey && focusedCell) {
      event.preventDefault();
    }
    lastMouseDownCell.current = {
      id: params.id,
      field: params.field
    };
    (_apiRef$current$rootE = apiRef.current.rootElementRef) == null ? void 0 : (_apiRef$current$rootE2 = _apiRef$current$rootE.current) == null ? void 0 : _apiRef$current$rootE2.classList.add(gridClasses['root--disableUserSelection']);
  }, [apiRef, hasClickedValidCellForRangeSelection]);
  var handleCellMouseUp = React.useCallback(function () {
    var _apiRef$current$rootE3, _apiRef$current$rootE4;
    lastMouseDownCell.current = null;
    (_apiRef$current$rootE3 = apiRef.current.rootElementRef) == null ? void 0 : (_apiRef$current$rootE4 = _apiRef$current$rootE3.current) == null ? void 0 : _apiRef$current$rootE4.classList.remove(gridClasses['root--disableUserSelection']);
  }, [apiRef]);
  var handleCellFocusIn = React.useCallback(function (params) {
    cellWithVirtualFocus.current = {
      id: params.id,
      field: params.field
    };
  }, []);
  var handleCellMouseOver = React.useCallback(function (params, event) {
    if (!lastMouseDownCell.current) {
      return;
    }
    var id = params.id,
      field = params.field;
    apiRef.current.unstable_selectCellRange(lastMouseDownCell.current, {
      id: id,
      field: field
    }, event.ctrlKey || event.metaKey);
  }, [apiRef]);
  var handleCellClick = useEventCallback(function (params, event) {
    var id = params.id,
      field = params.field;
    if (!hasClickedValidCellForRangeSelection(params)) {
      return;
    }
    var focusedCell = gridFocusCellSelector(apiRef);
    if (event.shiftKey && focusedCell) {
      apiRef.current.unstable_selectCellRange(focusedCell, {
        id: id,
        field: field
      });
      cellWithVirtualFocus.current = {
        id: id,
        field: field
      };
      return;
    }
    if (event.ctrlKey || event.metaKey) {
      // Add the clicked cell to the selection
      var prevModel = apiRef.current.unstable_getCellSelectionModel();
      apiRef.current.unstable_setCellSelectionModel(_extends({}, prevModel, _defineProperty({}, id, _extends({}, prevModel[id], _defineProperty({}, field, !apiRef.current.unstable_isCellSelected(id, field))))));
    } else {
      // Clear the selection and keep only the clicked cell selected
      apiRef.current.unstable_setCellSelectionModel(_defineProperty({}, id, _defineProperty({}, field, true)));
    }
  });
  var handleCellKeyDown = useEventCallback(function (params, event) {
    if (!isNavigationKey(event.key) || !cellWithVirtualFocus.current) {
      return;
    }
    if (!event.shiftKey) {
      apiRef.current.unstable_setCellSelectionModel({});
      return;
    }
    var otherCell = cellWithVirtualFocus.current;
    var endRowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(otherCell.id);
    var endColumnIndex = apiRef.current.getColumnIndex(otherCell.field);
    if (event.key === 'ArrowDown') {
      endRowIndex += 1;
    } else if (event.key === 'ArrowUp') {
      endRowIndex -= 1;
    } else if (event.key === 'ArrowRight') {
      endColumnIndex += 1;
    } else if (event.key === 'ArrowLeft') {
      endColumnIndex -= 1;
    }
    if (endRowIndex < 0 || endRowIndex >= visibleRows.rows.length) {
      return;
    }
    var visibleColumns = apiRef.current.getVisibleColumns();
    if (endColumnIndex < 0 || endColumnIndex >= visibleColumns.length) {
      return;
    }
    cellWithVirtualFocus.current = {
      id: visibleRows.rows[endRowIndex].id,
      field: visibleColumns[endColumnIndex].field
    };
    var id = params.id,
      field = params.field;
    apiRef.current.unstable_selectCellRange({
      id: id,
      field: field
    }, cellWithVirtualFocus.current);
  });
  useGridApiEventHandler(apiRef, 'cellClick', runIfCellSelectionIsEnabled(handleCellClick));
  useGridApiEventHandler(apiRef, 'cellFocusIn', runIfCellSelectionIsEnabled(handleCellFocusIn));
  useGridApiEventHandler(apiRef, 'cellKeyDown', runIfCellSelectionIsEnabled(handleCellKeyDown));
  useGridApiEventHandler(apiRef, 'cellMouseDown', runIfCellSelectionIsEnabled(handleCellMouseDown));
  useGridApiEventHandler(apiRef, 'cellMouseUp', runIfCellSelectionIsEnabled(handleCellMouseUp));
  useGridApiEventHandler(apiRef, 'cellMouseOver', runIfCellSelectionIsEnabled(handleCellMouseOver));
  React.useEffect(function () {
    if (props.unstable_cellSelectionModel) {
      apiRef.current.unstable_setCellSelectionModel(props.unstable_cellSelectionModel);
    }
  }, [apiRef, props.unstable_cellSelectionModel]);
  var checkIfCellIsSelected = React.useCallback(function (isSelected, _ref5) {
    var id = _ref5.id,
      field = _ref5.field;
    return apiRef.current.unstable_isCellSelected(id, field);
  }, [apiRef]);
  var addClassesToCells = React.useCallback(function (classes, _ref6) {
    var id = _ref6.id,
      field = _ref6.field;
    var newClasses = _toConsumableArray(classes);
    if (!visibleRows.range || !apiRef.current.unstable_isCellSelected(id, field)) {
      return classes;
    }
    var rowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(id);
    var columnIndex = apiRef.current.getColumnIndex(field);
    var visibleColumns = apiRef.current.getVisibleColumns();
    if (rowIndex > 0) {
      var previousRowId = visibleRows.rows[rowIndex - 1].id;
      if (!apiRef.current.unstable_isCellSelected(previousRowId, field)) {
        newClasses.push(gridClasses['cell--rangeTop']);
      }
    } else {
      newClasses.push(gridClasses['cell--rangeTop']);
    }
    if (rowIndex < visibleRows.range.lastRowIndex) {
      var nextRowId = visibleRows.rows[rowIndex + 1].id;
      if (!apiRef.current.unstable_isCellSelected(nextRowId, field)) {
        newClasses.push(gridClasses['cell--rangeBottom']);
      }
    } else {
      newClasses.push(gridClasses['cell--rangeBottom']);
    }
    if (columnIndex > 0) {
      var previousColumnField = visibleColumns[columnIndex - 1].field;
      if (!apiRef.current.unstable_isCellSelected(id, previousColumnField)) {
        newClasses.push(gridClasses['cell--rangeLeft']);
      }
    } else {
      newClasses.push(gridClasses['cell--rangeLeft']);
    }
    if (columnIndex < visibleColumns.length - 1) {
      var nextColumnField = visibleColumns[columnIndex + 1].field;
      if (!apiRef.current.unstable_isCellSelected(id, nextColumnField)) {
        newClasses.push(gridClasses['cell--rangeRight']);
      }
    } else {
      newClasses.push(gridClasses['cell--rangeRight']);
    }
    return newClasses;
  }, [apiRef, visibleRows.range, visibleRows.rows]);
  var canUpdateFocus = React.useCallback(function (initialValue, _ref7) {
    var event = _ref7.event,
      cell = _ref7.cell;
    if (!cell || !props.unstable_cellSelection || !event.shiftKey) {
      return initialValue;
    }
    if (isKeyboardEvent(event)) {
      return isNavigationKey(event.key) ? false : initialValue;
    }
    var focusedCell = gridFocusCellSelector(apiRef);
    if (hasClickedValidCellForRangeSelection(cell) && focusedCell) {
      return false;
    }
    return initialValue;
  }, [apiRef, props.unstable_cellSelection, hasClickedValidCellForRangeSelection]);
  useGridRegisterPipeProcessor(apiRef, 'isCellSelected', checkIfCellIsSelected);
  useGridRegisterPipeProcessor(apiRef, 'cellClassName', addClassesToCells);
  useGridRegisterPipeProcessor(apiRef, 'canUpdateFocus', canUpdateFocus);
};