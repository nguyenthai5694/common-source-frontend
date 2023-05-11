import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useGridSelector, gridVisibleColumnDefinitionsSelector, gridColumnsTotalWidthSelector, gridColumnPositionsSelector, gridVisibleColumnFieldsSelector, gridClasses, useGridApiMethod, useGridApiEventHandler, gridColumnFieldsSelector } from '@mui/x-data-grid';
import { useGridRegisterPipeProcessor } from '@mui/x-data-grid/internals';
import { GridPinnedPosition } from './gridColumnPinningInterface';
import { gridPinnedColumnsSelector } from './gridColumnPinningSelector';
import { filterColumns } from '../../../components/DataGridProVirtualScroller';
export var columnPinningStateInitializer = function columnPinningStateInitializer(state, props, apiRef) {
  var _props$initialState;
  apiRef.current.caches.columnPinning = {
    orderedFieldsBeforePinningColumns: null
  };
  var model;
  if (props.disableColumnPinning) {
    model = {};
  } else if (props.pinnedColumns) {
    model = props.pinnedColumns;
  } else if ((_props$initialState = props.initialState) != null && _props$initialState.pinnedColumns) {
    var _props$initialState2;
    model = (_props$initialState2 = props.initialState) == null ? void 0 : _props$initialState2.pinnedColumns;
  } else {
    model = {};
  }
  return _extends({}, state, {
    pinnedColumns: model
  });
};
var mergeStateWithPinnedColumns = function mergeStateWithPinnedColumns(pinnedColumns) {
  return function (state) {
    return _extends({}, state, {
      pinnedColumns: pinnedColumns
    });
  };
};
export var useGridColumnPinning = function useGridColumnPinning(apiRef, props) {
  var _props$initialState4;
  var pinnedColumns = useGridSelector(apiRef, gridPinnedColumnsSelector);
  var theme = useTheme();
  // Each visible row (not to be confused with a filter result) is composed of a central .MuiDataGrid-row element
  // and up to two additional .MuiDataGrid-row's, one for the columns pinned to the left and another
  // for those on the right side. When hovering any of these elements, the :hover styles are applied only to
  // the row element that was actually hovered, not its additional siblings. To make it look like a contiguous row,
  // this method adds/removes the .Mui-hovered class to all of the row elements inside one visible row.
  var updateHoveredClassOnSiblingRows = React.useCallback(function (event) {
    var _pinnedColumns$left$l, _pinnedColumns$left, _pinnedColumns$right$, _pinnedColumns$right;
    if (props.disableColumnPinning) {
      return;
    }
    if (!Array.isArray(pinnedColumns.left) && !Array.isArray(pinnedColumns.right)) {
      return;
    }
    var nbLeftPinnedColumns = (_pinnedColumns$left$l = (_pinnedColumns$left = pinnedColumns.left) == null ? void 0 : _pinnedColumns$left.length) != null ? _pinnedColumns$left$l : 0;
    var nbRightPinnedColumns = (_pinnedColumns$right$ = (_pinnedColumns$right = pinnedColumns.right) == null ? void 0 : _pinnedColumns$right.length) != null ? _pinnedColumns$right$ : 0;
    if (nbLeftPinnedColumns + nbRightPinnedColumns === 0) {
      return;
    }
    var index = event.currentTarget.dataset.rowindex;
    var rowElements = apiRef.current.virtualScrollerRef.current.querySelectorAll(".".concat(gridClasses.row, "[data-rowindex=\"").concat(index, "\"]"));
    rowElements.forEach(function (row) {
      // Ignore rows from other grid inside the hovered row
      if (row.closest(".".concat(gridClasses.virtualScroller)) === apiRef.current.virtualScrollerRef.current) {
        if (event.type === 'mouseenter') {
          row.classList.add('Mui-hovered');
        } else {
          row.classList.remove('Mui-hovered');
        }
      }
    });
  }, [apiRef, pinnedColumns.left, pinnedColumns.right, props.disableColumnPinning]);
  var handleMouseEnter = React.useCallback(function (params, event) {
    updateHoveredClassOnSiblingRows(event);
  }, [updateHoveredClassOnSiblingRows]);
  var handleMouseLeave = React.useCallback(function (params, event) {
    updateHoveredClassOnSiblingRows(event);
  }, [updateHoveredClassOnSiblingRows]);
  useGridApiEventHandler(apiRef, 'rowMouseEnter', handleMouseEnter);
  useGridApiEventHandler(apiRef, 'rowMouseLeave', handleMouseLeave);

  /**
   * PRE-PROCESSING
   */
  var calculateScrollLeft = React.useCallback(function (initialValue, params) {
    if (props.disableColumnPinning) {
      return initialValue;
    }
    var visibleColumnFields = gridVisibleColumnFieldsSelector(apiRef);
    var _filterColumns = filterColumns(pinnedColumns, visibleColumnFields, theme.direction === 'rtl'),
      _filterColumns2 = _slicedToArray(_filterColumns, 2),
      leftPinnedColumns = _filterColumns2[0],
      rightPinnedColumns = _filterColumns2[1];
    if (!params.colIndex || leftPinnedColumns.length === 0 && rightPinnedColumns.length === 0) {
      return initialValue;
    }
    var visibleColumns = gridVisibleColumnDefinitionsSelector(apiRef);
    var columnsTotalWidth = gridColumnsTotalWidthSelector(apiRef);
    var columnPositions = gridColumnPositionsSelector(apiRef);
    var clientWidth = apiRef.current.virtualScrollerRef.current.clientWidth;

    // When using RTL, `scrollLeft` becomes negative, so we must ensure that we only compare values.
    var scrollLeft = Math.abs(apiRef.current.virtualScrollerRef.current.scrollLeft);
    var offsetWidth = visibleColumns[params.colIndex].computedWidth;
    var offsetLeft = columnPositions[params.colIndex];
    var leftPinnedColumnsWidth = columnPositions[leftPinnedColumns.length];
    var rightPinnedColumnsWidth = columnsTotalWidth - columnPositions[columnPositions.length - rightPinnedColumns.length];
    var elementBottom = offsetLeft + offsetWidth;
    if (elementBottom - (clientWidth - rightPinnedColumnsWidth) > scrollLeft) {
      var left = elementBottom - (clientWidth - rightPinnedColumnsWidth);
      return _extends({}, initialValue, {
        left: left
      });
    }
    if (offsetLeft < scrollLeft + leftPinnedColumnsWidth) {
      var _left = offsetLeft - leftPinnedColumnsWidth;
      return _extends({}, initialValue, {
        left: _left
      });
    }
    return initialValue;
  }, [apiRef, pinnedColumns, props.disableColumnPinning, theme.direction]);
  var addColumnMenuItems = React.useCallback(function (columnMenuItems, colDef) {
    if (props.disableColumnPinning) {
      return columnMenuItems;
    }
    if (colDef.pinnable === false) {
      return columnMenuItems;
    }
    return [].concat(_toConsumableArray(columnMenuItems), ['columnMenuPinningItem']);
  }, [props.disableColumnPinning]);
  var checkIfCanBeReordered = React.useCallback(function (initialValue, _ref) {
    var targetIndex = _ref.targetIndex;
    var visibleColumnFields = gridVisibleColumnFieldsSelector(apiRef);
    var _filterColumns3 = filterColumns(pinnedColumns, visibleColumnFields, theme.direction === 'rtl'),
      _filterColumns4 = _slicedToArray(_filterColumns3, 2),
      leftPinnedColumns = _filterColumns4[0],
      rightPinnedColumns = _filterColumns4[1];
    if (leftPinnedColumns.length === 0 && rightPinnedColumns.length === 0) {
      return initialValue;
    }
    if (leftPinnedColumns.length > 0 && targetIndex < leftPinnedColumns.length) {
      return false;
    }
    if (rightPinnedColumns.length > 0) {
      var visibleColumns = gridVisibleColumnDefinitionsSelector(apiRef);
      var firstRightPinnedColumnIndex = visibleColumns.length - rightPinnedColumns.length;
      return targetIndex >= firstRightPinnedColumnIndex ? false : initialValue;
    }
    return initialValue;
  }, [apiRef, pinnedColumns, theme.direction]);
  var stateExportPreProcessing = React.useCallback(function (prevState, context) {
    var _props$initialState3, _pinnedColumnsToExpor, _pinnedColumnsToExpor2;
    var pinnedColumnsToExport = gridPinnedColumnsSelector(apiRef.current.state);
    var shouldExportPinnedColumns =
    // Always export if the `exportOnlyDirtyModels` property is not activated
    !context.exportOnlyDirtyModels ||
    // Always export if the model is controlled
    props.pinnedColumns != null ||
    // Always export if the model has been initialized
    ((_props$initialState3 = props.initialState) == null ? void 0 : _props$initialState3.pinnedColumns) != null ||
    // Export if the model is not empty
    ((_pinnedColumnsToExpor = pinnedColumnsToExport.left) != null ? _pinnedColumnsToExpor : []).length > 0 || ((_pinnedColumnsToExpor2 = pinnedColumnsToExport.right) != null ? _pinnedColumnsToExpor2 : []).length > 0;
    if (!shouldExportPinnedColumns) {
      return prevState;
    }
    return _extends({}, prevState, {
      pinnedColumns: pinnedColumnsToExport
    });
  }, [apiRef, props.pinnedColumns, (_props$initialState4 = props.initialState) == null ? void 0 : _props$initialState4.pinnedColumns]);
  var stateRestorePreProcessing = React.useCallback(function (params, context) {
    var newPinnedColumns = context.stateToRestore.pinnedColumns;
    if (newPinnedColumns != null) {
      apiRef.current.setState(mergeStateWithPinnedColumns(newPinnedColumns));
    }
    return params;
  }, [apiRef]);
  useGridRegisterPipeProcessor(apiRef, 'scrollToIndexes', calculateScrollLeft);
  useGridRegisterPipeProcessor(apiRef, 'columnMenu', addColumnMenuItems);
  useGridRegisterPipeProcessor(apiRef, 'canBeReordered', checkIfCanBeReordered);
  useGridRegisterPipeProcessor(apiRef, 'exportState', stateExportPreProcessing);
  useGridRegisterPipeProcessor(apiRef, 'restoreState', stateRestorePreProcessing);
  apiRef.current.registerControlState({
    stateId: 'pinnedColumns',
    propModel: props.pinnedColumns,
    propOnChange: props.onPinnedColumnsChange,
    stateSelector: gridPinnedColumnsSelector,
    changeEvent: 'pinnedColumnsChange'
  });
  var checkIfEnabled = React.useCallback(function (methodName) {
    if (props.disableColumnPinning) {
      throw new Error("MUI: You cannot call `apiRef.current.".concat(methodName, "` when `disableColumnPinning` is true."));
    }
  }, [props.disableColumnPinning]);
  var pinColumn = React.useCallback(function (field, side) {
    var _newPinnedColumns;
    checkIfEnabled('pinColumn');
    if (apiRef.current.isColumnPinned(field) === side) {
      return;
    }
    var otherSide = side === GridPinnedPosition.right ? GridPinnedPosition.left : GridPinnedPosition.right;
    var newPinnedColumns = (_newPinnedColumns = {}, _defineProperty(_newPinnedColumns, side, [].concat(_toConsumableArray(pinnedColumns[side] || []), [field])), _defineProperty(_newPinnedColumns, otherSide, (pinnedColumns[otherSide] || []).filter(function (column) {
      return column !== field;
    })), _newPinnedColumns);
    apiRef.current.setPinnedColumns(newPinnedColumns);
  }, [apiRef, checkIfEnabled, pinnedColumns]);
  var unpinColumn = React.useCallback(function (field) {
    checkIfEnabled('unpinColumn');
    apiRef.current.setPinnedColumns({
      left: (pinnedColumns.left || []).filter(function (column) {
        return column !== field;
      }),
      right: (pinnedColumns.right || []).filter(function (column) {
        return column !== field;
      })
    });
  }, [apiRef, checkIfEnabled, pinnedColumns.left, pinnedColumns.right]);
  var getPinnedColumns = React.useCallback(function () {
    checkIfEnabled('getPinnedColumns');
    return gridPinnedColumnsSelector(apiRef.current.state);
  }, [apiRef, checkIfEnabled]);
  var setPinnedColumns = React.useCallback(function (newPinnedColumns) {
    checkIfEnabled('setPinnedColumns');
    apiRef.current.setState(mergeStateWithPinnedColumns(newPinnedColumns));
    apiRef.current.forceUpdate();
  }, [apiRef, checkIfEnabled]);
  var isColumnPinned = React.useCallback(function (field) {
    checkIfEnabled('isColumnPinned');
    var leftPinnedColumns = pinnedColumns.left || [];
    if (leftPinnedColumns.includes(field)) {
      return GridPinnedPosition.left;
    }
    var rightPinnedColumns = pinnedColumns.right || [];
    if (rightPinnedColumns.includes(field)) {
      return GridPinnedPosition.right;
    }
    return false;
  }, [pinnedColumns.left, pinnedColumns.right, checkIfEnabled]);
  var columnPinningApi = {
    pinColumn: pinColumn,
    unpinColumn: unpinColumn,
    getPinnedColumns: getPinnedColumns,
    setPinnedColumns: setPinnedColumns,
    isColumnPinned: isColumnPinned
  };
  useGridApiMethod(apiRef, columnPinningApi, 'public');
  var handleColumnOrderChange = React.useCallback(function (params) {
    if (!apiRef.current.caches.columnPinning.orderedFieldsBeforePinningColumns) {
      return;
    }
    var column = params.column,
      targetIndex = params.targetIndex,
      oldIndex = params.oldIndex;
    var delta = targetIndex > oldIndex ? 1 : -1;
    var latestColumnFields = gridColumnFieldsSelector(apiRef);

    /**
     * When a column X is reordered to somewhere else, the position where this column X is dropped
     * on must be moved to left or right to make room for it. The ^^^ below represents the column
     * which gave space to receive X.
     *
     * | X | B | C | D | -> | B | C | D | X | (e.g. X moved to after D, so delta=1)
     *              ^^^              ^^^
     *
     * | A | B | C | X | -> | X | A | B | C | (e.g. X moved before A, so delta=-1)
     *  ^^^                      ^^^
     *
     * If column P is pinned, it will not move to provide space. However, it will jump to the next
     * non-pinned column.
     *
     * | X | B | P | D | -> | B | D | P | X | (e.g. X moved to after D, with P pinned)
     *              ^^^          ^^^
     */
    var siblingField = latestColumnFields[targetIndex - delta];
    var newOrderedFieldsBeforePinningColumns = _toConsumableArray(apiRef.current.caches.columnPinning.orderedFieldsBeforePinningColumns);

    // The index to start swapping fields
    var i = newOrderedFieldsBeforePinningColumns.findIndex(function (currentColumn) {
      return currentColumn === column.field;
    });
    // The index of the field to swap with
    var j = i + delta;

    // When to stop swapping fields.
    // We stop one field before because the swap is done with i + 1 (if delta=1)
    var stop = newOrderedFieldsBeforePinningColumns.findIndex(function (currentColumn) {
      return currentColumn === siblingField;
    });
    while (delta > 0 ? i < stop : i > stop) {
      // If the field to swap with is a pinned column, jump to the next
      while (apiRef.current.isColumnPinned(newOrderedFieldsBeforePinningColumns[j])) {
        j += delta;
      }
      var temp = newOrderedFieldsBeforePinningColumns[i];
      newOrderedFieldsBeforePinningColumns[i] = newOrderedFieldsBeforePinningColumns[j];
      newOrderedFieldsBeforePinningColumns[j] = temp;
      i = j;
      j = i + delta;
    }
    apiRef.current.caches.columnPinning.orderedFieldsBeforePinningColumns = newOrderedFieldsBeforePinningColumns;
  }, [apiRef]);
  useGridApiEventHandler(apiRef, 'columnOrderChange', handleColumnOrderChange);
  React.useEffect(function () {
    if (props.pinnedColumns) {
      apiRef.current.setPinnedColumns(props.pinnedColumns);
    }
  }, [apiRef, props.pinnedColumns]);
};