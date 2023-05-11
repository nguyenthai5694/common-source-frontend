import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var _excluded = ["className", "disableVirtualization"];
import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { useGridSelector, getDataGridUtilityClass, gridClasses, gridVisibleColumnFieldsSelector, gridRowsMetaSelector, useGridApiEventHandler, GridOverlays } from '@mui/x-data-grid';
import { GridVirtualScroller, GridVirtualScrollerContent, GridVirtualScrollerRenderZone, useGridVirtualScroller, calculatePinnedRowsHeight } from '@mui/x-data-grid/internals';
import { useGridPrivateApiContext } from '../hooks/utils/useGridPrivateApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { gridPinnedColumnsSelector, GridPinnedPosition } from '../hooks/features/columnPinning';
import { gridDetailPanelExpandedRowsContentCacheSelector, gridDetailPanelExpandedRowsHeightCacheSelector, gridDetailPanelExpandedRowIdsSelector } from '../hooks/features/detailPanel';
import { GridDetailPanel } from './GridDetailPanel';
import { gridPinnedRowsSelector } from '../hooks/features/rowPinning/gridRowPinningSelector';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var filterColumns = function filterColumns(pinnedColumns, columns, invert) {
  var _pinnedColumns$left, _pinnedColumns$right;
  if (!Array.isArray(pinnedColumns.left) && !Array.isArray(pinnedColumns.right)) {
    return [[], []];
  }
  if (((_pinnedColumns$left = pinnedColumns.left) == null ? void 0 : _pinnedColumns$left.length) === 0 && ((_pinnedColumns$right = pinnedColumns.right) == null ? void 0 : _pinnedColumns$right.length) === 0) {
    return [[], []];
  }
  var filter = function filter(newPinnedColumns, remainingColumns) {
    if (!Array.isArray(newPinnedColumns)) {
      return [];
    }
    return newPinnedColumns.filter(function (field) {
      return remainingColumns.includes(field);
    });
  };
  var leftPinnedColumns = filter(pinnedColumns.left, columns);
  var columnsWithoutLeftPinnedColumns = columns.filter(
  // Filter out from the remaining columns those columns already pinned to the left
  function (field) {
    return !leftPinnedColumns.includes(field);
  });
  var rightPinnedColumns = filter(pinnedColumns.right, columnsWithoutLeftPinnedColumns);
  if (invert) {
    return [rightPinnedColumns, leftPinnedColumns];
  }
  return [leftPinnedColumns, rightPinnedColumns];
};
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    leftPinnedColumns: ['pinnedColumns', 'pinnedColumns--left'],
    rightPinnedColumns: ['pinnedColumns', 'pinnedColumns--right', 'withBorderColor'],
    topPinnedRows: ['pinnedRows', 'pinnedRows--top'],
    bottomPinnedRows: ['pinnedRows', 'pinnedRows--bottom'],
    pinnedRowsRenderZone: ['pinnedRowsRenderZone'],
    detailPanels: ['detailPanels'],
    detailPanel: ['detailPanel']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
