import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var _excluded = ["style", "className", "innerRef", "visibleColumns", "sortColumnLookup", "filterColumnLookup", "columnPositions", "columnHeaderTabIndexState", "columnGroupHeaderTabIndexState", "columnHeaderFocus", "columnGroupHeaderFocus", "densityFactor", "headerGroupingMaxDepth", "columnMenuState", "columnVisibility", "columnGroupsHeaderStructure", "hasOtherElementInTabSequence", "pinnedColumns"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses, unstable_useEventCallback as useEventCallback } from '@mui/utils';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { getDataGridUtilityClass, gridClasses, useGridApiEventHandler, GridColumnHeaderSeparatorSides } from '@mui/x-data-grid';
import { GridBaseColumnHeaders, GridColumnHeadersInner, useGridColumnHeaders } from '@mui/x-data-grid/internals';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { GridPinnedPosition } from '../hooks/features/columnPinning';
import { filterColumns } from './DataGridProVirtualScroller';
import { jsxs as _jsxs } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var leftPinnedColumns = ownerState.leftPinnedColumns,
    rightPinnedColumns = ownerState.rightPinnedColumns,
    classes = ownerState.classes;
  var slots = {
    leftPinnedColumns: ['pinnedColumnHeaders', leftPinnedColumns && leftPinnedColumns.length > 0 && "pinnedColumnHeaders--left"],
    rightPinnedColumns: ['pinnedColumnHeaders', rightPinnedColumns && rightPinnedColumns.length > 0 && "pinnedColumnHeaders--right", 'withBorderColor']
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
var GridColumnHeadersPinnedColumnHeaders = styled('div', {
  name: 'MuiDataGrid',
  slot: 'PinnedColumnHeaders',
  overridesResolver: function overridesResolver(props, styles) {
    return [_defineProperty({}, "&.".concat(gridClasses['pinnedColumnHeaders--left']), styles['pinnedColumnHeaders--left']), _defineProperty({}, "&.".concat(gridClasses['pinnedColumnHeaders--right']), styles['pinnedColumnHeaders--right']), styles.pinnedColumnHeaders];
  }
})(function (_ref3) {
  var _theme$vars$overlays;
  var theme = _ref3.theme,
    ownerState = _ref3.ownerState;
  return _extends({
    position: 'absolute',
    top: 0,
    overflow: 'hidden',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows[2],
    backgroundColor: (theme.vars || theme).palette.background.default
  }, theme.vars ? {
    backgroundImage: (_theme$vars$overlays = theme.vars.overlays) == null ? void 0 : _theme$vars$overlays[2]
  } : _extends({}, theme.palette.mode === 'dark' && {
    backgroundImage: "linear-gradient(".concat(alpha('#fff', getOverlayAlpha(2)), ", ").concat(alpha('#fff', getOverlayAlpha(2)), ")")
  }), ownerState.side === GridPinnedPosition.left && {
    left: 0
  }, ownerState.side === GridPinnedPosition.right && {
    right: 0
  }, ownerState.side === GridPinnedPosition.right && ownerState.showCellVerticalBorder && {
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid'
  });
});
GridColumnHeadersPinnedColumnHeaders.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  ownerState: PropTypes.object.isRequired
};
var GridColumnHeaders = /*#__PURE__*/React.forwardRef(function GridColumnHeaders(props, ref) {
  var style = props.style,
    className = props.className,
    innerRef = props.innerRef,
    visibleColumns = props.visibleColumns,
    sortColumnLookup = props.sortColumnLookup,
    filterColumnLookup = props.filterColumnLookup,
    columnPositions = props.columnPositions,
    columnHeaderTabIndexState = props.columnHeaderTabIndexState,
    columnGroupHeaderTabIndexState = props.columnGroupHeaderTabIndexState,
    columnHeaderFocus = props.columnHeaderFocus,
    columnGroupHeaderFocus = props.columnGroupHeaderFocus,
    densityFactor = props.densityFactor,
    headerGroupingMaxDepth = props.headerGroupingMaxDepth,
    columnMenuState = props.columnMenuState,
    columnVisibility = props.columnVisibility,
    columnGroupsHeaderStructure = props.columnGroupsHeaderStructure,
    hasOtherElementInTabSequence = props.hasOtherElementInTabSequence,
    pinnedColumns = props.pinnedColumns,
    other = _objectWithoutProperties(props, _excluded);
  var rootProps = useGridRootProps();
  var apiRef = useGridApiContext();
  var _React$useState = React.useState(0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    scrollbarSize = _React$useState2[0],
    setScrollbarSize = _React$useState2[1];
  var theme = useTheme();
  var handleContentSizeChange = useEventCallback(function () {
    var rootDimensions = apiRef.current.getRootDimensions();
    if (!rootDimensions) {
      return;
    }
    var newScrollbarSize = rootDimensions.hasScrollY ? rootDimensions.scrollBarSize : 0;
    if (scrollbarSize !== newScrollbarSize) {
      setScrollbarSize(newScrollbarSize);
    }
  });
  useGridApiEventHandler(apiRef, 'virtualScrollerContentSizeChange', handleContentSizeChange);
  var visibleColumnFields = React.useMemo(function () {
    return visibleColumns.map(function (_ref4) {
      var field = _ref4.field;
      return field;
    });
  }, [visibleColumns]);
  var _filterColumns = filterColumns(pinnedColumns, visibleColumnFields, theme.direction === 'rtl'),
    _filterColumns2 = _slicedToArray(_filterColumns, 2),
    leftPinnedColumns = _filterColumns2[0],
    rightPinnedColumns = _filterColumns2[1];
  var _useGridColumnHeaders = useGridColumnHeaders({
      innerRef: innerRef,
      visibleColumns: visibleColumns,
      sortColumnLookup: sortColumnLookup,
      filterColumnLookup: filterColumnLookup,
      columnPositions: columnPositions,
      columnHeaderTabIndexState: columnHeaderTabIndexState,
      hasOtherElementInTabSequence: hasOtherElementInTabSequence,
      columnGroupHeaderTabIndexState: columnGroupHeaderTabIndexState,
      columnHeaderFocus: columnHeaderFocus,
      columnGroupHeaderFocus: columnGroupHeaderFocus,
      densityFactor: densityFactor,
      headerGroupingMaxDepth: headerGroupingMaxDepth,
      columnMenuState: columnMenuState,
      columnVisibility: columnVisibility,
      columnGroupsHeaderStructure: columnGroupsHeaderStructure,
      minColumnIndex: leftPinnedColumns.length
    }),
    isDragging = _useGridColumnHeaders.isDragging,
    renderContext = _useGridColumnHeaders.renderContext,
    getRootProps = _useGridColumnHeaders.getRootProps,
    getInnerProps = _useGridColumnHeaders.getInnerProps,
    getColumnHeaders = _useGridColumnHeaders.getColumnHeaders,
    getColumnGroupHeaders = _useGridColumnHeaders.getColumnGroupHeaders;
  var ownerState = _extends({}, rootProps, {
    leftPinnedColumns: leftPinnedColumns,
    rightPinnedColumns: rightPinnedColumns,
    classes: rootProps.classes
  });
  var classes = useUtilityClasses(ownerState);
  var leftRenderContext = renderContext && leftPinnedColumns.length ? _extends({}, renderContext, {
    firstColumnIndex: 0,
    lastColumnIndex: leftPinnedColumns.length
  }) : null;
  var rightRenderContext = renderContext && rightPinnedColumns.length ? _extends({}, renderContext, {
    firstColumnIndex: visibleColumnFields.length - rightPinnedColumns.length,
    lastColumnIndex: visibleColumnFields.length
  }) : null;
  var innerProps = getInnerProps();
  var pinnedColumnHeadersProps = {
    role: innerProps.role
  };
  return /*#__PURE__*/_jsxs(GridBaseColumnHeaders, _extends({
    ref: ref,
    className: className
  }, getRootProps(other), {
    children: [leftRenderContext && /*#__PURE__*/_jsxs(GridColumnHeadersPinnedColumnHeaders, _extends({
      className: classes.leftPinnedColumns,
      ownerState: _extends({}, ownerState, {
        side: GridPinnedPosition.left,
        showCellVerticalBorder: rootProps.showCellVerticalBorder
      })
    }, pinnedColumnHeadersProps, {
      children: [getColumnGroupHeaders({
        renderContext: leftRenderContext,
        minFirstColumn: leftRenderContext.firstColumnIndex,
        maxLastColumn: leftRenderContext.lastColumnIndex
      }), getColumnHeaders({
        renderContext: leftRenderContext,
        minFirstColumn: leftRenderContext.firstColumnIndex,
        maxLastColumn: leftRenderContext.lastColumnIndex
      }, {
        disableReorder: true
      })]
    })), /*#__PURE__*/_jsxs(GridColumnHeadersInner, _extends({
      isDragging: isDragging
    }, innerProps, {
      children: [getColumnGroupHeaders({
        renderContext: renderContext,
        minFirstColumn: leftPinnedColumns.length,
        maxLastColumn: visibleColumnFields.length - rightPinnedColumns.length
      }), getColumnHeaders({
        renderContext: renderContext,
        minFirstColumn: leftPinnedColumns.length,
        maxLastColumn: visibleColumnFields.length - rightPinnedColumns.length
      })]
    })), rightRenderContext && /*#__PURE__*/_jsxs(GridColumnHeadersPinnedColumnHeaders, _extends({
      ownerState: _extends({}, ownerState, {
        side: GridPinnedPosition.right,
        showCellVerticalBorder: rootProps.showCellVerticalBorder
      }),
      className: classes.rightPinnedColumns,
      style: {
        paddingRight: scrollbarSize
      }
    }, pinnedColumnHeadersProps, {
      children: [getColumnGroupHeaders({
        renderContext: rightRenderContext,
        minFirstColumn: rightRenderContext.firstColumnIndex,
        maxLastColumn: rightRenderContext.lastColumnIndex
      }), getColumnHeaders({
        renderContext: rightRenderContext,
        minFirstColumn: rightRenderContext.firstColumnIndex,
        maxLastColumn: rightRenderContext.lastColumnIndex
      }, {
        disableReorder: true,
        separatorSide: GridColumnHeaderSeparatorSides.Left
      })]
    }))]
  }));
});
process.env.NODE_ENV !== "production" ? GridColumnHeaders.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  columnGroupHeaderFocus: PropTypes.shape({
    depth: PropTypes.number.isRequired,
    field: PropTypes.string.isRequired
  }),
  columnGroupHeaderTabIndexState: PropTypes.shape({
    depth: PropTypes.number.isRequired,
    field: PropTypes.string.isRequired
  }),
  columnGroupsHeaderStructure: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    columnFields: PropTypes.arrayOf(PropTypes.string).isRequired,
    groupId: PropTypes.string
  }))).isRequired,
  columnHeaderFocus: PropTypes.shape({
    field: PropTypes.string.isRequired
  }),
  columnHeaderTabIndexState: PropTypes.shape({
    field: PropTypes.string.isRequired
  }),
  columnMenuState: PropTypes.shape({
    field: PropTypes.string,
    open: PropTypes.bool.isRequired
  }).isRequired,
  columnPositions: PropTypes.arrayOf(PropTypes.number).isRequired,
  columnVisibility: PropTypes.object.isRequired,
  densityFactor: PropTypes.number.isRequired,
  filterColumnLookup: PropTypes.object.isRequired,
  hasOtherElementInTabSequence: PropTypes.bool.isRequired,
  headerGroupingMaxDepth: PropTypes.number.isRequired,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.object
  })]),
  minColumnIndex: PropTypes.number,
  pinnedColumns: PropTypes.shape({
    left: PropTypes.arrayOf(PropTypes.string),
    right: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  sortColumnLookup: PropTypes.object.isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.object).isRequired
} : void 0;
export { GridColumnHeaders };