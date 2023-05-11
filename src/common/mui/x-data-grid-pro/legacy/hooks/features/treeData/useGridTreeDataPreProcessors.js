import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["hideDescendantCount"];
import * as React from 'react';
import { gridRowTreeSelector, useFirstRender, GRID_CHECKBOX_SELECTION_FIELD } from '@mui/x-data-grid';
import { useGridRegisterPipeProcessor, useGridRegisterStrategyProcessor } from '@mui/x-data-grid/internals';
import { GRID_TREE_DATA_GROUPING_COL_DEF, GRID_TREE_DATA_GROUPING_COL_DEF_FORCED_PROPERTIES } from './gridTreeDataGroupColDef';
import { filterRowTreeFromTreeData, TREE_DATA_STRATEGY } from './gridTreeDataUtils';
import { GridTreeDataGroupingCell } from '../../../components';
import { createRowTree } from '../../../utils/tree/createRowTree';
import { sortRowTree } from '../../../utils/tree/sortRowTree';
import { updateRowTree } from '../../../utils/tree/updateRowTree';
import { jsx as _jsx } from "react/jsx-runtime";
export var useGridTreeDataPreProcessors = function useGridTreeDataPreProcessors(privateApiRef, props) {
  var setStrategyAvailability = React.useCallback(function () {
    privateApiRef.current.setStrategyAvailability('rowTree', TREE_DATA_STRATEGY, props.treeData ? function () {
      return true;
    } : function () {
      return false;
    });
  }, [privateApiRef, props.treeData]);
  var getGroupingColDef = React.useCallback(function () {
    var _colDefOverride;
    var groupingColDefProp = props.groupingColDef;
    var colDefOverride;
    if (typeof groupingColDefProp === 'function') {
      var params = {
        groupingName: TREE_DATA_STRATEGY,
        fields: []
      };
      colDefOverride = groupingColDefProp(params);
    } else {
      colDefOverride = groupingColDefProp;
    }
    var _ref = (_colDefOverride = colDefOverride) != null ? _colDefOverride : {},
      hideDescendantCount = _ref.hideDescendantCount,
      colDefOverrideProperties = _objectWithoutProperties(_ref, _excluded);
    var commonProperties = _extends({}, GRID_TREE_DATA_GROUPING_COL_DEF, {
      renderCell: function renderCell(params) {
        return /*#__PURE__*/_jsx(GridTreeDataGroupingCell, _extends({}, params, {
          hideDescendantCount: hideDescendantCount
        }));
      },
      headerName: privateApiRef.current.getLocaleText('treeDataGroupingHeaderName')
    });
    return _extends({}, commonProperties, colDefOverrideProperties, GRID_TREE_DATA_GROUPING_COL_DEF_FORCED_PROPERTIES);
  }, [privateApiRef, props.groupingColDef]);
  var updateGroupingColumn = React.useCallback(function (columnsState) {
    var groupingColDefField = GRID_TREE_DATA_GROUPING_COL_DEF_FORCED_PROPERTIES.field;
    var shouldHaveGroupingColumn = props.treeData;
    var prevGroupingColumn = columnsState.lookup[groupingColDefField];
    if (shouldHaveGroupingColumn) {
      var newGroupingColumn = getGroupingColDef();
      if (prevGroupingColumn) {
        newGroupingColumn.width = prevGroupingColumn.width;
        newGroupingColumn.flex = prevGroupingColumn.flex;
      }
      columnsState.lookup[groupingColDefField] = newGroupingColumn;
      if (prevGroupingColumn == null) {
        var index = columnsState.orderedFields[0] === GRID_CHECKBOX_SELECTION_FIELD ? 1 : 0;
        columnsState.orderedFields = [].concat(_toConsumableArray(columnsState.orderedFields.slice(0, index)), [groupingColDefField], _toConsumableArray(columnsState.orderedFields.slice(index)));
      }
    } else if (!shouldHaveGroupingColumn && prevGroupingColumn) {
      delete columnsState.lookup[groupingColDefField];
      columnsState.orderedFields = columnsState.orderedFields.filter(function (field) {
        return field !== groupingColDefField;
      });
    }
    return columnsState;
  }, [props.treeData, getGroupingColDef]);
  var createRowTreeForTreeData = React.useCallback(function (params) {
    if (!props.getTreeDataPath) {
      throw new Error('MUI: No getTreeDataPath given.');
    }
    var getRowTreeBuilderNode = function getRowTreeBuilderNode(rowId) {
      return {
        id: rowId,
        path: props.getTreeDataPath(params.dataRowIdToModelLookup[rowId]).map(function (key) {
          return {
            key: key,
            field: null
          };
        })
      };
    };
    var onDuplicatePath = function onDuplicatePath(firstId, secondId, path) {
      throw new Error(['MUI: The path returned by `getTreeDataPath` should be unique.', "The rows with id #".concat(firstId, " and #").concat(secondId, " have the same."), "Path: ".concat(JSON.stringify(path.map(function (step) {
        return step.key;
      })), ".")].join('\n'));
    };
    if (params.updates.type === 'full') {
      return createRowTree({
        nodes: params.updates.rows.map(getRowTreeBuilderNode),
        defaultGroupingExpansionDepth: props.defaultGroupingExpansionDepth,
        isGroupExpandedByDefault: props.isGroupExpandedByDefault,
        groupingName: TREE_DATA_STRATEGY,
        onDuplicatePath: onDuplicatePath
      });
    }
    return updateRowTree({
      nodes: {
        inserted: params.updates.actions.insert.map(getRowTreeBuilderNode),
        modified: params.updates.actions.modify.map(getRowTreeBuilderNode),
        removed: params.updates.actions.remove
      },
      previousTree: params.previousTree,
      previousTreeDepth: params.previousTreeDepths,
      defaultGroupingExpansionDepth: props.defaultGroupingExpansionDepth,
      isGroupExpandedByDefault: props.isGroupExpandedByDefault,
      groupingName: TREE_DATA_STRATEGY
    });
  }, [props.getTreeDataPath, props.defaultGroupingExpansionDepth, props.isGroupExpandedByDefault]);
  var filterRows = React.useCallback(function (params) {
    var rowTree = gridRowTreeSelector(privateApiRef);
    return filterRowTreeFromTreeData({
      rowTree: rowTree,
      isRowMatchingFilters: params.isRowMatchingFilters,
      disableChildrenFiltering: props.disableChildrenFiltering,
      filterModel: params.filterModel,
      apiRef: privateApiRef
    });
  }, [privateApiRef, props.disableChildrenFiltering]);
  var sortRows = React.useCallback(function (params) {
    var rowTree = gridRowTreeSelector(privateApiRef);
    return sortRowTree({
      rowTree: rowTree,
      sortRowList: params.sortRowList,
      disableChildrenSorting: props.disableChildrenSorting,
      shouldRenderGroupBelowLeaves: false
    });
  }, [privateApiRef, props.disableChildrenSorting]);
  useGridRegisterPipeProcessor(privateApiRef, 'hydrateColumns', updateGroupingColumn);
  useGridRegisterStrategyProcessor(privateApiRef, TREE_DATA_STRATEGY, 'rowTreeCreation', createRowTreeForTreeData);
  useGridRegisterStrategyProcessor(privateApiRef, TREE_DATA_STRATEGY, 'filtering', filterRows);
  useGridRegisterStrategyProcessor(privateApiRef, TREE_DATA_STRATEGY, 'sorting', sortRows);

  /**
   * 1ST RENDER
   */
  useFirstRender(function () {
    setStrategyAvailability();
  });

  /**
   * EFFECTS
   */
  var isFirstRender = React.useRef(true);
  React.useEffect(function () {
    if (!isFirstRender.current) {
      setStrategyAvailability();
    } else {
      isFirstRender.current = false;
    }
  }, [setStrategyAvailability]);
};