import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { useGridLogger, useGridApiEventHandler, getDataGridUtilityClass, useGridSelector, gridSortModelSelector, gridRowMaximumTreeDepthSelector, useGridApiOptionHandler } from '@mui/x-data-grid';
import { gridEditRowsStateSelector } from '@mui/x-data-grid/internals';
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    rowDragging: ['row--dragging']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

/**
 * Only available in DataGridPro
 * @requires useGridRows (method)
 */
export var useGridRowReorder = function useGridRowReorder(apiRef, props) {
  var logger = useGridLogger(apiRef, 'useGridRowReorder');
  var sortModel = useGridSelector(apiRef, gridSortModelSelector);
  var treeDepth = useGridSelector(apiRef, gridRowMaximumTreeDepthSelector);
  var dragRowNode = React.useRef(null);
  var originRowIndex = React.useRef(null);
  var removeDnDStylesTimeout = React.useRef();
  var ownerState = {
    classes: props.classes
  };
  var classes = useUtilityClasses(ownerState);
  var _React$useState = React.useState(''),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    dragRowId = _React$useState2[0],
    setDragRowId = _React$useState2[1];
  React.useEffect(function () {
    return function () {
      clearTimeout(removeDnDStylesTimeout.current);
    };
  }, []);

  // TODO: remove sortModel check once row reorder is sorting compatible
  // remove treeDepth once row reorder is tree compatible
  var isRowReorderDisabled = React.useMemo(function () {
    return !props.rowReordering || !!sortModel.length || treeDepth !== 1;
  }, [props.rowReordering, sortModel, treeDepth]);
  var handleDragStart = React.useCallback(function (params, event) {
    // Call the gridEditRowsStateSelector directly to avoid infnite loop
    var editRowsState = gridEditRowsStateSelector(apiRef.current.state);
    if (isRowReorderDisabled || Object.keys(editRowsState).length !== 0) {
      return;
    }
    logger.debug("Start dragging row ".concat(params.id));
    // Prevent drag events propagation.
    // For more information check here https://github.com/mui/mui-x/issues/2680.
    event.stopPropagation();
    dragRowNode.current = event.currentTarget;
    dragRowNode.current.classList.add(classes.rowDragging);
    setDragRowId(params.id);
    removeDnDStylesTimeout.current = setTimeout(function () {
      dragRowNode.current.classList.remove(classes.rowDragging);
    });
    originRowIndex.current = apiRef.current.getRowIndexRelativeToVisibleRows(params.id);
  }, [isRowReorderDisabled, classes.rowDragging, logger, apiRef]);
  var handleDragOver = React.useCallback(function (params, event) {
    if (dragRowId === '') {
      return;
    }
    var rowNode = apiRef.current.getRowNode(params.id);
    if (!rowNode || rowNode.type === 'footer' || rowNode.type === 'pinnedRow') {
      return;
    }
    logger.debug("Dragging over row ".concat(params.id));
    event.preventDefault();
    // Prevent drag events propagation.
    // For more information check here https://github.com/mui/mui-x/issues/2680.
    event.stopPropagation();
    if (params.id !== dragRowId) {
      var targetRowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(params.id);
      apiRef.current.setRowIndex(dragRowId, targetRowIndex);
    }
  }, [apiRef, logger, dragRowId]);
  var handleDragEnd = React.useCallback(function (params, event) {
    // Call the gridEditRowsStateSelector directly to avoid infnite loop
    var editRowsState = gridEditRowsStateSelector(apiRef.current.state);
    if (dragRowId === '' || isRowReorderDisabled || Object.keys(editRowsState).length !== 0) {
      return;
    }
    logger.debug('End dragging row');
    event.preventDefault();
    // Prevent drag events propagation.
    // For more information check here https://github.com/mui/mui-x/issues/2680.
    event.stopPropagation();
    clearTimeout(removeDnDStylesTimeout.current);
    dragRowNode.current = null;

    // Check if the row was dropped outside the grid.
    if (event.dataTransfer.dropEffect === 'none') {
      // Accessing params.field may contain the wrong field as header elements are reused
      apiRef.current.setRowIndex(dragRowId, originRowIndex.current);
      originRowIndex.current = null;
    } else {
      // Emit the rowOrderChange event only once when the reordering stops.
      var rowOrderChangeParams = {
        row: apiRef.current.getRow(dragRowId),
        targetIndex: apiRef.current.getRowIndexRelativeToVisibleRows(params.id),
        oldIndex: originRowIndex.current
      };
      apiRef.current.publishEvent('rowOrderChange', rowOrderChangeParams);
    }
    setDragRowId('');
  }, [isRowReorderDisabled, logger, apiRef, dragRowId]);
  useGridApiEventHandler(apiRef, 'rowDragStart', handleDragStart);
  useGridApiEventHandler(apiRef, 'rowDragOver', handleDragOver);
  useGridApiEventHandler(apiRef, 'rowDragEnd', handleDragEnd);
  useGridApiEventHandler(apiRef, 'cellDragOver', handleDragOver);
  useGridApiOptionHandler(apiRef, 'rowOrderChange', props.onRowOrderChange);
};