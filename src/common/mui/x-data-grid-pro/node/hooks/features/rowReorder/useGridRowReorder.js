"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridRowReorder = void 0;
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
var _xDataGrid = require("@mui/x-data-grid");
var _internals = require("@mui/x-data-grid/internals");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    rowDragging: ['row--dragging']
  };
  return (0, _utils.unstable_composeClasses)(slots, _xDataGrid.getDataGridUtilityClass, classes);
};

/**
 * Only available in DataGridPro
 * @requires useGridRows (method)
 */
const useGridRowReorder = (apiRef, props) => {
  const logger = (0, _xDataGrid.useGridLogger)(apiRef, 'useGridRowReorder');
  const sortModel = (0, _xDataGrid.useGridSelector)(apiRef, _xDataGrid.gridSortModelSelector);
  const treeDepth = (0, _xDataGrid.useGridSelector)(apiRef, _xDataGrid.gridRowMaximumTreeDepthSelector);
  const dragRowNode = React.useRef(null);
  const originRowIndex = React.useRef(null);
  const removeDnDStylesTimeout = React.useRef();
  const ownerState = {
    classes: props.classes
  };
  const classes = useUtilityClasses(ownerState);
  const [dragRowId, setDragRowId] = React.useState('');
  React.useEffect(() => {
    return () => {
      clearTimeout(removeDnDStylesTimeout.current);
    };
  }, []);

  // TODO: remove sortModel check once row reorder is sorting compatible
  // remove treeDepth once row reorder is tree compatible
  const isRowReorderDisabled = React.useMemo(() => {
    return !props.rowReordering || !!sortModel.length || treeDepth !== 1;
  }, [props.rowReordering, sortModel, treeDepth]);
  const handleDragStart = React.useCallback((params, event) => {
    // Call the gridEditRowsStateSelector directly to avoid infnite loop
    const editRowsState = (0, _internals.gridEditRowsStateSelector)(apiRef.current.state);
    if (isRowReorderDisabled || Object.keys(editRowsState).length !== 0) {
      return;
    }
    logger.debug(`Start dragging row ${params.id}`);
    // Prevent drag events propagation.
    // For more information check here https://github.com/mui/mui-x/issues/2680.
    event.stopPropagation();
    dragRowNode.current = event.currentTarget;
    dragRowNode.current.classList.add(classes.rowDragging);
    setDragRowId(params.id);
    removeDnDStylesTimeout.current = setTimeout(() => {
      dragRowNode.current.classList.remove(classes.rowDragging);
    });
    originRowIndex.current = apiRef.current.getRowIndexRelativeToVisibleRows(params.id);
  }, [isRowReorderDisabled, classes.rowDragging, logger, apiRef]);
  const handleDragOver = React.useCallback((params, event) => {
    if (dragRowId === '') {
      return;
    }
    const rowNode = apiRef.current.getRowNode(params.id);
    if (!rowNode || rowNode.type === 'footer' || rowNode.type === 'pinnedRow') {
      return;
    }
    logger.debug(`Dragging over row ${params.id}`);
    event.preventDefault();
    // Prevent drag events propagation.
    // For more information check here https://github.com/mui/mui-x/issues/2680.
    event.stopPropagation();
    if (params.id !== dragRowId) {
      const targetRowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(params.id);
      apiRef.current.setRowIndex(dragRowId, targetRowIndex);
    }
  }, [apiRef, logger, dragRowId]);
  const handleDragEnd = React.useCallback((params, event) => {
    // Call the gridEditRowsStateSelector directly to avoid infnite loop
    const editRowsState = (0, _internals.gridEditRowsStateSelector)(apiRef.current.state);
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
      const rowOrderChangeParams = {
        row: apiRef.current.getRow(dragRowId),
        targetIndex: apiRef.current.getRowIndexRelativeToVisibleRows(params.id),
        oldIndex: originRowIndex.current
      };
      apiRef.current.publishEvent('rowOrderChange', rowOrderChangeParams);
    }
    setDragRowId('');
  }, [isRowReorderDisabled, logger, apiRef, dragRowId]);
  (0, _xDataGrid.useGridApiEventHandler)(apiRef, 'rowDragStart', handleDragStart);
  (0, _xDataGrid.useGridApiEventHandler)(apiRef, 'rowDragOver', handleDragOver);
  (0, _xDataGrid.useGridApiEventHandler)(apiRef, 'rowDragEnd', handleDragEnd);
  (0, _xDataGrid.useGridApiEventHandler)(apiRef, 'cellDragOver', handleDragOver);
  (0, _xDataGrid.useGridApiOptionHandler)(apiRef, 'rowOrderChange', props.onRowOrderChange);
};
exports.useGridRowReorder = useGridRowReorder;