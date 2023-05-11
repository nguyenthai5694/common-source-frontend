import * as React from 'react';
import { gridRowTreeSelector, useFirstRender, GRID_CHECKBOX_SELECTION_FIELD } from '@mui/x-data-grid';
import { useGridRegisterPipeProcessor, useGridRegisterStrategyProcessor } from '@mui/x-data-grid/internals';
import { jsx as _jsx } from 'react/jsx-runtime';
import _extends from '@babel/runtime/helpers/esm/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import { GridTreeDataGroupingCell } from '../../../components';
import { createRowTree } from '../../../utils/tree/createRowTree';
import { sortRowTree } from '../../../utils/tree/sortRowTree';
import { updateRowTree } from '../../../utils/tree/updateRowTree';
import {
  GRID_TREE_DATA_GROUPING_COL_DEF,
  GRID_TREE_DATA_GROUPING_COL_DEF_FORCED_PROPERTIES,
} from './gridTreeDataGroupColDef';
import { filterRowTreeFromTreeData, TREE_DATA_STRATEGY } from './gridTreeDataUtils';

const _excluded = ['hideDescendantCount'];

export const useGridTreeDataPreProcessors = (privateApiRef, props) => {
  const setStrategyAvailability = React.useCallback(() => {
    privateApiRef.current.setStrategyAvailability('rowTree', TREE_DATA_STRATEGY, props.treeData ? () => true : () => false);
  }, [privateApiRef, props.treeData]);
  const getGroupingColDef = React.useCallback(() => {
    var _colDefOverride;
    const groupingColDefProp = props.groupingColDef;
    let colDefOverride;

    if (typeof groupingColDefProp === 'function') {
      const params = {
        groupingName: TREE_DATA_STRATEGY,
        fields: [],
      };

      colDefOverride = groupingColDefProp(params);
    } else {
      colDefOverride = groupingColDefProp;
    }

    const _ref = (_colDefOverride = colDefOverride) != null ? _colDefOverride : {},
      {
        hideDescendantCount,
      } = _ref,
      colDefOverrideProperties = _objectWithoutPropertiesLoose(_ref, _excluded);
    const commonProperties = _extends({}, GRID_TREE_DATA_GROUPING_COL_DEF, {
      renderCell: params => /*#__PURE__*/_jsx(GridTreeDataGroupingCell, _extends({}, params, {
        hideDescendantCount,
      })),
      headerName: privateApiRef.current.getLocaleText('treeDataGroupingHeaderName'),
    });

    return _extends({}, commonProperties, colDefOverrideProperties, GRID_TREE_DATA_GROUPING_COL_DEF_FORCED_PROPERTIES);
  }, [privateApiRef, props.groupingColDef]);
  const updateGroupingColumn = React.useCallback(columnsState => {
    const groupingColDefField = GRID_TREE_DATA_GROUPING_COL_DEF_FORCED_PROPERTIES.field;
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
        const index = columnsState.orderedFields[0] === GRID_CHECKBOX_SELECTION_FIELD ? 1 : 0;

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
        field: null,
      })),
    });
    const onDuplicatePath = (firstId, secondId, path) => {
      throw new Error(['MUI: The path returned by `getTreeDataPath` should be unique.', `The rows with id #${firstId} and #${secondId} have the same.`, `Path: ${JSON.stringify(path.map(step => step.key))}.`].join('\n'));
    };

    if (params.updates.type === 'full') {
      return createRowTree({
        nodes: params.updates.rows.map(getRowTreeBuilderNode),
        defaultGroupingExpansionDepth: props.defaultGroupingExpansionDepth,
        isGroupExpandedByDefault: props.isGroupExpandedByDefault,
        groupingName: TREE_DATA_STRATEGY,
        onDuplicatePath,
      });
    }

    return updateRowTree({
      nodes: {
        inserted: params.updates.actions.insert.map(getRowTreeBuilderNode),
        modified: params.updates.actions.modify.map(getRowTreeBuilderNode),
        removed: params.updates.actions.remove,
      },
      previousTree: params.previousTree,
      previousTreeDepth: params.previousTreeDepths,
      defaultGroupingExpansionDepth: props.defaultGroupingExpansionDepth,
      isGroupExpandedByDefault: props.isGroupExpandedByDefault,
      groupingName: TREE_DATA_STRATEGY,
    });
  }, [props]);
  const filterRows = React.useCallback(params => {
    const rowTree = gridRowTreeSelector(privateApiRef);

    return filterRowTreeFromTreeData({
      rowTree,
      isRowMatchingFilters: params.isRowMatchingFilters,
      disableChildrenFiltering: props.disableChildrenFiltering,
      filterModel: params.filterModel,
      apiRef: privateApiRef,
    });
  }, [privateApiRef, props.disableChildrenFiltering]);
  const sortRows = React.useCallback(params => {
    const rowTree = gridRowTreeSelector(privateApiRef);

    return sortRowTree({
      rowTree,
      sortRowList: params.sortRowList,
      disableChildrenSorting: props.disableChildrenSorting,
      shouldRenderGroupBelowLeaves: false,
    });
  }, [privateApiRef, props.disableChildrenSorting]);

  useGridRegisterPipeProcessor(privateApiRef, 'hydrateColumns', updateGroupingColumn);
  useGridRegisterStrategyProcessor(privateApiRef, TREE_DATA_STRATEGY, 'rowTreeCreation', createRowTreeForTreeData);
  useGridRegisterStrategyProcessor(privateApiRef, TREE_DATA_STRATEGY, 'filtering', filterRows);
  useGridRegisterStrategyProcessor(privateApiRef, TREE_DATA_STRATEGY, 'sorting', sortRows);

  /**
   * 1ST RENDER
   */
  useFirstRender(() => {
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