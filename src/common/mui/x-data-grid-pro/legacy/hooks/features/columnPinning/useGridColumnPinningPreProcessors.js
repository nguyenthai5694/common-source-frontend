import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useGridRegisterPipeProcessor } from '@mui/x-data-grid/internals';
import { gridPinnedColumnsSelector } from './gridColumnPinningSelector';
import { columnPinningStateInitializer } from './useGridColumnPinning';
import { filterColumns } from '../../../components/DataGridProVirtualScroller';
export var useGridColumnPinningPreProcessors = function useGridColumnPinningPreProcessors(apiRef, props) {
  var disableColumnPinning = props.disableColumnPinning,
    pinnedColumnsProp = props.pinnedColumns,
    initialState = props.initialState;
  var theme = useTheme();
  var pinnedColumns = gridPinnedColumnsSelector(apiRef.current.state);
  if (pinnedColumns == null) {
    // Since the state is not ready yet lets use the initializer to get which
    // columns should be pinned initially.
    var initializedState = columnPinningStateInitializer(apiRef.current.state, {
      disableColumnPinning: disableColumnPinning,
      pinnedColumns: pinnedColumnsProp,
      initialState: initialState
    }, apiRef);
    pinnedColumns = gridPinnedColumnsSelector(initializedState);
  }
  var prevAllPinnedColumns = React.useRef();
  var reorderPinnedColumns = React.useCallback(function (columnsState) {
    if (columnsState.orderedFields.length === 0 || disableColumnPinning) {
      return columnsState;
    }
    var _filterColumns = filterColumns(pinnedColumns, columnsState.orderedFields, theme.direction === 'rtl'),
      _filterColumns2 = _slicedToArray(_filterColumns, 2),
      leftPinnedColumns = _filterColumns2[0],
      rightPinnedColumns = _filterColumns2[1];
    var newOrderedFields;
    var allPinnedColumns = [].concat(_toConsumableArray(leftPinnedColumns), _toConsumableArray(rightPinnedColumns));
    var orderedFieldsBeforePinningColumns = apiRef.current.caches.columnPinning.orderedFieldsBeforePinningColumns;
    if (orderedFieldsBeforePinningColumns) {
      newOrderedFields = new Array(columnsState.orderedFields.length).fill(null);
      var newOrderedFieldsBeforePinningColumns = _toConsumableArray(newOrderedFields);

      // Contains the fields not added to the orderedFields array yet
      var remainingFields = _toConsumableArray(columnsState.orderedFields);

      // First, we check if the column was unpinned since the last processing.
      // If yes and it still exists, we move it back to the same position it was before pinning
      prevAllPinnedColumns.current.forEach(function (field) {
        if (!allPinnedColumns.includes(field) && columnsState.lookup[field]) {
          // Get the position before pinning
          var index = orderedFieldsBeforePinningColumns.indexOf(field);
          newOrderedFields[index] = field;
          newOrderedFieldsBeforePinningColumns[index] = field;
          // This field was already consumed so we prevent from being added again
          remainingFields.splice(remainingFields.indexOf(field), 1);
        }
      });

      // For columns still pinned, we keep stored their original positions
      allPinnedColumns.forEach(function (field) {
        var index = orderedFieldsBeforePinningColumns.indexOf(field);
        // If index = -1, the pinned field didn't exist in the last processing, it's possibly being added now
        // If index >= newOrderedFieldsBeforePinningColumns.length, then one or more columns were removed
        // In both cases, use the position from the columns array
        // TODO: detect removed columns and decrease the positions after it
        if (index === -1 || index >= newOrderedFieldsBeforePinningColumns.length) {
          index = columnsState.orderedFields.indexOf(field);
        }

        // The fallback above may make the column to be inserted in a position already occupied
        // In this case, put it in any empty slot available
        if (newOrderedFieldsBeforePinningColumns[index] !== null) {
          index = 0;
          while (newOrderedFieldsBeforePinningColumns[index] !== null) {
            index += 1;
          }
        }
        newOrderedFields[index] = field;
        newOrderedFieldsBeforePinningColumns[index] = field;
        // This field was already consumed so we prevent from being added again
        remainingFields.splice(remainingFields.indexOf(field), 1);
      });

      // The fields remaining are those that're neither pinnned nor were unpinned
      // For these, we spread them across both arrays making sure to not override existing values
      var i = 0;
      remainingFields.forEach(function (field) {
        while (newOrderedFieldsBeforePinningColumns[i] !== null) {
          i += 1;
        }
        newOrderedFieldsBeforePinningColumns[i] = field;
        newOrderedFields[i] = field;
      });
      apiRef.current.caches.columnPinning.orderedFieldsBeforePinningColumns = newOrderedFieldsBeforePinningColumns;
    } else {
      newOrderedFields = _toConsumableArray(columnsState.orderedFields);
      apiRef.current.caches.columnPinning.orderedFieldsBeforePinningColumns = _toConsumableArray(columnsState.orderedFields);
    }
    prevAllPinnedColumns.current = allPinnedColumns;
    var centerColumns = newOrderedFields.filter(function (field) {
      return !leftPinnedColumns.includes(field) && !rightPinnedColumns.includes(field);
    });
    return _extends({}, columnsState, {
      orderedFields: [].concat(_toConsumableArray(leftPinnedColumns), _toConsumableArray(centerColumns), _toConsumableArray(rightPinnedColumns))
    });
  }, [apiRef, disableColumnPinning, pinnedColumns, theme.direction]);
  useGridRegisterPipeProcessor(apiRef, 'hydrateColumns', reorderPinnedColumns);
};