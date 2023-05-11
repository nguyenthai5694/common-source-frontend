import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridApiEventHandler, useGridApiMethod, gridColumnLookupSelector } from '@mui/x-data-grid-pro';
import { useGridRegisterPipeProcessor } from '@mui/x-data-grid-pro/internals';
import { gridRowGroupingModelSelector, gridRowGroupingSanitizedModelSelector } from './gridRowGroupingSelector';
import { getRowGroupingFieldFromGroupingCriteria, ROW_GROUPING_STRATEGY, isGroupingColumn, mergeStateWithRowGroupingModel, setStrategyAvailability, getGroupingRules, areGroupingRulesEqual } from './gridRowGroupingUtils';
export const rowGroupingStateInitializer = (state, props, apiRef) => {
  var _ref, _props$rowGroupingMod, _props$initialState, _props$initialState$r;
  apiRef.current.caches.rowGrouping = {
    rulesOnLastRowTreeCreation: []
  };
  return _extends({}, state, {
    rowGrouping: {
      model: (_ref = (_props$rowGroupingMod = props.rowGroupingModel) != null ? _props$rowGroupingMod : (_props$initialState = props.initialState) == null ? void 0 : (_props$initialState$r = _props$initialState.rowGrouping) == null ? void 0 : _props$initialState$r.model) != null ? _ref : []
    }
  });
};

/**
 * @requires useGridColumns (state, method) - can be after, async only
 * @requires useGridRows (state, method) - can be after, async only
 * @requires useGridParamsApi (method) - can be after, async only
 */
