"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridColumnPinning = exports.columnPinningStateInitializer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _styles = require("@mui/material/styles");
var _xDataGrid = require("@mui/x-data-grid");
var _internals = require("@mui/x-data-grid/internals");
var _gridColumnPinningInterface = require("./gridColumnPinningInterface");
var _gridColumnPinningSelector = require("./gridColumnPinningSelector");
var _DataGridProVirtualScroller = require("../../../components/DataGridProVirtualScroller");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const columnPinningStateInitializer = (state, props, apiRef) => {
  apiRef.current.caches.columnPinning = {
    orderedFieldsBeforePinningColumns: null
  };
  let model;
  if (props.disableColumnPinning) {
    model = {};
  } else if (props.pinnedColumns) {
    model = props.pinnedColumns;
  } else if (props.initialState?.pinnedColumns) {
    model = props.initialState?.pinnedColumns;
  } else {
    model = {};
  }
  return (0, _extends2.default)({}, state, {
    pinnedColumns: model
  });
};
exports.columnPinningStateInitializer = columnPinningStateInitializer;
const mergeStateWithPinnedColumns = pinnedColumns => state => (0, _extends2.default)({}, state, {
  pinnedColumns
});
const useGridColumnPinning = (apiRef, props) => {
  const pinnedColumns = (0, _xDataGrid.useGridSelector)(apiRef, _gridColumnPinningSelector.gridPinnedColumnsSelector);
  const theme = (0, _styles.useTheme)();
  // Each visible row (not to be confused with a filter result) is composed of a central .MuiDataGrid-row element
  // and up to two additional .MuiDataGrid-row's, one for the columns pinned to the left and another
  // for those on the right side. When hovering any of these elements, the :hover styles are applied only to
  // the row element that was actually hovered, not its additional siblings. To make it look like a contiguous row,
  // this method adds/removes the .Mui-hovered class to all of the row elements inside one visible row.
  const updateHoveredClassOnSiblingRows = React.useCallback(event => {
    if (props.disableColumnPinning) {
      return;
    }
    if (!Array.isArray(pinnedColumns.left) && !Array.isArray(pinnedColumns.right)) {
      return;
    }
    const nbLeftPinnedColumns = pinnedColumns.left?.length ?? 0;
    const nbRightPinnedColumns = pinnedColumns.right?.length ?? 0;
    if (nbLeftPinnedColumns + nbRightPinnedColumns === 0) {
      return;
    }
    const index = event.currentTarget.dataset.rowindex;
    const rowElements = apiRef.current.virtualScrollerRef.current.querySelectorAll(`.${_xDataGrid.gridClasses.row}[data-rowindex="${index}"]`);
    rowElements.forEach(row => {
      // Ignore rows from other grid inside the hovered row
      if (row.closest(`.${_xDataGrid.gridClasses.virtualScroller}`) === apiRef.current.virtualScrollerRef.current) {
        if (event.type === 'mouseenter') {
          row.classList.add('Mui-hovered');
        } else {
          row.classList.remove('Mui-hovered');
        }
      }
    });
  }, [apiRef, pinnedColumns.left, pinnedColumns.right, props.disableColumnPinning]);
  const handleMouseEnter = React.useCallback((params, event) => {
    updateHoveredClassOnSiblingRows(event);
  }, [updateHoveredClassOnSiblingRows]);
  const handleMouseLeave = React.useCallback((params, event) => {
    updateHoveredClassOnSiblingRows(event);
  }, [updateHoveredClassOnSiblingRows]);
  (0, _xDataGrid.useGridApiEventHandler)(apiRef, 'rowMouseEnter', handleMouseEnter);
  (0, _xDataGrid.useGridApiEventHandler)(apiRef, 'rowMouseLeave', handleMouseLeave);

  /**
   * PRE-PROCESSING
   */
  const calculateScrollLeft = React.useCallback((initialValue, params) => {
    if (props.disableColumnPinning) {
      return initialValue;
    }
    const visibleColumnFields = (0, _xDataGrid.gridVisibleColumnFieldsSelector)(apiRef);
    const [leftPinnedColumns, rightPinnedColumns] = (0, _DataGridProVirtualScroller.filterColumns)(pinnedColumns, visibleColumnFields, theme.direction === 'rtl');
    if (!params.colIndex || leftPinnedColumns.length === 0 && rightPinnedColumns.length === 0) {
      return initialValue;
    }
    const visibleColumns = (0, _xDataGrid.gridVisibleColumnDefinitionsSelector)(apiRef);
    const columnsTotalWidth = (0, _xDataGrid.gridColumnsTotalWidthSelector)(apiRef);
    const columnPositions = (0, _xDataGrid.gridColumnPositionsSelector)(apiRef);
    const clientWidth = apiRef.current.virtualScrollerRef.current.clientWidth;

    // When using RTL, `scrollLeft` becomes negative, so we must ensure that we only compare values.
    const scrollLeft = Math.abs(apiRef.current.virtualScrollerRef.current.scrollLeft);
    const offsetWidth = visibleColumns[params.colIndex].computedWidth;
    const offsetLeft = columnPositions[params.colIndex];
    const leftPinnedColumnsWidth = columnPositions[leftPinnedColumns.length];
    const rightPinnedColumnsWidth = columnsTotalWidth - columnPositions[columnPositions.length - rightPinnedColumns.length];
    const elementBottom = offsetLeft + offsetWidth;
    if (elementBottom - (clientWidth - rightPinnedColumnsWidth) > scrollLeft) {
      const left = elementBottom - (clientWidth - rightPinnedColumnsWidth);
      return (0, _extends2.default)({}, initialValue, {
        left
      });
    }
    if (offsetLeft < scrollLeft + leftPinnedColumnsWidth) {
      const left = offsetLeft - leftPinnedColumnsWidth;
      return (0, _extends2.default)({}, initialValue, {
        left
      });
    }
    return initialValue;
  }, [apiRef, pinnedColumns, props.disableColumnPinning, theme.direction]);
  const addColumnMenuItems = React.useCallback((columnMenuItems, colDef) => {
    if (props.disableColumnPinning) {
      return columnMenuItems;
    }
    if (colDef.pinnable === false) {
      return columnMenuItems;
    }
    return [...columnMenuItems, 'columnMenuPinningItem'];
  }, [props.disableColumnPinning]);
  const checkIfCanBeReordered = React.useCallback((initialValue, {
    targetIndex
  }) => {
    const visibleColumnFields = (0, _xDataGrid.gridVisibleColumnFieldsSelector)(apiRef);
    const [leftPinnedColumns, rightPinnedColumns] = (0, _DataGridProVirtualScroller.filterColumns)(pinnedColumns, visibleColumnFields, theme.direction === 'rtl');
    if (leftPinnedColumns.length === 0 && rightPinnedColumns.length === 0) {
      return initialValue;
    }
    if (leftPinnedColumns.length > 0 && targetIndex < leftPinnedColumns.length) {
      return false;
    }
    if (rightPinnedColumns.length > 0) {
      const visibleColumns = (0, _xDataGrid.gridVisibleColumnDefinitionsSelector)(apiRef);
      const firstRightPinnedColumnIndex = visibleColumns.length - rightPinnedColumns.length;
      return targetIndex >= firstRightPinnedColumnIndex ? false : initialValue;
    }
    return initialValue;
  }, [apiRef, pinnedColumns, theme.direction]);
  const stateExportPreProcessing = React.useCallback((prevState, context) => {
    const pinnedColumnsToExport = (0, _gridColumnPinningSelector.gridPinnedColumnsSelector)(apiRef.current.state);
    const shouldExportPinnedColumns =
    // Always export if the `exportOnlyDirtyModels` property is not activated
    !context.exportOnlyDirtyModels ||
    // Always export if the model is controlled
    props.pinnedColumns != null ||
    // Always export if the model has been initialized
    props.initialState?.pinnedColumns != null ||
    // Export if the model is not empty
    (pinnedColumnsToExport.left ?? []).length > 0 || (pinnedColumnsToExport.right ?? []).length > 0;
    if (!shouldExportPinnedColumns) {
      return prevState;
    }
    return (0, _extends2.default)({}, prevState, {
      pinnedColumns: pinnedColumnsToExport
    });
  }, [apiRef, props.pinnedColumns, props.initialState?.pinnedColumns]);
  const stateRestorePreProcessing = React.useCallback((params, context) => {
    const newPinnedColumns = context.stateToRestore.pinnedColumns;
    if (newPinnedColumns != null) {
      apiRef.current.setState(mergeStateWithPinnedColumns(newPinnedColumns));
    }
    return params;
  }, [apiRef]);
  (0, _internals.useGridRegisterPipeProcessor)(apiRef, 'scrollToIndexes', calculateScrollLeft);
  (0, _internals.useGridRegisterPipeProcessor)(apiRef, 'columnMenu', addColumnMenuItems);
  (0, _internals.useGridRegisterPipeProcessor)(apiRef, 'canBeReordered', checkIfCanBeReordered);
  (0, _internals.useGridRegisterPipeProcessor)(apiRef, 'exportState', stateExportPreProcessing);
  (0, _internals.useGridRegisterPipeProcessor)(apiRef, 'restoreState', stateRestorePreProcessing);
  apiRef.current.registerControlState({
    stateId: 'pinnedColumns',
    propModel: props.pinnedColumns,
    propOnChange: props.onPinnedColumnsChange,
    stateSelector: _gridColumnPinningSelector.gridPinnedColumnsSelector,
    changeEvent: 'pinnedColumnsChange'
  });
  const checkIfEnabled = React.useCallback(methodName => {
    if (props.disableColumnPinning) {
      throw new Error(`MUI: You cannot call \`apiRef.current.${methodName}\` when \`disableColumnPinning\` is true.`);
    }
  }, [props.disableColumnPinning]);
  const pinColumn = React.useCallback((field, side) => {
    checkIfEnabled('pinColumn');
    if (apiRef.current.isColumnPinned(field) === side) {
      return;
    }
    const otherSide = side === _gridColumnPinningInterface.GridPinnedPosition.right ? _gridColumnPinningInterface.GridPinnedPosition.left : _gridColumnPinningInterface.GridPinnedPosition.right;
    const newPinnedColumns = {
      [side]: [...(pinnedColumns[side] || []), field],
      [otherSide]: (pinnedColumns[otherSide] || []).filter(column => column !== field)
    };
    apiRef.current.setPinnedColumns(newPinnedColumns);
  }, [apiRef, checkIfEnabled, pinnedColumns]);
  const unpinColumn = React.useCallback(field => {
    checkIfEnabled('unpinColumn');
    apiRef.current.setPinnedColumns({
      left: (pinnedColumns.left || []).filter(column => column !== field),
      right: (pinnedColumns.right || []).filter(column => column !== field)
    });
  }, [apiRef, checkIfEnabled, pinnedColumns.left, pinnedColumns.right]);
  const getPinnedColumns = React.useCallback(() => {
    checkIfEnabled('getPinnedColumns');
    return (0, _gridColumnPinningSelector.gridPinnedColumnsSelector)(apiRef.current.state);
  }, [apiRef, checkIfEnabled]);
  const setPinnedColumns = React.useCallback(newPinnedColumns => {
    checkIfEnabled('setPinnedColumns');
    apiRef.current.setState(mergeStateWithPinnedColumns(newPinnedColumns));
    apiRef.current.forceUpdate();
  }, [apiRef, checkIfEnabled]);
  const isColumnPinned = React.useCallback(field => {
    checkIfEnabled('isColumnPinned');
    const leftPinnedColumns = pinnedColumns.left || [];
    if (leftPinnedColumns.includes(field)) {
      return _gridColumnPinningInterface.GridPinnedPosition.left;
    }
    const rightPinnedColumns = pinnedColumns.right || [];
    if (rightPinnedColumns.includes(field)) {
      return _gridColumnPinningInterface.GridPinnedPosition.right;
    }
    return false;
  }, [pinnedColumns.left, pinnedColumns.right, checkIfEnabled]);
  const columnPinningApi = {
    pinColumn,
    unpinColumn,
    getPinnedColumns,
    setPinnedColumns,
    isColumnPinned
  };
  (0, _xDataGrid.useGridApiMethod)(apiRef, columnPinningApi, 'public');
  const handleColumnOrderChange = React.useCallback(params => {
    if (!apiRef.current.caches.columnPinning.orderedFieldsBeforePinningColumns) {
      return;
    }
    const {
      column,
      targetIndex,
      oldIndex
    } = params;
    const delta = targetIndex > oldIndex ? 1 : -1;
    const latestColumnFields = (0, _xDataGrid.gridColumnFieldsSelector)(apiRef);

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
    const siblingField = latestColumnFields[targetIndex - delta];
    const newOrderedFieldsBeforePinningColumns = [...apiRef.current.caches.columnPinning.orderedFieldsBeforePinningColumns];

    // The index to start swapping fields
    let i = newOrderedFieldsBeforePinningColumns.findIndex(currentColumn => currentColumn === column.field);
    // The index of the field to swap with
    let j = i + delta;

    // When to stop swapping fields.
    // We stop one field before because the swap is done with i + 1 (if delta=1)
    const stop = newOrderedFieldsBeforePinningColumns.findIndex(currentColumn => currentColumn === siblingField);
    while (delta > 0 ? i < stop : i > stop) {
      // If the field to swap with is a pinned column, jump to the next
      while (apiRef.current.isColumnPinned(newOrderedFieldsBeforePinningColumns[j])) {
        j += delta;
      }
      const temp = newOrderedFieldsBeforePinningColumns[i];
      newOrderedFieldsBeforePinningColumns[i] = newOrderedFieldsBeforePinningColumns[j];
      newOrderedFieldsBeforePinningColumns[j] = temp;
      i = j;
      j = i + delta;
    }
    apiRef.current.caches.columnPinning.orderedFieldsBeforePinningColumns = newOrderedFieldsBeforePinningColumns;
  }, [apiRef]);
  (0, _xDataGrid.useGridApiEventHandler)(apiRef, 'columnOrderChange', handleColumnOrderChange);
  React.useEffect(() => {
    if (props.pinnedColumns) {
      apiRef.current.setPinnedColumns(props.pinnedColumns);
    }
  }, [apiRef, props.pinnedColumns]);
};
exports.useGridColumnPinning = useGridColumnPinning;