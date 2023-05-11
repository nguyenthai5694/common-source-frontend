import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import * as React from 'react';
import { gridColumnLookupSelector, gridRowTreeSelector, useFirstRender, GRID_CHECKBOX_SELECTION_FIELD } from '@mui/x-data-grid-pro';
import { useGridRegisterPipeProcessor, useGridRegisterStrategyProcessor, sortRowTree, createRowTree, updateRowTree } from '@mui/x-data-grid-pro/internals';
import { gridRowGroupingModelSelector, gridRowGroupingSanitizedModelSelector } from './gridRowGroupingSelector';
import { createGroupingColDefForAllGroupingCriteria, createGroupingColDefForOneGroupingCriteria } from './createGroupingColDef';
import { filterRowTreeFromGroupingColumns, getColDefOverrides, ROW_GROUPING_STRATEGY, isGroupingColumn, setStrategyAvailability, getCellGroupingCriteria, getGroupingRules } from './gridRowGroupingUtils';
export var useGridRowGroupingPreProcessors = function useGridRowGroupingPreProcessors(apiRef, props) {
  var getGroupingColDefs = React.useCallback(function (columnsState) {
    if (props.disableRowGrouping) {
      return [];
    }
    var groupingColDefProp = props.groupingColDef;

    // We can't use `gridGroupingRowsSanitizedModelSelector` here because the new columns are not in the state yet
    var rowGroupingModel = gridRowGroupingModelSelector(apiRef).filter(function (field) {
      return !!columnsState.lookup[field];
    });
    if (rowGroupingModel.length === 0) {
      return [];
    }
    switch (props.rowGroupingColumnMode) {
      case 'single':
        {
          return [createGroupingColDefForAllGroupingCriteria({
            apiRef: apiRef,
            rowGroupingModel: rowGroupingModel,
            colDefOverride: getColDefOverrides(groupingColDefProp, rowGroupingModel),
            columnsLookup: columnsState.lookup
          })];
        }
      case 'multiple':
        {
          return rowGroupingModel.map(function (groupingCriteria) {
            return createGroupingColDefForOneGroupingCriteria({
              groupingCriteria: groupingCriteria,
              colDefOverride: getColDefOverrides(groupingColDefProp, [groupingCriteria]),
              groupedByColDef: columnsState.lookup[groupingCriteria],
              columnsLookup: columnsState.lookup
            });
          });
        }
      default:
        {
          return [];
        }
    }
  }, [apiRef, props.groupingColDef, props.rowGroupingColumnMode, props.disableRowGrouping]);
  var updateGroupingColumn = React.useCallback(function (columnsState) {
    var groupingColDefs = getGroupingColDefs(columnsState);
    var newColumnFields = [];
    var newColumnsLookup = {};

    // We only keep the non-grouping columns
    columnsState.orderedFields.forEach(function (field) {
      if (!isGroupingColumn(field)) {
        newColumnFields.push(field);
        newColumnsLookup[field] = columnsState.lookup[field];
      }
    });

    // We add the grouping column
    groupingColDefs.forEach(function (groupingColDef) {
      var matchingGroupingColDef = columnsState.lookup[groupingColDef.field];
      if (matchingGroupingColDef) {
        groupingColDef.width = matchingGroupingColDef.width;
        groupingColDef.flex = matchingGroupingColDef.flex;
      }
      newColumnsLookup[groupingColDef.field] = groupingColDef;
    });
    var startIndex = newColumnFields[0] === GRID_CHECKBOX_SELECTION_FIELD ? 1 : 0;
    newColumnFields = [].concat(_toConsumableArray(newColumnFields.slice(0, startIndex)), _toConsumableArray(groupingColDefs.map(function (colDef) {
      return colDef.field;
    })), _toConsumableArray(newColumnFields.slice(startIndex)));
    columnsState.orderedFields = newColumnFields;
    columnsState.lookup = newColumnsLookup;
    return columnsState;
  }, [getGroupingColDefs]);
  var createRowTreeForRowGrouping = React.useCallback(function (params) {
    var sanitizedRowGroupingModel = gridRowGroupingSanitizedModelSelector(apiRef);
    var columnsLookup = gridColumnLookupSelector(apiRef);
    var groupingRules = getGroupingRules({
      sanitizedRowGroupingModel: sanitizedRowGroupingModel,
      columnsLookup: columnsLookup
    });
    apiRef.current.caches.rowGrouping.rulesOnLastRowTreeCreation = groupingRules;
    var getRowTreeBuilderNode = function getRowTreeBuilderNode(rowId) {
      var row = params.dataRowIdToModelLookup[rowId];
      var parentPath = groupingRules.map(function (groupingRule) {
        return getCellGroupingCriteria({
          row: row,
          id: rowId,
          groupingRule: groupingRule,
          colDef: columnsLookup[groupingRule.field]
        });
      }).filter(function (cell) {
        return cell.key != null;
      });
      var leafGroupingCriteria = {
        key: rowId.toString(),
        field: null
      };
      return {
        path: [].concat(_toConsumableArray(parentPath), [leafGroupingCriteria]),
        id: rowId
      };
    };
    if (params.updates.type === 'full') {
      return createRowTree({
        nodes: params.updates.rows.map(getRowTreeBuilderNode),
        defaultGroupingExpansionDepth: props.defaultGroupingExpansionDepth,
        isGroupExpandedByDefault: props.isGroupExpandedByDefault,
        groupingName: ROW_GROUPING_STRATEGY
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
      groupingName: ROW_GROUPING_STRATEGY
    });
  }, [apiRef, props.defaultGroupingExpansionDepth, props.isGroupExpandedByDefault]);
  var filterRows = React.useCallback(function (params) {
    var rowTree = gridRowTreeSelector(apiRef);
    return filterRowTreeFromGroupingColumns({
      rowTree: rowTree,
      isRowMatchingFilters: params.isRowMatchingFilters,
      filterModel: params.filterModel,
      apiRef: apiRef
    });
  }, [apiRef]);
  var sortRows = React.useCallback(function (params) {
    var rowTree = gridRowTreeSelector(apiRef);
    return sortRowTree({
      rowTree: rowTree,
      sortRowList: params.sortRowList,
      disableChildrenSorting: false,
      shouldRenderGroupBelowLeaves: true
    });
  }, [apiRef]);
  useGridRegisterPipeProcessor(apiRef, 'hydrateColumns', updateGroupingColumn);
  useGridRegisterStrategyProcessor(apiRef, ROW_GROUPING_STRATEGY, 'rowTreeCreation', createRowTreeForRowGrouping);
  useGridRegisterStrategyProcessor(apiRef, ROW_GROUPING_STRATEGY, 'filtering', filterRows);
  useGridRegisterStrategyProcessor(apiRef, ROW_GROUPING_STRATEGY, 'sorting', sortRows);

  /**
   * 1ST RENDER
   */
  useFirstRender(function () {
    setStrategyAvailability(apiRef, props.disableRowGrouping);
  });

  /**
   * EFFECTS
   */
  var isFirstRender = React.useRef(true);
  React.useEffect(function () {
    if (!isFirstRender.current) {
      setStrategyAvailability(apiRef, props.disableRowGrouping);
    } else {
      isFirstRender.current = false;
    }
  }, [apiRef, props.disableRowGrouping]);
};