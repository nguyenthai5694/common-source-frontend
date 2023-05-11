import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useEventCallback } from '@mui/material/utils';
import { isNavigationKey, useGridRegisterPipeProcessor, useGridVisibleRows } from '@mui/x-data-grid-pro/internals';
import { useGridApiEventHandler, useGridApiMethod, GRID_ACTIONS_COLUMN_TYPE, GRID_CHECKBOX_SELECTION_COL_DEF, GRID_DETAIL_PANEL_TOGGLE_FIELD, gridRowsDataRowIdToIdLookupSelector, gridClasses, gridFocusCellSelector } from '@mui/x-data-grid-pro';
import { gridCellSelectionStateSelector } from './gridCellSelectionSelector';
export const cellSelectionStateInitializer = (state, props) => {
  var _props$unstable_cellS, _props$initialState;
  return _extends({}, state, {
    cellSelection: _extends({}, (_props$unstable_cellS = props.unstable_cellSelectionModel) != null ? _props$unstable_cellS : (_props$initialState = props.initialState) == null ? void 0 : _props$initialState.cellSelection)
  });
};
function isKeyboardEvent(event) {
  return !!event.key;
}
export const useGridCellSelection = (apiRef, props) => {
  const visibleRows = useGridVisibleRows(apiRef, props);
  const cellWithVirtualFocus = React.useRef();
  const lastMouseDownCell = React.useRef();
  apiRef.current.registerControlState({
    stateId: 'cellSelection',
    propModel: props.unstable_cellSelectionModel,
    propOnChange: props.unstable_onCellSelectionModelChange,
    stateSelector: gridCellSelectionStateSelector,
    changeEvent: 'cellSelectionChange'
  });
  const runIfCellSelectionIsEnabled = callback => (...args) => {
    if (props.unstable_cellSelection) {
      callback(...args);
    }
  };
  const isCellSelected = React.useCallback((id, field) => {
    if (!props.unstable_cellSelection) {
      return false;
    }
    const cellSelectionModel = gridCellSelectionStateSelector(apiRef.current.state);
    return cellSelectionModel[id] ? !!cellSelectionModel[id][field] : false;
  }, [apiRef, props.unstable_cellSelection]);
  const getCellSelectionModel = React.useCallback(() => {
    return gridCellSelectionStateSelector(apiRef.current.state);
  }, [apiRef]);
  const setCellSelectionModel = React.useCallback(newModel => {
    if (!props.unstable_cellSelection) {
      return;
    }
    apiRef.current.setState(prevState => _extends({}, prevState, {
      cellSelection: newModel
    }));
    apiRef.current.forceUpdate();
  }, [apiRef, props.unstable_cellSelection]);
  const selectCellRange = React.useCallback((start, end, keepOtherSelected = false) => {
    const startRowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(start.id);
    const startColumnIndex = apiRef.current.getColumnIndex(start.field);
    const endRowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(end.id);
    const endColumnIndex = apiRef.current.getColumnIndex(end.field);
    let finalStartRowIndex = startRowIndex;
    let finalStartColumnIndex = startColumnIndex;
    let finalEndRowIndex = endRowIndex;
    let finalEndColumnIndex = endColumnIndex;
    if (finalStartRowIndex > finalEndRowIndex) {
      finalStartRowIndex = endRowIndex;
      finalEndRowIndex = startRowIndex;
    }
    if (finalStartColumnIndex > finalEndColumnIndex) {
      finalStartColumnIndex = endColumnIndex;
      finalEndColumnIndex = startColumnIndex;
    }
    const visibleColumns = apiRef.current.getVisibleColumns();
    const rowsInRange = visibleRows.rows.slice(finalStartRowIndex, finalEndRowIndex + 1);
    const columnsInRange = visibleColumns.slice(finalStartColumnIndex, finalEndColumnIndex + 1);
    const newModel = keepOtherSelected ? apiRef.current.unstable_getCellSelectionModel() : {};
    rowsInRange.forEach(row => {
      if (!newModel[row.id]) {
        newModel[row.id] = {};
      }
      columnsInRange.forEach(column => {
        newModel[row.id][column.field] = true;
      }, {});
    });
    apiRef.current.unstable_setCellSelectionModel(newModel);
  }, [apiRef, visibleRows.rows]);
  const getSelectedCellsAsArray = React.useCallback(() => {
    const model = apiRef.current.unstable_getCellSelectionModel();
    const idToIdLookup = gridRowsDataRowIdToIdLookupSelector(apiRef);
    return Object.entries(model).reduce((acc, [id, fields]) => [...acc, ...Object.entries(fields).reduce((acc2, [field, isSelected]) => {
      return isSelected ? [...acc2, {
        id: idToIdLookup[id],
        field
      }] : acc2;
    }, [])], []);
  }, [apiRef]);
  const cellSelectionApi = {
    unstable_isCellSelected: isCellSelected,
    unstable_getCellSelectionModel: getCellSelectionModel,
    unstable_setCellSelectionModel: setCellSelectionModel,
    unstable_selectCellRange: selectCellRange,
    unstable_getSelectedCellsAsArray: getSelectedCellsAsArray
  };
  useGridApiMethod(apiRef, cellSelectionApi, 'public');
  const hasClickedValidCellForRangeSelection = React.useCallback(params => {
    if (params.field === GRID_CHECKBOX_SELECTION_COL_DEF.field) {
      return false;
    }
    if (params.field === GRID_DETAIL_PANEL_TOGGLE_FIELD) {
      return false;
    }
    const column = apiRef.current.getColumn(params.field);
    if (column.type === GRID_ACTIONS_COLUMN_TYPE) {
      return false;
    }
    return params.rowNode.type !== 'pinnedRow';
  }, [apiRef]);
  const handleCellMouseDown = React.useCallback((params, event) => {
    var _apiRef$current$rootE, _apiRef$current$rootE2;
    // Skip if the click comes from the right-button or, only on macOS, Ctrl is pressed
    // Fix for https://github.com/mui/mui-x/pull/6567#issuecomment-1329155578
    const isMacOs = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    if (event.button !== 0 || event.ctrlKey && isMacOs) {
      return;
    }
    const focusedCell = gridFocusCellSelector(apiRef);
    if (hasClickedValidCellForRangeSelection(params) && event.shiftKey && focusedCell) {
      event.preventDefault();
    }
    lastMouseDownCell.current = {
      id: params.id,
      field: params.field
    };
    (_apiRef$current$rootE = apiRef.current.rootElementRef) == null ? void 0 : (_apiRef$current$rootE2 = _apiRef$current$rootE.current) == null ? void 0 : _apiRef$current$rootE2.classList.add(gridClasses['root--disableUserSelection']);
  }, [apiRef, hasClickedValidCellForRangeSelection]);
  const handleCellMouseUp = React.useCallback(() => {
    var _apiRef$current$rootE3, _apiRef$current$rootE4;
    lastMouseDownCell.current = null;
    (_apiRef$current$rootE3 = apiRef.current.rootElementRef) == null ? void 0 : (_apiRef$current$rootE4 = _apiRef$current$rootE3.current) == null ? void 0 : _apiRef$current$rootE4.classList.remove(gridClasses['root--disableUserSelection']);
  }, [apiRef]);
  const handleCellFocusIn = React.useCallback(params => {
    cellWithVirtualFocus.current = {
      id: params.id,
      field: params.field
    };
  }, []);
  const handleCellMouseOver = React.useCallback((params, event) => {
    if (!lastMouseDownCell.current) {
      return;
    }
    const {
      id,
      field
    } = params;
    apiRef.current.unstable_selectCellRange(lastMouseDownCell.current, {
      id,
      field
    }, event.ctrlKey || event.metaKey);
  }, [apiRef]);
  const handleCellClick = useEventCallback((params, event) => {
    const {
      id,
      field
    } = params;
    if (!hasClickedValidCellForRangeSelection(params)) {
      return;
    }
    const focusedCell = gridFocusCellSelector(apiRef);
    if (event.shiftKey && focusedCell) {
      apiRef.current.unstable_selectCellRange(focusedCell, {
        id,
        field
      });
      cellWithVirtualFocus.current = {
        id,
        field
      };
      return;
    }
    if (event.ctrlKey || event.metaKey) {
      // Add the clicked cell to the selection
      const prevModel = apiRef.current.unstable_getCellSelectionModel();
      apiRef.current.unstable_setCellSelectionModel(_extends({}, prevModel, {
        [id]: _extends({}, prevModel[id], {
          [field]: !apiRef.current.unstable_isCellSelected(id, field)
        })
      }));
    } else {
      // Clear the selection and keep only the clicked cell selected
      apiRef.current.unstable_setCellSelectionModel({
        [id]: {
          [field]: true
        }
      });
    }
  });
  const handleCellKeyDown = useEventCallback((params, event) => {
    if (!isNavigationKey(event.key) || !cellWithVirtualFocus.current) {
      return;
    }
    if (!event.shiftKey) {
      apiRef.current.unstable_setCellSelectionModel({});
      return;
    }
    const {
      current: otherCell
    } = cellWithVirtualFocus;
    let endRowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(otherCell.id);
    let endColumnIndex = apiRef.current.getColumnIndex(otherCell.field);
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
    const visibleColumns = apiRef.current.getVisibleColumns();
    if (endColumnIndex < 0 || endColumnIndex >= visibleColumns.length) {
      return;
    }
    cellWithVirtualFocus.current = {
      id: visibleRows.rows[endRowIndex].id,
      field: visibleColumns[endColumnIndex].field
    };
    const {
      id,
      field
    } = params;
    apiRef.current.unstable_selectCellRange({
      id,
      field
    }, cellWithVirtualFocus.current);
  });
  useGridApiEventHandler(apiRef, 'cellClick', runIfCellSelectionIsEnabled(handleCellClick));
  useGridApiEventHandler(apiRef, 'cellFocusIn', runIfCellSelectionIsEnabled(handleCellFocusIn));
  useGridApiEventHandler(apiRef, 'cellKeyDown', runIfCellSelectionIsEnabled(handleCellKeyDown));
  useGridApiEventHandler(apiRef, 'cellMouseDown', runIfCellSelectionIsEnabled(handleCellMouseDown));
  useGridApiEventHandler(apiRef, 'cellMouseUp', runIfCellSelectionIsEnabled(handleCellMouseUp));
  useGridApiEventHandler(apiRef, 'cellMouseOver', runIfCellSelectionIsEnabled(handleCellMouseOver));
  React.useEffect(() => {
    if (props.unstable_cellSelectionModel) {
      apiRef.current.unstable_setCellSelectionModel(props.unstable_cellSelectionModel);
    }
  }, [apiRef, props.unstable_cellSelectionModel]);
  const checkIfCellIsSelected = React.useCallback((isSelected, {
    id,
    field
  }) => {
    return apiRef.current.unstable_isCellSelected(id, field);
  }, [apiRef]);
  const addClassesToCells = React.useCallback((classes, {
    id,
    field
  }) => {
    const newClasses = [...classes];
    if (!visibleRows.range || !apiRef.current.unstable_isCellSelected(id, field)) {
      return classes;
    }
    const rowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(id);
    const columnIndex = apiRef.current.getColumnIndex(field);
    const visibleColumns = apiRef.current.getVisibleColumns();
    if (rowIndex > 0) {
      const {
        id: previousRowId
      } = visibleRows.rows[rowIndex - 1];
      if (!apiRef.current.unstable_isCellSelected(previousRowId, field)) {
        newClasses.push(gridClasses['cell--rangeTop']);
      }
    } else {
      newClasses.push(gridClasses['cell--rangeTop']);
    }
    if (rowIndex < visibleRows.range.lastRowIndex) {
      const {
        id: nextRowId
      } = visibleRows.rows[rowIndex + 1];
      if (!apiRef.current.unstable_isCellSelected(nextRowId, field)) {
        newClasses.push(gridClasses['cell--rangeBottom']);
      }
    } else {
      newClasses.push(gridClasses['cell--rangeBottom']);
    }
    if (columnIndex > 0) {
      const {
        field: previousColumnField
      } = visibleColumns[columnIndex - 1];
      if (!apiRef.current.unstable_isCellSelected(id, previousColumnField)) {
        newClasses.push(gridClasses['cell--rangeLeft']);
      }
    } else {
      newClasses.push(gridClasses['cell--rangeLeft']);
    }
    if (columnIndex < visibleColumns.length - 1) {
      const {
        field: nextColumnField
      } = visibleColumns[columnIndex + 1];
      if (!apiRef.current.unstable_isCellSelected(id, nextColumnField)) {
        newClasses.push(gridClasses['cell--rangeRight']);
      }
    } else {
      newClasses.push(gridClasses['cell--rangeRight']);
    }
    return newClasses;
  }, [apiRef, visibleRows.range, visibleRows.rows]);
  const canUpdateFocus = React.useCallback((initialValue, {
    event,
    cell
  }) => {
    if (!cell || !props.unstable_cellSelection || !event.shiftKey) {
      return initialValue;
    }
    if (isKeyboardEvent(event)) {
      return isNavigationKey(event.key) ? false : initialValue;
    }
    const focusedCell = gridFocusCellSelector(apiRef);
    if (hasClickedValidCellForRangeSelection(cell) && focusedCell) {
      return false;
    }
    return initialValue;
  }, [apiRef, props.unstable_cellSelection, hasClickedValidCellForRangeSelection]);
  useGridRegisterPipeProcessor(apiRef, 'isCellSelected', checkIfCellIsSelected);
  useGridRegisterPipeProcessor(apiRef, 'cellClassName', addClassesToCells);
  useGridRegisterPipeProcessor(apiRef, 'canUpdateFocus', canUpdateFocus);
};