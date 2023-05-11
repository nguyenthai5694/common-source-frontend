"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridColumnPinningPreProcessors = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _styles = require("@mui/material/styles");
var _internals = require("@mui/x-data-grid/internals");
var _gridColumnPinningSelector = require("./gridColumnPinningSelector");
var _useGridColumnPinning = require("./useGridColumnPinning");
var _DataGridProVirtualScroller = require("../../../components/DataGridProVirtualScroller");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const useGridColumnPinningPreProcessors = (apiRef, props) => {
  const {
    disableColumnPinning,
    pinnedColumns: pinnedColumnsProp,
    initialState
  } = props;
  const theme = (0, _styles.useTheme)();
  let pinnedColumns = (0, _gridColumnPinningSelector.gridPinnedColumnsSelector)(apiRef.current.state);
  if (pinnedColumns == null) {
    // Since the state is not ready yet lets use the initializer to get which
    // columns should be pinned initially.
    const initializedState = (0, _useGridColumnPinning.columnPinningStateInitializer)(apiRef.current.state, {
      disableColumnPinning,
      pinnedColumns: pinnedColumnsProp,
      initialState
    }, apiRef);
    pinnedColumns = (0, _gridColumnPinningSelector.gridPinnedColumnsSelector)(initializedState);
  }
  const prevAllPinnedColumns = React.useRef();
  const reorderPinnedColumns = React.useCallback(columnsState => {
    if (columnsState.orderedFields.length === 0 || disableColumnPinning) {
      return columnsState;
    }
    const [leftPinnedColumns, rightPinnedColumns] = (0, _DataGridProVirtualScroller.filterColumns)(pinnedColumns, columnsState.orderedFields, theme.direction === 'rtl');
    let newOrderedFields;
    const allPinnedColumns = [...leftPinnedColumns, ...rightPinnedColumns];
    const {
      orderedFieldsBeforePinningColumns
    } = apiRef.current.caches.columnPinning;
    if (orderedFieldsBeforePinningColumns) {
      newOrderedFields = new Array(columnsState.orderedFields.length).fill(null);
      const newOrderedFieldsBeforePinningColumns = [...newOrderedFields];

      // Contains the fields not added to the orderedFields array yet
      const remainingFields = [...columnsState.orderedFields];

      // First, we check if the column was unpinned since the last processing.
      // If yes and it still exists, we move it back to the same position it was before pinning
      prevAllPinnedColumns.current.forEach(field => {
        if (!allPinnedColumns.includes(field) && columnsState.lookup[field]) {
          // Get the position before pinning
          const index = orderedFieldsBeforePinningColumns.indexOf(field);
          newOrderedFields[index] = field;
          newOrderedFieldsBeforePinningColumns[index] = field;
          // This field was already consumed so we prevent from being added again
          remainingFields.splice(remainingFields.indexOf(field), 1);
        }
      });

      // For columns still pinned, we keep stored their original positions
      allPinnedColumns.forEach(field => {
        let index = orderedFieldsBeforePinningColumns.indexOf(field);
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
      let i = 0;
      remainingFields.forEach(field => {
        while (newOrderedFieldsBeforePinningColumns[i] !== null) {
          i += 1;
        }
        newOrderedFieldsBeforePinningColumns[i] = field;
        newOrderedFields[i] = field;
      });
      apiRef.current.caches.columnPinning.orderedFieldsBeforePinningColumns = newOrderedFieldsBeforePinningColumns;
    } else {
      newOrderedFields = [...columnsState.orderedFields];
      apiRef.current.caches.columnPinning.orderedFieldsBeforePinningColumns = [...columnsState.orderedFields];
    }
    prevAllPinnedColumns.current = allPinnedColumns;
    const centerColumns = newOrderedFields.filter(field => {
      return !leftPinnedColumns.includes(field) && !rightPinnedColumns.includes(field);
    });
    return (0, _extends2.default)({}, columnsState, {
      orderedFields: [...leftPinnedColumns, ...centerColumns, ...rightPinnedColumns]
    });
  }, [apiRef, disableColumnPinning, pinnedColumns, theme.direction]);
  (0, _internals.useGridRegisterPipeProcessor)(apiRef, 'hydrateColumns', reorderPinnedColumns);
};
exports.useGridColumnPinningPreProcessors = useGridColumnPinningPreProcessors;