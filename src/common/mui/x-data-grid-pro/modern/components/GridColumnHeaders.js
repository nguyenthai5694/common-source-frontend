import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["style", "className", "innerRef", "visibleColumns", "sortColumnLookup", "filterColumnLookup", "columnPositions", "columnHeaderTabIndexState", "columnGroupHeaderTabIndexState", "columnHeaderFocus", "columnGroupHeaderFocus", "densityFactor", "headerGroupingMaxDepth", "columnMenuState", "columnVisibility", "columnGroupsHeaderStructure", "hasOtherElementInTabSequence", "pinnedColumns"];
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
const useUtilityClasses = ownerState => {
  const {
    leftPinnedColumns,
    rightPinnedColumns,
    classes
  } = ownerState;
  const slots = {
    leftPinnedColumns: ['pinnedColumnHeaders', leftPinnedColumns && leftPinnedColumns.length > 0 && `pinnedColumnHeaders--left`],
    rightPinnedColumns: ['pinnedColumnHeaders', rightPinnedColumns && rightPinnedColumns.length > 0 && `pinnedColumnHeaders--right`, 'withBorderColor']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
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
const GridColumnHeadersPinnedColumnHeaders = styled('div', {
  name: 'MuiDataGrid',
  slot: 'PinnedColumnHeaders',
  overridesResolver: (props, styles) => [{
    [`&.${gridClasses['pinnedColumnHeaders--left']}`]: styles['pinnedColumnHeaders--left']
  }, {
    [`&.${gridClasses['pinnedColumnHeaders--right']}`]: styles['pinnedColumnHeaders--right']
  }, styles.pinnedColumnHeaders]
})(({
  theme,
  ownerState
}) => _extends({
  position: 'absolute',
  top: 0,
  overflow: 'hidden',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  boxShadow: theme.shadows[2],
  backgroundColor: (theme.vars || theme).palette.background.default
}, theme.vars ? {
  backgroundImage: theme.vars.overlays?.[2]
} : _extends({}, theme.palette.mode === 'dark' && {
  backgroundImage: `linear-gradient(${alpha('#fff', getOverlayAlpha(2))}, ${alpha('#fff', getOverlayAlpha(2))})`
}), ownerState.side === GridPinnedPosition.left && {
  left: 0
}, ownerState.side === GridPinnedPosition.right && {
  right: 0
}, ownerState.side === GridPinnedPosition.right && ownerState.showCellVerticalBorder && {
  borderLeftWidth: '1px',
  borderLeftStyle: 'solid'
}));
GridColumnHeadersPinnedColumnHeaders.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  ownerState: PropTypes.object.isRequired
};
const GridColumnHeaders = /*#__PURE__*/React.forwardRef(function GridColumnHeaders(props, ref) {
  const {
      className,
      innerRef,
      visibleColumns,
      sortColumnLookup,
      filterColumnLookup,
      columnPositions,
      columnHeaderTabIndexState,
      columnGroupHeaderTabIndexState,
      columnHeaderFocus,
      columnGroupHeaderFocus,
      densityFactor,
      headerGroupingMaxDepth,
      columnMenuState,
      columnVisibility,
      columnGroupsHeaderStructure,
      hasOtherElementInTabSequence,
      pinnedColumns
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const rootProps = useGridRootProps();
  const apiRef = useGridApiContext();
  const [scrollbarSize, setScrollbarSize] = React.useState(0);
  const theme = useTheme();
  const handleContentSizeChange = useEventCallback(() => {
    const rootDimensions = apiRef.current.getRootDimensions();
    if (!rootDimensions) {
      return;
    }
    const newScrollbarSize = rootDimensions.hasScrollY ? rootDimensions.scrollBarSize : 0;
    if (scrollbarSize !== newScrollbarSize) {
      setScrollbarSize(newScrollbarSize);
    }
  });
  useGridApiEventHandler(apiRef, 'virtualScrollerContentSizeChange', handleContentSizeChange);
  const visibleColumnFields = React.useMemo(() => visibleColumns.map(({
    field
  }) => field), [visibleColumns]);
  const [leftPinnedColumns, rightPinnedColumns] = filterColumns(pinnedColumns, visibleColumnFields, theme.direction === 'rtl');
  const {
    isDragging,
    renderContext,
    getRootProps,
    getInnerProps,
    getColumnHeaders,
    getColumnGroupHeaders
  } = useGridColumnHeaders({
    innerRef,
    visibleColumns,
    sortColumnLookup,
    filterColumnLookup,
    columnPositions,
    columnHeaderTabIndexState,
    hasOtherElementInTabSequence,
    columnGroupHeaderTabIndexState,
    columnHeaderFocus,
    columnGroupHeaderFocus,
    densityFactor,
    headerGroupingMaxDepth,
    columnMenuState,
    columnVisibility,
    columnGroupsHeaderStructure,
    minColumnIndex: leftPinnedColumns.length
  });
  const ownerState = _extends({}, rootProps, {
    leftPinnedColumns,
    rightPinnedColumns,
    classes: rootProps.classes
  });
  const classes = useUtilityClasses(ownerState);
  const leftRenderContext = renderContext && leftPinnedColumns.length ? _extends({}, renderContext, {
    firstColumnIndex: 0,
    lastColumnIndex: leftPinnedColumns.length
  }) : null;
  const rightRenderContext = renderContext && rightPinnedColumns.length ? _extends({}, renderContext, {
    firstColumnIndex: visibleColumnFields.length - rightPinnedColumns.length,
    lastColumnIndex: visibleColumnFields.length
  }) : null;
  const innerProps = getInnerProps();
  const pinnedColumnHeadersProps = {
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
        renderContext,
        minFirstColumn: leftPinnedColumns.length,
        maxLastColumn: visibleColumnFields.length - rightPinnedColumns.length
      }), getColumnHeaders({
        renderContext,
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