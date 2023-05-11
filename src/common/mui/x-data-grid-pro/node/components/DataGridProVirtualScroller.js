"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterColumns = exports.DataGridProVirtualScroller = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _styles = require("@mui/material/styles");
var _utils = require("@mui/utils");
var _xDataGrid = require("@mui/x-data-grid");
var _internals = require("@mui/x-data-grid/internals");
var _useGridPrivateApiContext = require("../hooks/utils/useGridPrivateApiContext");
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _columnPinning = require("../hooks/features/columnPinning");
var _detailPanel = require("../hooks/features/detailPanel");
var _GridDetailPanel = require("./GridDetailPanel");
var _gridRowPinningSelector = require("../hooks/features/rowPinning/gridRowPinningSelector");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["className", "disableVirtualization"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const filterColumns = (pinnedColumns, columns, invert) => {
  if (!Array.isArray(pinnedColumns.left) && !Array.isArray(pinnedColumns.right)) {
    return [[], []];
  }
  if (pinnedColumns.left?.length === 0 && pinnedColumns.right?.length === 0) {
    return [[], []];
  }
  const filter = (newPinnedColumns, remainingColumns) => {
    if (!Array.isArray(newPinnedColumns)) {
      return [];
    }
    return newPinnedColumns.filter(field => remainingColumns.includes(field));
  };
  const leftPinnedColumns = filter(pinnedColumns.left, columns);
  const columnsWithoutLeftPinnedColumns = columns.filter(
  // Filter out from the remaining columns those columns already pinned to the left
  field => !leftPinnedColumns.includes(field));
  const rightPinnedColumns = filter(pinnedColumns.right, columnsWithoutLeftPinnedColumns);
  if (invert) {
    return [rightPinnedColumns, leftPinnedColumns];
  }
  return [leftPinnedColumns, rightPinnedColumns];
};
exports.filterColumns = filterColumns;
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    leftPinnedColumns: ['pinnedColumns', 'pinnedColumns--left'],
    rightPinnedColumns: ['pinnedColumns', 'pinnedColumns--right', 'withBorderColor'],
    topPinnedRows: ['pinnedRows', 'pinnedRows--top'],
    bottomPinnedRows: ['pinnedRows', 'pinnedRows--bottom'],
    pinnedRowsRenderZone: ['pinnedRowsRenderZone'],
    detailPanels: ['detailPanels'],
    detailPanel: ['detailPanel']
  };
  return (0, _utils.unstable_composeClasses)(slots, _xDataGrid.getDataGridUtilityClass, classes);
};
// Inspired by https://github.com/material-components/material-components-ios/blob/bca36107405594d5b7b16265a5b0ed698f85a5ee/components/Elevation/src/UIColor%2BMaterialElevation.m#L61
const getOverlayAlpha = elevation => {
  let alphaValue;
  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2;
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }
  return alphaValue / 100;
};
const getBoxShadowColor = theme => {
  return theme.vars ? `rgba(0 0 0 /  0.21)` : (0, _styles.alpha)(theme.palette.common.black, 0.21);
};
const VirtualScrollerDetailPanels = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'DetailPanels',
  overridesResolver: (props, styles) => styles.detailPanels
})({
  position: 'relative'
});
const darkModeBackgroundImage = `linear-gradient(${(0, _styles.alpha)('#fff', getOverlayAlpha(2))}, ${(0, _styles.alpha)('#fff', getOverlayAlpha(2))})`;
const VirtualScrollerPinnedColumns = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'PinnedColumns',
  overridesResolver: (props, styles) => [{
    [`&.${_xDataGrid.gridClasses['pinnedColumns--left']}`]: styles['pinnedColumns--left']
  }, {
    [`&.${_xDataGrid.gridClasses['pinnedColumns--right']}`]: styles['pinnedColumns--right']
  }, styles.pinnedColumns]
})(({
  theme,
  ownerState
}) => {
  const boxShadowColor = getBoxShadowColor(theme);
  return (0, _extends2.default)({
    position: 'sticky',
    overflow: 'hidden',
    zIndex: 1,
    backgroundColor: (theme.vars || theme).palette.background.default
  }, theme.vars ? {
    backgroundImage: theme.vars.overlays?.[2]
  } : (0, _extends2.default)({}, theme.palette.mode === 'dark' && {
    backgroundImage: darkModeBackgroundImage
  }), ownerState.side === _columnPinning.GridPinnedPosition.left && {
    left: 0,
    float: 'left',
    boxShadow: `2px 0px 4px -2px ${boxShadowColor}`
  }, ownerState.side === _columnPinning.GridPinnedPosition.right && {
    right: 0,
    float: 'right',
    boxShadow: `-2px 0px 4px -2px ${boxShadowColor}`
  }, ownerState.side === _columnPinning.GridPinnedPosition.right && ownerState.showCellVerticalBorder && {
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid'
  });
});
var PinnedRowsPosition = /*#__PURE__*/function (PinnedRowsPosition) {
  PinnedRowsPosition["top"] = "top";
  PinnedRowsPosition["bottom"] = "bottom";
  return PinnedRowsPosition;
}(PinnedRowsPosition || {});
const VirtualScrollerPinnedRows = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'PinnedRows',
  overridesResolver: (props, styles) => [{
    [`&.${_xDataGrid.gridClasses['pinnedRows--top']}`]: styles['pinnedRows--top']
  }, {
    [`&.${_xDataGrid.gridClasses['pinnedRows--bottom']}`]: styles['pinnedRows--bottom']
  }, styles.pinnedRows]
})(({
  theme,
  ownerState
}) => {
  const boxShadowColor = getBoxShadowColor(theme);
  return (0, _extends2.default)({
    position: 'sticky',
    // should be above the detail panel
    zIndex: 3,
    backgroundColor: (theme.vars || theme).palette.background.default
  }, theme.vars ? {
    backgroundImage: theme.vars.overlays?.[2]
  } : (0, _extends2.default)({}, theme.palette.mode === 'dark' && {
    backgroundImage: darkModeBackgroundImage
  }), ownerState.position === 'top' && {
    top: 0,
    boxShadow: `0px 3px 4px -2px ${boxShadowColor}`
  }, ownerState.position === PinnedRowsPosition.bottom && {
    boxShadow: `0px -3px 4px -2px ${boxShadowColor}`,
    bottom: 0
  });
});
const VirtualScrollerPinnedRowsRenderZone = (0, _styles.styled)('div')({
  position: 'absolute'
});
const DataGridProVirtualScroller = /*#__PURE__*/React.forwardRef(function DataGridProVirtualScroller(props, ref) {
  const other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const apiRef = (0, _useGridPrivateApiContext.useGridPrivateApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const visibleColumnFields = (0, _xDataGrid.useGridSelector)(apiRef, _xDataGrid.gridVisibleColumnFieldsSelector);
  const expandedRowIds = (0, _xDataGrid.useGridSelector)(apiRef, _detailPanel.gridDetailPanelExpandedRowIdsSelector);
  const detailPanelsContent = (0, _xDataGrid.useGridSelector)(apiRef, _detailPanel.gridDetailPanelExpandedRowsContentCacheSelector);
  const detailPanelsHeights = (0, _xDataGrid.useGridSelector)(apiRef, _detailPanel.gridDetailPanelExpandedRowsHeightCacheSelector);
  const leftColumns = React.useRef(null);
  const rightColumns = React.useRef(null);
  const topPinnedRowsRenderZoneRef = React.useRef(null);
  const bottomPinnedRowsRenderZoneRef = React.useRef(null);
  const theme = (0, _styles.useTheme)();
  const handleRenderZonePositioning = React.useCallback(({
    top,
    left
  }) => {
    if (leftColumns.current) {
      leftColumns.current.style.transform = `translate3d(0px, ${top}px, 0px)`;
    }
    if (rightColumns.current) {
      rightColumns.current.style.transform = `translate3d(0px, ${top}px, 0px)`;
    }
    if (topPinnedRowsRenderZoneRef.current) {
      topPinnedRowsRenderZoneRef.current.style.transform = `translate3d(${left}px, 0px, 0px)`;
    }
    if (bottomPinnedRowsRenderZoneRef.current) {
      bottomPinnedRowsRenderZoneRef.current.style.transform = `translate3d(${left}px, 0px, 0px)`;
    }
  }, []);
  const getRowProps = React.useCallback(id => {
    if (!expandedRowIds.includes(id)) {
      return null;
    }
    const height = detailPanelsHeights[id];
    return {
      style: {
        marginBottom: height
      }
    };
  }, [detailPanelsHeights, expandedRowIds]);
  const pinnedColumns = (0, _xDataGrid.useGridSelector)(apiRef, _columnPinning.gridPinnedColumnsSelector);
  const [leftPinnedColumns, rightPinnedColumns] = filterColumns(pinnedColumns, visibleColumnFields, theme.direction === 'rtl');
  const pinnedRows = (0, _xDataGrid.useGridSelector)(apiRef, _gridRowPinningSelector.gridPinnedRowsSelector);
  const topPinnedRowsData = React.useMemo(() => pinnedRows?.top || [], [pinnedRows?.top]);
  const bottomPinnedRowsData = React.useMemo(() => pinnedRows?.bottom || [], [pinnedRows?.bottom]);
  const ownerState = (0, _extends2.default)({}, rootProps, {
    classes: rootProps.classes
  });
  const classes = useUtilityClasses(ownerState);
  const {
    renderContext,
    getRows,
    getRootProps,
    getContentProps,
    getRenderZoneProps,
    updateRenderZonePosition
  } = (0, _internals.useGridVirtualScroller)((0, _extends2.default)({
    ref,
    renderZoneMinColumnIndex: leftPinnedColumns.length,
    renderZoneMaxColumnIndex: visibleColumnFields.length - rightPinnedColumns.length,
    onRenderZonePositioning: handleRenderZonePositioning,
    getRowProps
  }, props));
  const refreshRenderZonePosition = React.useCallback(() => {
    if (renderContext) {
      updateRenderZonePosition(renderContext);
    }
  }, [renderContext, updateRenderZonePosition]);
  (0, _xDataGrid.useGridApiEventHandler)(apiRef, 'columnWidthChange', refreshRenderZonePosition);
  (0, _xDataGrid.useGridApiEventHandler)(apiRef, 'columnOrderChange', refreshRenderZonePosition);
  (0, _xDataGrid.useGridApiEventHandler)(apiRef, 'rowOrderChange', refreshRenderZonePosition);
  const leftRenderContext = renderContext && leftPinnedColumns.length > 0 ? (0, _extends2.default)({}, renderContext, {
    firstColumnIndex: 0,
    lastColumnIndex: leftPinnedColumns.length
  }) : null;
  const rightRenderContext = renderContext && rightPinnedColumns.length > 0 ? (0, _extends2.default)({}, renderContext, {
    firstColumnIndex: visibleColumnFields.length - rightPinnedColumns.length,
    lastColumnIndex: visibleColumnFields.length
  }) : null;

  // Create a lookup for faster check if the row is expanded
  const expandedRowIdsLookup = React.useMemo(() => {
    const lookup = {};
    expandedRowIds.forEach(id => {
      lookup[id] = true;
    });
    return lookup;
  }, [expandedRowIds]);
  const getDetailPanel = rowId => {
    const rowsMeta = (0, _xDataGrid.gridRowsMetaSelector)(apiRef.current.state);
    const content = detailPanelsContent[rowId];

    // Check if the id exists in the current page
    const rowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(rowId);
    const exists = rowIndex !== undefined;
    if ( /*#__PURE__*/React.isValidElement(content) && exists) {
      const hasAutoHeight = apiRef.current.detailPanelHasAutoHeight(rowId);
      const height = hasAutoHeight ? 'auto' : detailPanelsHeights[rowId];
      const sizes = apiRef.current.unstable_getRowInternalSizes(rowId);
      const spacingTop = sizes?.spacingTop || 0;
      const top = rowsMeta.positions[rowIndex] + apiRef.current.unstable_getRowHeight(rowId) + spacingTop;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridDetailPanel.GridDetailPanel, {
        rowId: rowId,
        style: {
          top
        },
        height: height,
        className: classes.detailPanel,
        children: content
      }, rowId);
    }
    return null;
  };
  const detailPanels = [];
  const topPinnedRows = getRows({
    renderContext,
    rows: topPinnedRowsData,
    position: 'center'
  });
  const pinnedRowsHeight = (0, _internals.calculatePinnedRowsHeight)(apiRef);
  const mainRows = getRows({
    renderContext,
    rowIndexOffset: topPinnedRowsData.length,
    position: 'center',
    onRowRender: rowId => {
      if (rootProps.getDetailPanelContent == null) {
        return;
      }
      if (!expandedRowIdsLookup[rowId]) {
        return;
      }
      const detailPanel = getDetailPanel(rowId);
      if (detailPanel) {
        detailPanels.push(detailPanel);
      }
    }
  });
  const bottomPinnedRows = getRows({
    renderContext,
    rows: bottomPinnedRowsData,
    rowIndexOffset: topPinnedRowsData.length + (mainRows ? mainRows.length : 0),
    position: 'center'
  });
  const contentProps = getContentProps();
  const pinnedColumnsStyle = {
    minHeight: contentProps.style.minHeight
  };
  if (contentProps.style.minHeight && contentProps.style.minHeight === '100%') {
    contentProps.style.minHeight = `calc(100% - ${pinnedRowsHeight.top}px - ${pinnedRowsHeight.bottom}px)`;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_internals.GridVirtualScroller, (0, _extends2.default)({}, getRootProps(other), {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_xDataGrid.GridOverlays, {}), topPinnedRowsData.length > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(VirtualScrollerPinnedRows, {
      className: classes.topPinnedRows,
      ownerState: (0, _extends2.default)({}, ownerState, {
        position: PinnedRowsPosition.top
      }),
      style: {
        width: contentProps.style.width,
        height: pinnedRowsHeight.top
      },
      role: "rowgroup",
      children: [leftRenderContext && /*#__PURE__*/(0, _jsxRuntime.jsx)(VirtualScrollerPinnedColumns, {
        className: classes.leftPinnedColumns,
        ownerState: (0, _extends2.default)({}, ownerState, {
          side: _columnPinning.GridPinnedPosition.left,
          showCellVerticalBorder: rootProps.showCellVerticalBorder
        }),
        children: getRows({
          renderContext: leftRenderContext,
          minFirstColumn: leftRenderContext.firstColumnIndex,
          maxLastColumn: leftRenderContext.lastColumnIndex,
          availableSpace: 0,
          rows: topPinnedRowsData,
          position: 'left'
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(VirtualScrollerPinnedRowsRenderZone, {
        className: classes.pinnedRowsRenderZone,
        ref: topPinnedRowsRenderZoneRef,
        role: "presentation",
        children: topPinnedRows
      }), rightRenderContext && /*#__PURE__*/(0, _jsxRuntime.jsx)(VirtualScrollerPinnedColumns, {
        className: classes.rightPinnedColumns,
        ownerState: (0, _extends2.default)({}, ownerState, {
          side: _columnPinning.GridPinnedPosition.right,
          showCellVerticalBorder: rootProps.showCellVerticalBorder
        }),
        children: getRows({
          renderContext: rightRenderContext,
          minFirstColumn: rightRenderContext.firstColumnIndex,
          maxLastColumn: rightRenderContext.lastColumnIndex,
          availableSpace: 0,
          rows: topPinnedRowsData,
          position: 'right'
        })
      })]
    }) : null, /*#__PURE__*/(0, _jsxRuntime.jsxs)(_internals.GridVirtualScrollerContent, (0, _extends2.default)({}, contentProps, {
      children: [leftRenderContext && /*#__PURE__*/(0, _jsxRuntime.jsx)(VirtualScrollerPinnedColumns, {
        ref: leftColumns,
        className: classes.leftPinnedColumns,
        ownerState: (0, _extends2.default)({}, ownerState, {
          side: _columnPinning.GridPinnedPosition.left,
          showCellVerticalBorder: rootProps.showCellVerticalBorder
        }),
        style: pinnedColumnsStyle,
        children: getRows({
          renderContext: leftRenderContext,
          minFirstColumn: leftRenderContext.firstColumnIndex,
          maxLastColumn: leftRenderContext.lastColumnIndex,
          availableSpace: 0,
          rowIndexOffset: topPinnedRowsData.length,
          position: 'left'
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_internals.GridVirtualScrollerRenderZone, (0, _extends2.default)({}, getRenderZoneProps(), {
        children: mainRows
      })), rightRenderContext && /*#__PURE__*/(0, _jsxRuntime.jsx)(VirtualScrollerPinnedColumns, {
        ref: rightColumns,
        ownerState: (0, _extends2.default)({}, ownerState, {
          side: _columnPinning.GridPinnedPosition.right,
          showCellVerticalBorder: rootProps.showCellVerticalBorder
        }),
        className: classes.rightPinnedColumns,
        style: pinnedColumnsStyle,
        children: getRows({
          renderContext: rightRenderContext,
          minFirstColumn: rightRenderContext.firstColumnIndex,
          maxLastColumn: rightRenderContext.lastColumnIndex,
          availableSpace: 0,
          rowIndexOffset: topPinnedRowsData.length,
          position: 'right'
        })
      }), detailPanels.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(VirtualScrollerDetailPanels, {
        className: classes.detailPanels,
        ownerState: ownerState,
        children: detailPanels
      })]
    })), bottomPinnedRowsData.length > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(VirtualScrollerPinnedRows, {
      className: classes.bottomPinnedRows,
      ownerState: (0, _extends2.default)({}, ownerState, {
        position: PinnedRowsPosition.bottom
      }),
      style: {
        width: contentProps.style.width,
        height: pinnedRowsHeight.bottom
      },
      role: "rowgroup",
      children: [leftRenderContext && /*#__PURE__*/(0, _jsxRuntime.jsx)(VirtualScrollerPinnedColumns, {
        className: classes.leftPinnedColumns,
        ownerState: (0, _extends2.default)({}, ownerState, {
          side: _columnPinning.GridPinnedPosition.left,
          showCellVerticalBorder: rootProps.showCellVerticalBorder
        }),
        children: getRows({
          renderContext: leftRenderContext,
          minFirstColumn: leftRenderContext.firstColumnIndex,
          maxLastColumn: leftRenderContext.lastColumnIndex,
          availableSpace: 0,
          rows: bottomPinnedRowsData,
          rowIndexOffset: topPinnedRowsData.length + (mainRows ? mainRows.length : 0),
          position: 'left'
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(VirtualScrollerPinnedRowsRenderZone, {
        className: classes.pinnedRowsRenderZone,
        ref: bottomPinnedRowsRenderZoneRef,
        role: "presentation",
        children: bottomPinnedRows
      }), rightRenderContext && /*#__PURE__*/(0, _jsxRuntime.jsx)(VirtualScrollerPinnedColumns, {
        className: classes.rightPinnedColumns,
        ownerState: (0, _extends2.default)({}, ownerState, {
          side: _columnPinning.GridPinnedPosition.right,
          showCellVerticalBorder: rootProps.showCellVerticalBorder
        }),
        children: getRows({
          renderContext: rightRenderContext,
          minFirstColumn: rightRenderContext.firstColumnIndex,
          maxLastColumn: rightRenderContext.lastColumnIndex,
          availableSpace: 0,
          rows: bottomPinnedRowsData,
          rowIndexOffset: topPinnedRowsData.length + (mainRows ? mainRows.length : 0),
          position: 'right'
        })
      })]
    }) : null]
  }));
});
exports.DataGridProVirtualScroller = DataGridProVirtualScroller;