// Inspired by https://github.com/material-components/material-components-ios/blob/bca36107405594d5b7b16265a5b0ed698f85a5ee/components/Elevation/src/UIColor%2BMaterialElevation.m#L61
var getOverlayAlpha = function getOverlayAlpha(elevation) {
  var alphaValue;
  if (elevation < 1) {
    alphaValue = 5.11916 * Math.pow(elevation, 2);
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }
  return alphaValue / 100;
};
var getBoxShadowColor = function getBoxShadowColor(theme) {
  return theme.vars ? "rgba(0 0 0 /  0.21)" : alpha(theme.palette.common.black, 0.21);
};
var VirtualScrollerDetailPanels = styled('div', {
  name: 'MuiDataGrid',
  slot: 'DetailPanels',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.detailPanels;
  }
})({
  position: 'relative'
});
var darkModeBackgroundImage = "linear-gradient(".concat(alpha('#fff', getOverlayAlpha(2)), ", ").concat(alpha('#fff', getOverlayAlpha(2)), ")");
var VirtualScrollerPinnedColumns = styled('div', {
  name: 'MuiDataGrid',
  slot: 'PinnedColumns',
  overridesResolver: function overridesResolver(props, styles) {
    return [_defineProperty({}, "&.".concat(gridClasses['pinnedColumns--left']), styles['pinnedColumns--left']), _defineProperty({}, "&.".concat(gridClasses['pinnedColumns--right']), styles['pinnedColumns--right']), styles.pinnedColumns];
  }
})(function (_ref3) {
  var _theme$vars$overlays;
  var theme = _ref3.theme,
    ownerState = _ref3.ownerState;
  var boxShadowColor = getBoxShadowColor(theme);
  return _extends({
    position: 'sticky',
    overflow: 'hidden',
    zIndex: 1,
    backgroundColor: (theme.vars || theme).palette.background.default
  }, theme.vars ? {
    backgroundImage: (_theme$vars$overlays = theme.vars.overlays) == null ? void 0 : _theme$vars$overlays[2]
  } : _extends({}, theme.palette.mode === 'dark' && {
    backgroundImage: darkModeBackgroundImage
  }), ownerState.side === GridPinnedPosition.left && {
    left: 0,
    float: 'left',
    boxShadow: "2px 0px 4px -2px ".concat(boxShadowColor)
  }, ownerState.side === GridPinnedPosition.right && {
    right: 0,
    float: 'right',
    boxShadow: "-2px 0px 4px -2px ".concat(boxShadowColor)
  }, ownerState.side === GridPinnedPosition.right && ownerState.showCellVerticalBorder && {
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid'
  });
});
var PinnedRowsPosition = /*#__PURE__*/function (PinnedRowsPosition) {
  PinnedRowsPosition["top"] = "top";
  PinnedRowsPosition["bottom"] = "bottom";
  return PinnedRowsPosition;
}(PinnedRowsPosition || {});
var VirtualScrollerPinnedRows = styled('div', {
  name: 'MuiDataGrid',
  slot: 'PinnedRows',
  overridesResolver: function overridesResolver(props, styles) {
    return [_defineProperty({}, "&.".concat(gridClasses['pinnedRows--top']), styles['pinnedRows--top']), _defineProperty({}, "&.".concat(gridClasses['pinnedRows--bottom']), styles['pinnedRows--bottom']), styles.pinnedRows];
  }
})(function (_ref6) {
  var _theme$vars$overlays2;
  var theme = _ref6.theme,
    ownerState = _ref6.ownerState;
  var boxShadowColor = getBoxShadowColor(theme);
  return _extends({
    position: 'sticky',
    // should be above the detail panel
    zIndex: 3,
    backgroundColor: (theme.vars || theme).palette.background.default
  }, theme.vars ? {
    backgroundImage: (_theme$vars$overlays2 = theme.vars.overlays) == null ? void 0 : _theme$vars$overlays2[2]
  } : _extends({}, theme.palette.mode === 'dark' && {
    backgroundImage: darkModeBackgroundImage
  }), ownerState.position === 'top' && {
    top: 0,
    boxShadow: "0px 3px 4px -2px ".concat(boxShadowColor)
  }, ownerState.position === PinnedRowsPosition.bottom && {
    boxShadow: "0px -3px 4px -2px ".concat(boxShadowColor),
    bottom: 0
  });
});
var VirtualScrollerPinnedRowsRenderZone = styled('div')({
  position: 'absolute'
});
var DataGridProVirtualScroller = /*#__PURE__*/React.forwardRef(function DataGridProVirtualScroller(props, ref) {
  var className = props.className,
    disableVirtualization = props.disableVirtualization,
    other = _objectWithoutProperties(props, _excluded);
  var apiRef = useGridPrivateApiContext();
  var rootProps = useGridRootProps();
  var visibleColumnFields = useGridSelector(apiRef, gridVisibleColumnFieldsSelector);
  var expandedRowIds = useGridSelector(apiRef, gridDetailPanelExpandedRowIdsSelector);
  var detailPanelsContent = useGridSelector(apiRef, gridDetailPanelExpandedRowsContentCacheSelector);
  var detailPanelsHeights = useGridSelector(apiRef, gridDetailPanelExpandedRowsHeightCacheSelector);
  var leftColumns = React.useRef(null);
  var rightColumns = React.useRef(null);
  var topPinnedRowsRenderZoneRef = React.useRef(null);
  var bottomPinnedRowsRenderZoneRef = React.useRef(null);
  var theme = useTheme();
  var handleRenderZonePositioning = React.useCallback(function (_ref7) {
    var top = _ref7.top,
      left = _ref7.left;
    if (leftColumns.current) {
      leftColumns.current.style.transform = "translate3d(0px, ".concat(top, "px, 0px)");
    }
    if (rightColumns.current) {
      rightColumns.current.style.transform = "translate3d(0px, ".concat(top, "px, 0px)");
    }
    if (topPinnedRowsRenderZoneRef.current) {
      topPinnedRowsRenderZoneRef.current.style.transform = "translate3d(".concat(left, "px, 0px, 0px)");
    }
    if (bottomPinnedRowsRenderZoneRef.current) {
      bottomPinnedRowsRenderZoneRef.current.style.transform = "translate3d(".concat(left, "px, 0px, 0px)");
    }
  }, []);
  var getRowProps = React.useCallback(function (id) {
    if (!expandedRowIds.includes(id)) {
      return null;
    }
    var height = detailPanelsHeights[id];
    return {
      style: {
        marginBottom: height
      }
    };
  }, [detailPanelsHeights, expandedRowIds]);
  var pinnedColumns = useGridSelector(apiRef, gridPinnedColumnsSelector);
  var _filterColumns = filterColumns(pinnedColumns, visibleColumnFields, theme.direction === 'rtl'),
    _filterColumns2 = _slicedToArray(_filterColumns, 2),
    leftPinnedColumns = _filterColumns2[0],
    rightPinnedColumns = _filterColumns2[1];
  var pinnedRows = useGridSelector(apiRef, gridPinnedRowsSelector);
  var topPinnedRowsData = React.useMemo(function () {
    return (pinnedRows == null ? void 0 : pinnedRows.top) || [];
  }, [pinnedRows == null ? void 0 : pinnedRows.top]);
  var bottomPinnedRowsData = React.useMemo(function () {
    return (pinnedRows == null ? void 0 : pinnedRows.bottom) || [];
  }, [pinnedRows == null ? void 0 : pinnedRows.bottom]);
  var ownerState = _extends({}, rootProps, {
    classes: rootProps.classes
  });
  var classes = useUtilityClasses(ownerState);
  var _useGridVirtualScroll = useGridVirtualScroller(_extends({
      ref: ref,
      renderZoneMinColumnIndex: leftPinnedColumns.length,
      renderZoneMaxColumnIndex: visibleColumnFields.length - rightPinnedColumns.length,
      onRenderZonePositioning: handleRenderZonePositioning,
      getRowProps: getRowProps
    }, props)),
    renderContext = _useGridVirtualScroll.renderContext,
    getRows = _useGridVirtualScroll.getRows,
    getRootProps = _useGridVirtualScroll.getRootProps,
    getContentProps = _useGridVirtualScroll.getContentProps,
    getRenderZoneProps = _useGridVirtualScroll.getRenderZoneProps,
    updateRenderZonePosition = _useGridVirtualScroll.updateRenderZonePosition;
  var refreshRenderZonePosition = React.useCallback(function () {
    if (renderContext) {
      updateRenderZonePosition(renderContext);
    }
  }, [renderContext, updateRenderZonePosition]);
  useGridApiEventHandler(apiRef, 'columnWidthChange', refreshRenderZonePosition);
  useGridApiEventHandler(apiRef, 'columnOrderChange', refreshRenderZonePosition);
  useGridApiEventHandler(apiRef, 'rowOrderChange', refreshRenderZonePosition);
  var leftRenderContext = renderContext && leftPinnedColumns.length > 0 ? _extends({}, renderContext, {
    firstColumnIndex: 0,
    lastColumnIndex: leftPinnedColumns.length
  }) : null;
  var rightRenderContext = renderContext && rightPinnedColumns.length > 0 ? _extends({}, renderContext, {
    firstColumnIndex: visibleColumnFields.length - rightPinnedColumns.length,
    lastColumnIndex: visibleColumnFields.length
  }) : null;

  // Create a lookup for faster check if the row is expanded
  var expandedRowIdsLookup = React.useMemo(function () {
    var lookup = {};
    expandedRowIds.forEach(function (id) {
      lookup[id] = true;
    });
    return lookup;
  }, [expandedRowIds]);
  var getDetailPanel = function getDetailPanel(rowId) {
    var rowsMeta = gridRowsMetaSelector(apiRef.current.state);
    var content = detailPanelsContent[rowId];

    // Check if the id exists in the current page
    var rowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(rowId);
    var exists = rowIndex !== undefined;
    if ( /*#__PURE__*/React.isValidElement(content) && exists) {
      var hasAutoHeight = apiRef.current.detailPanelHasAutoHeight(rowId);
      var height = hasAutoHeight ? 'auto' : detailPanelsHeights[rowId];
      var sizes = apiRef.current.unstable_getRowInternalSizes(rowId);
      var spacingTop = (sizes == null ? void 0 : sizes.spacingTop) || 0;
      var top = rowsMeta.positions[rowIndex] + apiRef.current.unstable_getRowHeight(rowId) + spacingTop;
      return /*#__PURE__*/_jsx(GridDetailPanel, {
        rowId: rowId,
        style: {
          top: top
        },
        height: height,
        className: classes.detailPanel,
        children: content
      }, rowId);
    }
    return null;
  };
  var detailPanels = [];
  var topPinnedRows = getRows({
    renderContext: renderContext,
    rows: topPinnedRowsData,
    position: 'center'
  });
  var pinnedRowsHeight = calculatePinnedRowsHeight(apiRef);
  var mainRows = getRows({
    renderContext: renderContext,
    rowIndexOffset: topPinnedRowsData.length,
    position: 'center',
    onRowRender: function onRowRender(rowId) {
      if (rootProps.getDetailPanelContent == null) {
        return;
      }
      if (!expandedRowIdsLookup[rowId]) {
        return;
      }
      var detailPanel = getDetailPanel(rowId);
      if (detailPanel) {
        detailPanels.push(detailPanel);
      }
    }
  });
  var bottomPinnedRows = getRows({
    renderContext: renderContext,
    rows: bottomPinnedRowsData,
    rowIndexOffset: topPinnedRowsData.length + (mainRows ? mainRows.length : 0),
    position: 'center'
  });
  var contentProps = getContentProps();
  var pinnedColumnsStyle = {
    minHeight: contentProps.style.minHeight
  };
  if (contentProps.style.minHeight && contentProps.style.minHeight === '100%') {
    contentProps.style.minHeight = "calc(100% - ".concat(pinnedRowsHeight.top, "px - ").concat(pinnedRowsHeight.bottom, "px)");
  }
  return /*#__PURE__*/_jsxs(GridVirtualScroller, _extends({}, getRootProps(other), {
    children: [/*#__PURE__*/_jsx(GridOverlays, {}), topPinnedRowsData.length > 0 ? /*#__PURE__*/_jsxs(VirtualScrollerPinnedRows, {
      className: classes.topPinnedRows,
      ownerState: _extends({}, ownerState, {
        position: PinnedRowsPosition.top
      }),
      style: {
        width: contentProps.style.width,
        height: pinnedRowsHeight.top
      },
      role: "rowgroup",
      children: [leftRenderContext && /*#__PURE__*/_jsx(VirtualScrollerPinnedColumns, {
        className: classes.leftPinnedColumns,
        ownerState: _extends({}, ownerState, {
          side: GridPinnedPosition.left,
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
      }), /*#__PURE__*/_jsx(VirtualScrollerPinnedRowsRenderZone, {
        className: classes.pinnedRowsRenderZone,
        ref: topPinnedRowsRenderZoneRef,
        role: "presentation",
        children: topPinnedRows
      }), rightRenderContext && /*#__PURE__*/_jsx(VirtualScrollerPinnedColumns, {
        className: classes.rightPinnedColumns,
        ownerState: _extends({}, ownerState, {
          side: GridPinnedPosition.right,
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
    }) : null, /*#__PURE__*/_jsxs(GridVirtualScrollerContent, _extends({}, contentProps, {
      children: [leftRenderContext && /*#__PURE__*/_jsx(VirtualScrollerPinnedColumns, {
        ref: leftColumns,
        className: classes.leftPinnedColumns,
        ownerState: _extends({}, ownerState, {
          side: GridPinnedPosition.left,
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
      }), /*#__PURE__*/_jsx(GridVirtualScrollerRenderZone, _extends({}, getRenderZoneProps(), {
        children: mainRows
      })), rightRenderContext && /*#__PURE__*/_jsx(VirtualScrollerPinnedColumns, {
        ref: rightColumns,
        ownerState: _extends({}, ownerState, {
          side: GridPinnedPosition.right,
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
      }), detailPanels.length > 0 && /*#__PURE__*/_jsx(VirtualScrollerDetailPanels, {
        className: classes.detailPanels,
        ownerState: ownerState,
        children: detailPanels
      })]
    })), bottomPinnedRowsData.length > 0 ? /*#__PURE__*/_jsxs(VirtualScrollerPinnedRows, {
      className: classes.bottomPinnedRows,
      ownerState: _extends({}, ownerState, {
        position: PinnedRowsPosition.bottom
      }),
      style: {
        width: contentProps.style.width,
        height: pinnedRowsHeight.bottom
      },
      role: "rowgroup",
      children: [leftRenderContext && /*#__PURE__*/_jsx(VirtualScrollerPinnedColumns, {
        className: classes.leftPinnedColumns,
        ownerState: _extends({}, ownerState, {
          side: GridPinnedPosition.left,
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
      }), /*#__PURE__*/_jsx(VirtualScrollerPinnedRowsRenderZone, {
        className: classes.pinnedRowsRenderZone,
        ref: bottomPinnedRowsRenderZoneRef,
        role: "presentation",
        children: bottomPinnedRows
      }), rightRenderContext && /*#__PURE__*/_jsx(VirtualScrollerPinnedColumns, {
        className: classes.rightPinnedColumns,
        ownerState: _extends({}, ownerState, {
          side: GridPinnedPosition.right,
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
export { DataGridProVirtualScroller };