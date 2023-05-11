"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridTreeDataPreProcessors = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _xDataGrid = require("@mui/x-data-grid");
var _internals = require("@mui/x-data-grid/internals");
var _gridTreeDataGroupColDef = require("./gridTreeDataGroupColDef");
var _gridTreeDataUtils = require("./gridTreeDataUtils");
var _components = require("../../../components");
var _createRowTree = require("../../../utils/tree/createRowTree");
var _sortRowTree = require("../../../utils/tree/sortRowTree");
var _updateRowTree = require("../../../utils/tree/updateRowTree");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["hideDescendantCount"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const useGridTreeDataPreProcessors = (privateApiRef, props) => {
  const setStrategyAvailability = React.useCallback(() => {
    privateApiRef.current.setStrategyAvailability('rowTree', _gridTreeDataUtils.TREE_DATA_STRATEGY, props.treeData ? () => true : () => false);
  }, [privateApiRef, props.treeData]);
  const getGroupingColDef = React.useCallback(() => {
    const groupingColDefProp = props.groupingColDef;
    let colDefOverride;
    if (typeof groupingColDefProp === 'function') {
      const params = {
        groupingName: _gridTreeDataUtils.TREE_DATA_STRATEGY,
        fields: []
      };
      colDefOverride = groupingColDefProp(params);
    } else {
      colDefOverride = groupingColDefProp;
    }
    const _ref = colDefOverride ?? {},
      {
        hideDescendantCount
      } = _ref,
      colDefOverrideProperties = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
    const commonProperties = (0, _extends2.default)({}, _gridTreeDataGroupColDef.GRID_TREE_DATA_GROUPING_COL_DEF, {
      renderCell: params => /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.GridTreeDataGroupingCell, (0, _extends2.default)({}, params, {
        hideDescendantCount: hideDescendantCount
      })),
      headerName: privateApiRef.current.getLocaleText('treeDataGroupingHeaderName')
    });
    return (0, _extends2.default)({}, commonProperties, colDefOverrideProperties, _gridTreeDataGroupColDef.GRID_TREE_DATA_GROUPING_COL_DEF_FORCED_PROPERTIES);
  }, [privateApiRef, props.groupingColDef]);
  const updateGroupingColumn = React.useCallback(columnsState => {
    const groupingColDefField = _gridTreeDataGroupColDef.GRID_TREE_DATA_GROUPING_COL_DEF_FORCED_PROPERTIES.field;
    const shouldHaveGroupingColumn = props.treeData;
    const prevGroupingColumn = columnsState.lookup[groupingColDefField];
    if (shouldHaveGroupingColumn) {
      const newGroupingColumn = getGroupingColDef();
      if (prevGroupingColumn) {
        newGroupingColumn.width = prevGroupingColumn.width;
        newGroupingColumn.flex = prevGroupingColumn.flex;
      }
      columnsState.lookup[groupingColDefField] = newGroupingColumn;
      if (prevGroupingColumn == null) {
        const index = columnsState.orderedFields[0] === _xDataGrid.GRID_CHECKBOX_SELECTION_FIELD ? 1 : 0;
        columnsState.orderedFields = [...columnsState.orderedFields.slice(0, index), groupingColDefField, ...columnsState.orderedFields.slice(index)];
      }
    } else if (!shouldHaveGroupingColumn && prevGroupingColumn) {
      delete columnsState.lookup[groupingColDefField];
      columnsState.orderedFields = columnsState.orderedFields.filter(field => field !== groupingColDefField);
    }
    return columnsState;
  }, [props.treeData, getGroupingColDef]);
  const createRowTreeForTreeData = React.useCallback(params => {
    if (!props.getTreeDataPath) {
      throw new Error('MUI: No getTreeDataPath given.');
    }
    const getRowTreeBuilderNode = rowId => ({
      id: rowId,
      path: props.getTreeDataPath(params.dataRowIdToModelLookup[rowId]).map(key => ({
        key,
        field: null
      }))
    });
    const onDuplicatePath = (firstId, secondId, path) => {
      throw new Error(['MUI: The path returned by `getTreeDataPath` should be unique.', `The rows with id #${firstId} and #${secondId} have the same.`, `Path: ${JSON.stringify(path.map(step => step.key))}.`].join('\n'));
    };
    if (params.updates.type === 'full') {
      return (0, _createRowTree.createRowTree)({
        nodes: params.updates.rows.map(getRowTreeBuilderNode),
        defaultGroupingExpansionDepth: props.defaultGroupingExpansionDepth,
        isGroupExpandedByDefault: props.isGroupExpandedByDefault,
        groupingName: _gridTreeDataUtils.TREE_DATA_STRATEGY,
        onDuplicatePath
      });
    }
    return (0, _updateRowTree.updateRowTree)({
      nodes: {
        inserted: params.updates.actions.insert.map(getRowTreeBuilderNode),
        modified: params.updates.actions.modify.map(getRowTreeBuilderNode),
        removed: params.updates.actions.remove
      },
      previousTree: params.previousTree,
      previousTreeDepth: params.previousTreeDepths,
      defaultGroupingExpansionDepth: props.defaultGroupingExpansionDepth,
      isGroupExpandedByDefault: props.isGroupExpandedByDefault,
      groupingName: _gridTreeDataUtils.TREE_DATA_STRATEGY
    });
  }, [props.getTreeDataPath, props.defaultGroupingExpansionDepth, props.isGroupExpandedByDefault]);
  const filterRows = React.useCallback(params => {
    const rowTree = (0, _xDataGrid.gridRowTreeSelector)(privateApiRef);
    return (0, _gridTreeDataUtils.filterRowTreeFromTreeData)({
      rowTree,
      isRowMatchingFilters: params.isRowMatchingFilters,
      disableChildrenFiltering: props.disableChildrenFiltering,
      filterModel: params.filterModel,
      apiRef: privateApiRef
    });
  }, [privateApiRef, props.disableChildrenFiltering]);
  const sortRows = React.useCallback(params => {
    const rowTree = (0, _xDataGrid.gridRowTreeSelector)(privateApiRef);
    return (0, _sortRowTree.sortRowTree)({
      rowTree,
      sortRowList: params.sortRowList,
      disableChildrenSorting: props.disableChildrenSorting,
      shouldRenderGroupBelowLeaves: false
    });
  }, [privateApiRef, props.disableChildrenSorting]);
  (0, _internals.useGridRegisterPipeProcessor)(privateApiRef, 'hydrateColumns', updateGroupingColumn);
  (0, _internals.useGridRegisterStrategyProcessor)(privateApiRef, _gridTreeDataUtils.TREE_DATA_STRATEGY, 'rowTreeCreation', createRowTreeForTreeData);
  (0, _internals.useGridRegisterStrategyProcessor)(privateApiRef, _gridTreeDataUtils.TREE_DATA_STRATEGY, 'filtering', filterRows);
  (0, _internals.useGridRegisterStrategyProcessor)(privateApiRef, _gridTreeDataUtils.TREE_DATA_STRATEGY, 'sorting', sortRows);

  /**
   * 1ST RENDER
   */
  (0, _xDataGrid.useFirstRender)(() => {
    setStrategyAvailability();
  });

  /**
   * EFFECTS
   */
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (!isFirstRender.current) {
      setStrategyAvailability();
    } else {
      isFirstRender.current = false;
    }
  }, [setStrategyAvailability]);
};
exports.useGridTreeDataPreProcessors = useGridTreeDataPreProcessors;