export const useGridRowGrouping = (apiRef, props) => {
  var _props$initialState3, _props$initialState3$;
  apiRef.current.registerControlState({
    stateId: 'rowGrouping',
    propModel: props.rowGroupingModel,
    propOnChange: props.onRowGroupingModelChange,
    stateSelector: gridRowGroupingModelSelector,
    changeEvent: 'rowGroupingModelChange'
  });

  /**
   * API METHODS
   */
  const setRowGroupingModel = React.useCallback(model => {
    const currentModel = gridRowGroupingModelSelector(apiRef);
    if (currentModel !== model) {
      apiRef.current.setState(mergeStateWithRowGroupingModel(model));
      setStrategyAvailability(apiRef, props.disableRowGrouping);
      apiRef.current.forceUpdate();
    }
  }, [apiRef, props.disableRowGrouping]);
  const addRowGroupingCriteria = React.useCallback((field, groupingIndex) => {
    const currentModel = gridRowGroupingModelSelector(apiRef);
    if (currentModel.includes(field)) {
      return;
    }
    const cleanGroupingIndex = groupingIndex != null ? groupingIndex : currentModel.length;
    const updatedModel = [...currentModel.slice(0, cleanGroupingIndex), field, ...currentModel.slice(cleanGroupingIndex)];
    apiRef.current.setRowGroupingModel(updatedModel);
  }, [apiRef]);
  const removeRowGroupingCriteria = React.useCallback(field => {
    const currentModel = gridRowGroupingModelSelector(apiRef);
    if (!currentModel.includes(field)) {
      return;
    }
    apiRef.current.setRowGroupingModel(currentModel.filter(el => el !== field));
  }, [apiRef]);
  const setRowGroupingCriteriaIndex = React.useCallback((field, targetIndex) => {
    const currentModel = gridRowGroupingModelSelector(apiRef);
    const currentTargetIndex = currentModel.indexOf(field);
    if (currentTargetIndex === -1) {
      return;
    }
    const updatedModel = [...currentModel];
    updatedModel.splice(targetIndex, 0, updatedModel.splice(currentTargetIndex, 1)[0]);
    apiRef.current.setRowGroupingModel(updatedModel);
  }, [apiRef]);
  const rowGroupingApi = {
    setRowGroupingModel,
    addRowGroupingCriteria,
    removeRowGroupingCriteria,
    setRowGroupingCriteriaIndex
  };
  useGridApiMethod(apiRef, rowGroupingApi, 'public');

  /**
   * PRE-PROCESSING
   */
  const addColumnMenuButtons = React.useCallback((columnMenuItems, colDef) => {
    if (props.disableRowGrouping) {
      return columnMenuItems;
    }
    if (isGroupingColumn(colDef.field) || colDef.groupable) {
      return [...columnMenuItems, 'columnMenuGroupingItem'];
    }
    return columnMenuItems;
  }, [props.disableRowGrouping]);
  const stateExportPreProcessing = React.useCallback((prevState, context) => {
    var _props$initialState2, _props$initialState2$;
    const rowGroupingModelToExport = gridRowGroupingModelSelector(apiRef);
    const shouldExportRowGroupingModel =
    // Always export if the `exportOnlyDirtyModels` property is not activated
    !context.exportOnlyDirtyModels ||
    // Always export if the model is controlled
    props.rowGroupingModel != null ||
    // Always export if the model has been initialized
    ((_props$initialState2 = props.initialState) == null ? void 0 : (_props$initialState2$ = _props$initialState2.rowGrouping) == null ? void 0 : _props$initialState2$.model) != null ||
    // Export if the model is not empty
    Object.keys(rowGroupingModelToExport).length > 0;
    if (!shouldExportRowGroupingModel) {
      return prevState;
    }
    return _extends({}, prevState, {
      rowGrouping: {
        model: rowGroupingModelToExport
      }
    });
  }, [apiRef, props.rowGroupingModel, (_props$initialState3 = props.initialState) == null ? void 0 : (_props$initialState3$ = _props$initialState3.rowGrouping) == null ? void 0 : _props$initialState3$.model]);
  const stateRestorePreProcessing = React.useCallback((params, context) => {
    var _context$stateToResto;
    if (props.disableRowGrouping) {
      return params;
    }
    const rowGroupingModel = (_context$stateToResto = context.stateToRestore.rowGrouping) == null ? void 0 : _context$stateToResto.model;
    if (rowGroupingModel != null) {
      apiRef.current.setState(mergeStateWithRowGroupingModel(rowGroupingModel));
    }
    return params;
  }, [apiRef, props.disableRowGrouping]);
  useGridRegisterPipeProcessor(apiRef, 'columnMenu', addColumnMenuButtons);
  useGridRegisterPipeProcessor(apiRef, 'exportState', stateExportPreProcessing);
  useGridRegisterPipeProcessor(apiRef, 'restoreState', stateRestorePreProcessing);

  /**
   * EVENTS
   */
  const handleCellKeyDown = React.useCallback((params, event) => {
    const cellParams = apiRef.current.getCellParams(params.id, params.field);
    if (isGroupingColumn(cellParams.field) && event.key === ' ' && !event.shiftKey) {
      event.stopPropagation();
      event.preventDefault();
      if (params.rowNode.type !== 'group') {
        return;
      }
      const isOnGroupingCell = props.rowGroupingColumnMode === 'single' || getRowGroupingFieldFromGroupingCriteria(params.rowNode.groupingField) === params.field;
      if (!isOnGroupingCell) {
        return;
      }
      apiRef.current.setRowChildrenExpansion(params.id, !params.rowNode.childrenExpanded);
    }
  }, [apiRef, props.rowGroupingColumnMode]);
  const checkGroupingColumnsModelDiff = React.useCallback(() => {
    const sanitizedRowGroupingModel = gridRowGroupingSanitizedModelSelector(apiRef);
    const rulesOnLastRowTreeCreation = apiRef.current.caches.rowGrouping.rulesOnLastRowTreeCreation || [];
    const groupingRules = getGroupingRules({
      sanitizedRowGroupingModel,
      columnsLookup: gridColumnLookupSelector(apiRef)
    });
    if (!areGroupingRulesEqual(rulesOnLastRowTreeCreation, groupingRules)) {
      apiRef.current.caches.rowGrouping.rulesOnLastRowTreeCreation = groupingRules;
      apiRef.current.requestPipeProcessorsApplication('hydrateColumns');
      setStrategyAvailability(apiRef, props.disableRowGrouping);

      // Refresh the row tree creation strategy processing
      // TODO: Add a clean way to re-run a strategy processing without publishing a private event
      if (apiRef.current.getActiveStrategy('rowTree') === ROW_GROUPING_STRATEGY) {
        apiRef.current.publishEvent('activeStrategyProcessorChange', 'rowTreeCreation');
      }
    }
  }, [apiRef, props.disableRowGrouping]);
  useGridApiEventHandler(apiRef, 'cellKeyDown', handleCellKeyDown);
  useGridApiEventHandler(apiRef, 'columnsChange', checkGroupingColumnsModelDiff);
  useGridApiEventHandler(apiRef, 'rowGroupingModelChange', checkGroupingColumnsModelDiff);

  /**
   * EFFECTS
   */
  React.useEffect(() => {
    if (props.rowGroupingModel !== undefined) {
      apiRef.current.setRowGroupingModel(props.rowGroupingModel);
    }
  }, [apiRef, props.rowGroupingModel]);
};