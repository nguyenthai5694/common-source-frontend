import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import {
  useGridSelector, getDataGridUtilityClass,
  gridClasses, gridVisibleColumnFieldsSelector, gridRowsMetaSelector,
  useGridApiEventHandler, GridOverlays,
} from '@mui/x-data-grid';
import {
  GridVirtualScroller, GridVirtualScrollerContent,
  GridVirtualScrollerRenderZone, useGridVirtualScroller, calculatePinnedRowsHeight,
} from '@mui/x-data-grid/internals';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';
import _extends from '@babel/runtime/helpers/esm/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { gridPinnedColumnsSelector, GridPinnedPosition } from '../hooks/features/columnPinning';
import {
  gridDetailPanelExpandedRowsContentCacheSelector,
  gridDetailPanelExpandedRowsHeightCacheSelector, gridDetailPanelExpandedRowIdsSelector,
} from '../hooks/features/detailPanel';
import { gridPinnedRowsSelector } from '../hooks/features/rowPinning/gridRowPinningSelector';
import { useGridPrivateApiContext } from '../hooks/utils/useGridPrivateApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { GridDetailPanel } from './GridDetailPanel';

const _excluded = ['className', 'disableVirtualization'];

export const filterColumns = (pinnedColumns, columns, invert) => {
  var _pinnedColumns$left, _pinnedColumns$right;

  if (!Array.isArray(pinnedColumns.left) && !Array.isArray(pinnedColumns.right)) {
    return [[], []];
  }

  if (((_pinnedColumns$left = pinnedColumns.left) == null ? void 0 : _pinnedColumns$left.length) === 0 &&
    ((_pinnedColumns$right = pinnedColumns.right) == null ? void 0 : _pinnedColumns$right.length) === 0) {
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
const useUtilityClasses = ownerState => {
  const {
    classes,
  } = ownerState;
  const slots = {
    leftPinnedColumns: ['pinnedColumns', 'pinnedColumns--left'],
    rightPinnedColumns: ['pinnedColumns', 'pinnedColumns--right', 'withBorderColor'],
    topPinnedRows: ['pinnedRows', 'pinnedRows--top'],
    bottomPinnedRows: ['pinnedRows', 'pinnedRows--bottom'],
    pinnedRowsRenderZone: ['pinnedRowsRenderZone'],
    detailPanels: ['detailPanels'],
    detailPanel: ['detailPanel'],
  };

  return composeClasses(slots, getDataGridUtilityClass, classes);
};
// Inspired by https://github.com/material-components/material-components-ios/
//blob/bca36107405594d5b7b16265a5b0ed698f85a5ee/components/Elevation/src/UIColor%2BMaterialElevation.m#L61
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
  return theme.vars ? 'rgba(0 0 0 /  0.21)' : alpha(theme.palette.common.black, 0.21);
};
const VirtualScrollerDetailPanels = styled('div', {
  name: 'MuiDataGrid',
  slot: 'DetailPanels',
  overridesResolver: (props, styles) => styles.detailPanels,
})({
  position: 'relative',
});
const darkModeBackgroundImage =
  `linear-gradient(${alpha('#fff', getOverlayAlpha(2))}, ${alpha('#fff', getOverlayAlpha(2))})`;
const VirtualScrollerPinnedColumns = styled('div', {
  name: 'MuiDataGrid',
  slot: 'PinnedColumns',
  overridesResolver: (props, styles) => [{
    [`&.${gridClasses['pinnedColumns--left']}`]: styles['pinnedColumns--left'],
  }, {
    [`&.${gridClasses['pinnedColumns--right']}`]: styles['pinnedColumns--right'],
  }, styles.pinnedColumns],
})(({
  theme,
  ownerState,
}) => {
  var _theme$vars$overlays;
  const boxShadowColor = getBoxShadowColor(theme);

  return _extends({
    position: 'sticky',
    overflow: 'hidden',
    zIndex: 1,
    backgroundColor: (theme.vars || theme).palette.background.default,
  }, theme.vars ? {
    backgroundImage: (_theme$vars$overlays = theme.vars.overlays) == null ? void 0 : _theme$vars$overlays[2],
  } : _extends({}, theme.palette.mode === 'dark' && {
    backgroundImage: darkModeBackgroundImage,
  }), ownerState.side === GridPinnedPosition.left && {
    left: 0,
    float: 'left',
    boxShadow: `2px 0px 4px -2px ${boxShadowColor}`,
  }, ownerState.side === GridPinnedPosition.right && {
    right: 0,
    float: 'right',
    boxShadow: `-2px 0px 4px -2px ${boxShadowColor}`,
  }, ownerState.side === GridPinnedPosition.right && ownerState.showCellVerticalBorder && {
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
  });
});
var PinnedRowsPosition = /*#__PURE__*/function (PinnedRowsPosition) {
  PinnedRowsPosition['top'] = 'top';
  PinnedRowsPosition['bottom'] = 'bottom';

  return PinnedRowsPosition;
}(PinnedRowsPosition || {});
const VirtualScrollerPinnedRows = styled('div', {
  name: 'MuiDataGrid',
  slot: 'PinnedRows',
  overridesResolver: (props, styles) => [{
    [`&.${gridClasses['pinnedRows--top']}`]: styles['pinnedRows--top'],
  }, {
    [`&.${gridClasses['pinnedRows--bottom']}`]: styles['pinnedRows--bottom'],
  }, styles.pinnedRows],
})(({
  theme,
  ownerState,
}) => {
  var _theme$vars$overlays2;
  const boxShadowColor = getBoxShadowColor(theme);

  return _extends({
    position: 'sticky',
    // should be above the detail panel
    zIndex: 3,
    backgroundColor: (theme.vars || theme).palette.background.default,
  }, theme.vars ? {
    backgroundImage: (_theme$vars$overlays2 = theme.vars.overlays) == null ? void 0 : _theme$vars$overlays2[2],
  } : _extends({}, theme.palette.mode === 'dark' && {
    backgroundImage: darkModeBackgroundImage,
  }), ownerState.position === 'top' && {
    top: 0,
    boxShadow: `0px 3px 4px -2px ${boxShadowColor}`,
  }, ownerState.position === PinnedRowsPosition.bottom && {
    boxShadow: `0px -3px 4px -2px ${boxShadowColor}`,
    bottom: 0,
  });
});
const VirtualScrollerPinnedRowsRenderZone = styled('div')({
  position: 'absolute',
});
const DataGridProVirtualScroller = /*#__PURE__*/React.forwardRef(function DataGridProVirtualScroller(props, ref) {
  const other = _objectWithoutPropertiesLoose(props, _excluded);
  const apiRef = useGridPrivateApiContext();
  const rootProps = useGridRootProps();
  const visibleColumnFields = useGridSelector(apiRef, gridVisibleColumnFieldsSelector);
  const expandedRowIds = useGridSelector(apiRef, gridDetailPanelExpandedRowIdsSelector);
  const detailPanelsContent = useGridSelector(apiRef, gridDetailPanelExpandedRowsContentCacheSelector);
  const detailPanelsHeights = useGridSelector(apiRef, gridDetailPanelExpandedRowsHeightCacheSelector);
  const leftColumns = React.useRef(null);
  const rightColumns = React.useRef(null);
  const topPinnedRowsRenderZoneRef = React.useRef(null);
  const bottomPinnedRowsRenderZoneRef = React.useRef(null);
  const theme = useTheme();
  const handleRenderZonePositioning = React.useCallback(({
    top,
    left,
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
        marginBottom: height,
      },
    };
  }, [detailPanelsHeights, expandedRowIds]);
  const pinnedColumns = useGridSelector(apiRef, gridPinnedColumnsSelector);
  const [leftPinnedColumns, rightPinnedColumns] =
    filterColumns(pinnedColumns, visibleColumnFields, theme.direction === 'rtl');
  const pinnedRows = useGridSelector(apiRef, gridPinnedRowsSelector);
  const topPinnedRowsData = React.useMemo(() => (pinnedRows == null ? void 0 : pinnedRows.top) || [], [pinnedRows]);
  const bottomPinnedRowsData = React.useMemo(() =>
    (pinnedRows == null ? void 0 : pinnedRows.bottom) || [], [pinnedRows]);
  const ownerState = _extends({}, rootProps, {
    classes: rootProps.classes,
  });
  const classes = useUtilityClasses(ownerState);
  const {
    renderContext,
    getRows,
    getRootProps,
    getContentProps,
    getRenderZoneProps,
    updateRenderZonePosition,
  } = useGridVirtualScroller(_extends({
    ref,
    renderZoneMinColumnIndex: leftPinnedColumns.length,
    renderZoneMaxColumnIndex: visibleColumnFields.length - rightPinnedColumns.length,
    onRenderZonePositioning: handleRenderZonePositioning,
    getRowProps,
  }, props));
  const refreshRenderZonePosition = React.useCallback(() => {
    if (renderContext) {
      updateRenderZonePosition(renderContext);
    }
  }, [renderContext, updateRenderZonePosition]);

  useGridApiEventHandler(apiRef, 'columnWidthChange', refreshRenderZonePosition);
  useGridApiEventHandler(apiRef, 'columnOrderChange', refreshRenderZonePosition);
  useGridApiEventHandler(apiRef, 'rowOrderChange', refreshRenderZonePosition);
  const leftRenderContext = renderContext && leftPinnedColumns.length > 0 ? _extends({}, renderContext, {
    firstColumnIndex: 0,
    lastColumnIndex: leftPinnedColumns.length,
  }) : null;
  const rightRenderContext = renderContext && rightPinnedColumns.length > 0 ? _extends({}, renderContext, {
    firstColumnIndex: visibleColumnFields.length - rightPinnedColumns.length,
    lastColumnIndex: visibleColumnFields.length,
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
    const rowsMeta = gridRowsMetaSelector(apiRef.current.state);
    const content = detailPanelsContent[rowId];

    // Check if the id exists in the current page
    const rowIndex = apiRef.current.getRowIndexRelativeToVisibleRows(rowId);
    const exists = rowIndex !== undefined;

    if ( /*#__PURE__*/React.isValidElement(content) && exists) {
      const hasAutoHeight = apiRef.current.detailPanelHasAutoHeight(rowId);
      const height = hasAutoHeight ? 'auto' : detailPanelsHeights[rowId];
      const sizes = apiRef.current.unstable_getRowInternalSizes(rowId);
      const spacingTop = (sizes == null ? void 0 : sizes.spacingTop) || 0;
      const top = rowsMeta.positions[rowIndex] + apiRef.current.unstable_getRowHeight(rowId) + spacingTop;

      return /*#__PURE__*/_jsx(GridDetailPanel, {
        rowId,
        style: {
          top,
        },
        height,
        className: classes.detailPanel,
        children: content,
      }, rowId);
    }

    return null;
  };
  const detailPanels = [];
  const topPinnedRows = getRows({
    renderContext,
    rows: topPinnedRowsData,
    position: 'center',
  });
  const pinnedRowsHeight = calculatePinnedRowsHeight(apiRef);
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
    },
  });
  const bottomPinnedRows = getRows({
    renderContext,
    rows: bottomPinnedRowsData,
    rowIndexOffset: topPinnedRowsData.length + (mainRows ? mainRows.length : 0),
    position: 'center',
  });
  const contentProps = getContentProps();
  const pinnedColumnsStyle = {
    minHeight: contentProps.style.minHeight,
  };

  if (contentProps.style.minHeight && contentProps.style.minHeight === '100%') {
    contentProps.style.minHeight = `calc(100% - ${pinnedRowsHeight.top}px - ${pinnedRowsHeight.bottom}px)`;
  }

  return /*#__PURE__*/_jsxs(GridVirtualScroller, _extends({}, getRootProps(other), {
    children: [/*#__PURE__*/_jsx(GridOverlays, {}),
    topPinnedRowsData.length > 0 ? /*#__PURE__*/_jsxs(VirtualScrollerPinnedRows, {
      className: classes.topPinnedRows,
      ownerState: _extends({}, ownerState, {
        position: PinnedRowsPosition.top,
      }),
      style: {
        width: contentProps.style.width,
        height: pinnedRowsHeight.top,
      },
      role: 'rowgroup',
      children: [leftRenderContext && /*#__PURE__*/_jsx(VirtualScrollerPinnedColumns, {
        className: classes.leftPinnedColumns,
        ownerState: _extends({}, ownerState, {
          side: GridPinnedPosition.left,
          showCellVerticalBorder: rootProps.showCellVerticalBorder,
        }),
        children: getRows({
          renderContext: leftRenderContext,
          minFirstColumn: leftRenderContext.firstColumnIndex,
          maxLastColumn: leftRenderContext.lastColumnIndex,
          availableSpace: 0,
          rows: topPinnedRowsData,
          position: 'left',
        }),
      }), /*#__PURE__*/_jsx(VirtualScrollerPinnedRowsRenderZone, {
        className: classes.pinnedRowsRenderZone,
        ref: topPinnedRowsRenderZoneRef,
        role: 'presentation',
        children: topPinnedRows,
      }), rightRenderContext && /*#__PURE__*/_jsx(VirtualScrollerPinnedColumns, {
        className: classes.rightPinnedColumns,
        ownerState: _extends({}, ownerState, {
          side: GridPinnedPosition.right,
          showCellVerticalBorder: rootProps.showCellVerticalBorder,
        }),
        children: getRows({
          renderContext: rightRenderContext,
          minFirstColumn: rightRenderContext.firstColumnIndex,
          maxLastColumn: rightRenderContext.lastColumnIndex,
          availableSpace: 0,
          rows: topPinnedRowsData,
          position: 'right',
        }),
      })],
    }) : null, /*#__PURE__*/_jsxs(GridVirtualScrollerContent, _extends({}, contentProps, {
      children: [leftRenderContext && /*#__PURE__*/_jsx(VirtualScrollerPinnedColumns, {
        ref: leftColumns,
        className: classes.leftPinnedColumns,
        ownerState: _extends({}, ownerState, {
          side: GridPinnedPosition.left,
          showCellVerticalBorder: rootProps.showCellVerticalBorder,
        }),
        style: pinnedColumnsStyle,
        children: getRows({
          renderContext: leftRenderContext,
          minFirstColumn: leftRenderContext.firstColumnIndex,
          maxLastColumn: leftRenderContext.lastColumnIndex,
          availableSpace: 0,
          rowIndexOffset: topPinnedRowsData.length,
          position: 'left',
        }),
      }), /*#__PURE__*/_jsx(GridVirtualScrollerRenderZone, _extends({}, getRenderZoneProps(), {
        children: mainRows,
      })), rightRenderContext && /*#__PURE__*/_jsx(VirtualScrollerPinnedColumns, {
        ref: rightColumns,
        ownerState: _extends({}, ownerState, {
          side: GridPinnedPosition.right,
          showCellVerticalBorder: rootProps.showCellVerticalBorder,
        }),
        className: classes.rightPinnedColumns,
        style: pinnedColumnsStyle,
        children: getRows({
          renderContext: rightRenderContext,
          minFirstColumn: rightRenderContext.firstColumnIndex,
          maxLastColumn: rightRenderContext.lastColumnIndex,
          availableSpace: 0,
          rowIndexOffset: topPinnedRowsData.length,
          position: 'right',
        }),
      }), detailPanels.length > 0 && /*#__PURE__*/_jsx(VirtualScrollerDetailPanels, {
        className: classes.detailPanels,
        ownerState,
        children: detailPanels,
      })],
    })), bottomPinnedRowsData.length > 0 ? /*#__PURE__*/_jsxs(VirtualScrollerPinnedRows, {
      className: classes.bottomPinnedRows,
      ownerState: _extends({}, ownerState, {
        position: PinnedRowsPosition.bottom,
      }),
      style: {
        width: contentProps.style.width,
        height: pinnedRowsHeight.bottom,
      },
      role: 'rowgroup',
      children: [leftRenderContext && /*#__PURE__*/_jsx(VirtualScrollerPinnedColumns, {
        className: classes.leftPinnedColumns,
        ownerState: _extends({}, ownerState, {
          side: GridPinnedPosition.left,
          showCellVerticalBorder: rootProps.showCellVerticalBorder,
        }),
        children: getRows({
          renderContext: leftRenderContext,
          minFirstColumn: leftRenderContext.firstColumnIndex,
          maxLastColumn: leftRenderContext.lastColumnIndex,
          availableSpace: 0,
          rows: bottomPinnedRowsData,
          rowIndexOffset: topPinnedRowsData.length + (mainRows ? mainRows.length : 0),
          position: 'left',
        }),
      }), /*#__PURE__*/_jsx(VirtualScrollerPinnedRowsRenderZone, {
        className: classes.pinnedRowsRenderZone,
        ref: bottomPinnedRowsRenderZoneRef,
        role: 'presentation',
        children: bottomPinnedRows,
      }), rightRenderContext && /*#__PURE__*/_jsx(VirtualScrollerPinnedColumns, {
        className: classes.rightPinnedColumns,
        ownerState: _extends({}, ownerState, {
          side: GridPinnedPosition.right,
          showCellVerticalBorder: rootProps.showCellVerticalBorder,
        }),
        children: getRows({
          renderContext: rightRenderContext,
          minFirstColumn: rightRenderContext.firstColumnIndex,
          maxLastColumn: rightRenderContext.lastColumnIndex,
          availableSpace: 0,
          rows: bottomPinnedRowsData,
          rowIndexOffset: topPinnedRowsData.length + (mainRows ? mainRows.length : 0),
          position: 'right',
        }),
      })],
    }) : null],
  }));
});

export { DataGridProVirtualScroller };