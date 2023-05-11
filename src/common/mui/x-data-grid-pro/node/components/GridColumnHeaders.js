"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnHeaders = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/utils");
var _styles = require("@mui/material/styles");
var _xDataGrid = require("@mui/x-data-grid");
var _internals = require("@mui/x-data-grid/internals");
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _useGridApiContext = require("../hooks/utils/useGridApiContext");
var _columnPinning = require("../hooks/features/columnPinning");
var _DataGridProVirtualScroller = require("./DataGridProVirtualScroller");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["style", "className", "innerRef", "visibleColumns", "sortColumnLookup", "filterColumnLookup", "columnPositions", "columnHeaderTabIndexState", "columnGroupHeaderTabIndexState", "columnHeaderFocus", "columnGroupHeaderFocus", "densityFactor", "headerGroupingMaxDepth", "columnMenuState", "columnVisibility", "columnGroupsHeaderStructure", "hasOtherElementInTabSequence", "pinnedColumns"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
const GridColumnHeadersPinnedColumnHeaders = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'PinnedColumnHeaders',
  overridesResolver: (props, styles) => [{
    [`&.${_xDataGrid.gridClasses['pinnedColumnHeaders--left']}`]: styles['pinnedColumnHeaders--left']
  }, {
    [`&.${_xDataGrid.gridClasses['pinnedColumnHeaders--right']}`]: styles['pinnedColumnHeaders--right']
  }, styles.pinnedColumnHeaders]
})(({
  theme,
  ownerState
}) => (0, _extends2.default)({
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
} : (0, _extends2.default)({}, theme.palette.mode === 'dark' && {
  backgroundImage: `linear-gradient(${(0, _styles.alpha)('#fff', getOverlayAlpha(2))}, ${(0, _styles.alpha)('#fff', getOverlayAlpha(2))})`
}), ownerState.side === _columnPinning.GridPinnedPosition.left && {
  left: 0
}, ownerState.side === _columnPinning.GridPinnedPosition.right && {
  right: 0
}, ownerState.side === _columnPinning.GridPinnedPosition.right && ownerState.showCellVerticalBorder && {
  borderLeftWidth: '1px',
  borderLeftStyle: 'solid'
}));
GridColumnHeadersPinnedColumnHeaders.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  ownerState: _propTypes.default.object.isRequired
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
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const [scrollbarSize, setScrollbarSize] = React.useState(0);
  const theme = (0, _styles.useTheme)();
  const handleContentSizeChange = (0, _utils.unstable_useEventCallback)(() => {
    const rootDimensions = apiRef.current.getRootDimensions();
    if (!rootDimensions) {
      return;
    }
    const newScrollbarSize = rootDimensions.hasScrollY ? rootDimensions.scrollBarSize : 0;
    if (scrollbarSize !== newScrollbarSize) {
      setScrollbarSize(newScrollbarSize);
    }
  });
  (0, _xDataGrid.useGridApiEventHandler)(apiRef, 'virtualScrollerContentSizeChange', handleContentSizeChange);
  const visibleColumnFields = React.useMemo(() => visibleColumns.map(({
    field
  }) => field), [visibleColumns]);
  const [leftPinnedColumns, rightPinnedColumns] = (0, _DataGridProVirtualScroller.filterColumns)(pinnedColumns, visibleColumnFields, theme.direction === 'rtl');
  const {
    isDragging,
    renderContext,
    getRootProps,
    getInnerProps,
    getColumnHeaders,
    getColumnGroupHeaders
  } = (0, _internals.useGridColumnHeaders)({
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
  const ownerState = (0, _extends2.default)({}, rootProps, {
    leftPinnedColumns,
    rightPinnedColumns,
    classes: rootProps.classes
  });
  const classes = useUtilityClasses(ownerState);
  const leftRenderContext = renderContext && leftPinnedColumns.length ? (0, _extends2.default)({}, renderContext, {
    firstColumnIndex: 0,
    lastColumnIndex: leftPinnedColumns.length
  }) : null;
  const rightRenderContext = renderContext && rightPinnedColumns.length ? (0, _extends2.default)({}, renderContext, {
    firstColumnIndex: visibleColumnFields.length - rightPinnedColumns.length,
    lastColumnIndex: visibleColumnFields.length
  }) : null;
  const innerProps = getInnerProps();
  const pinnedColumnHeadersProps = {
    role: innerProps.role
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_internals.GridBaseColumnHeaders, (0, _extends2.default)({
    ref: ref,
    className: className
  }, getRootProps(other), {
    children: [leftRenderContext && /*#__PURE__*/(0, _jsxRuntime.jsxs)(GridColumnHeadersPinnedColumnHeaders, (0, _extends2.default)({
      className: classes.leftPinnedColumns,
      ownerState: (0, _extends2.default)({}, ownerState, {
        side: _columnPinning.GridPinnedPosition.left,
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
    })), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_internals.GridColumnHeadersInner, (0, _extends2.default)({
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
    })), rightRenderContext && /*#__PURE__*/(0, _jsxRuntime.jsxs)(GridColumnHeadersPinnedColumnHeaders, (0, _extends2.default)({
      ownerState: (0, _extends2.default)({}, ownerState, {
        side: _columnPinning.GridPinnedPosition.right,
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
        separatorSide: _xDataGrid.GridColumnHeaderSeparatorSides.Left
      })]
    }))]
  }));
});
exports.GridColumnHeaders = GridColumnHeaders;
process.env.NODE_ENV !== "production" ? GridColumnHeaders.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  columnGroupHeaderFocus: _propTypes.default.shape({
    depth: _propTypes.default.number.isRequired,
    field: _propTypes.default.string.isRequired
  }),
  columnGroupHeaderTabIndexState: _propTypes.default.shape({
    depth: _propTypes.default.number.isRequired,
    field: _propTypes.default.string.isRequired
  }),
  columnGroupsHeaderStructure: _propTypes.default.arrayOf(_propTypes.default.arrayOf(_propTypes.default.shape({
    columnFields: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
    groupId: _propTypes.default.string
  }))).isRequired,
  columnHeaderFocus: _propTypes.default.shape({
    field: _propTypes.default.string.isRequired
  }),
  columnHeaderTabIndexState: _propTypes.default.shape({
    field: _propTypes.default.string.isRequired
  }),
  columnMenuState: _propTypes.default.shape({
    field: _propTypes.default.string,
    open: _propTypes.default.bool.isRequired
  }).isRequired,
  columnPositions: _propTypes.default.arrayOf(_propTypes.default.number).isRequired,
  columnVisibility: _propTypes.default.object.isRequired,
  densityFactor: _propTypes.default.number.isRequired,
  filterColumnLookup: _propTypes.default.object.isRequired,
  hasOtherElementInTabSequence: _propTypes.default.bool.isRequired,
  headerGroupingMaxDepth: _propTypes.default.number.isRequired,
  innerRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.object
  })]),
  minColumnIndex: _propTypes.default.number,
  pinnedColumns: _propTypes.default.shape({
    left: _propTypes.default.arrayOf(_propTypes.default.string),
    right: _propTypes.default.arrayOf(_propTypes.default.string)
  }).isRequired,
  sortColumnLookup: _propTypes.default.object.isRequired,
  visibleColumns: _propTypes.default.arrayOf(_propTypes.default.object).isRequired
} : void 0;