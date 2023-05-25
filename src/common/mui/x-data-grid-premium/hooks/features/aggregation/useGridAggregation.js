import * as React from 'react';
import { gridColumnLookupSelector, useGridApiEventHandler, useGridApiMethod } from 'common/mui/x-data-grid-pro';
import _extends from '@babel/runtime/helpers/esm/extends';
import { createAggregationLookup } from './createAggregationLookup';
import { gridAggregationModelSelector } from './gridAggregationSelectors';
import { getAggregationRules, mergeStateWithAggregationModel, areAggregationRulesEqual } from './gridAggregationUtils';

export const aggregationStateInitializer = (state, props, apiRef) => {
  var _ref, _props$aggregationMod, _props$initialState, _props$initialState$a;

  apiRef.current.caches.aggregation = {
    rulesOnLastColumnHydration: {},
    rulesOnLastRowHydration: {},
  };

  return _extends({}, state, {
    aggregation: {
      model: (_ref = (_props$aggregationMod = props.aggregationModel) != null ? _props$aggregationMod : (_props$initialState = props.initialState) == null ? void 0 : (_props$initialState$a = _props$initialState.aggregation) == null ? void 0 : _props$initialState$a.model) != null ? _ref : {},
    },
  });
};
export const useGridAggregation = (apiRef, props) => {
  apiRef.current.registerControlState({
    stateId: 'aggregation',
    propModel: props.aggregationModel,
    propOnChange: props.onAggregationModelChange,
    stateSelector: gridAggregationModelSelector,
    changeEvent: 'aggregationModelChange',
  });

  /**
   * API METHODS
   */
  const setAggregationModel = React.useCallback(model => {
    const currentModel = gridAggregationModelSelector(apiRef);

    if (currentModel !== model) {
      apiRef.current.setState(mergeStateWithAggregationModel(model));
      apiRef.current.forceUpdate();
    }
  }, [apiRef]);
  const applyAggregation = React.useCallback(() => {
    const aggregationLookup = createAggregationLookup({
      apiRef,
      getAggregationPosition: props.getAggregationPosition,
      aggregationFunctions: props.aggregationFunctions,
      aggregationRowsScope: props.aggregationRowsScope,
    });

    apiRef.current.setState(state => _extends({}, state, {
      aggregation: _extends({}, state.aggregation, {
        lookup: aggregationLookup,
      }),
    }));
  }, [apiRef, props.getAggregationPosition, props.aggregationFunctions, props.aggregationRowsScope]);
  const aggregationApi = {
    setAggregationModel,
  };

  useGridApiMethod(apiRef, aggregationApi, 'public');

  /**
   * EVENTS
   */
  const checkAggregationRulesDiff = React.useCallback(() => {
    const {
      rulesOnLastRowHydration,
      rulesOnLastColumnHydration,
    } = apiRef.current.caches.aggregation;
    const aggregationRules = props.disableAggregation ? {} : getAggregationRules({
      columnsLookup: gridColumnLookupSelector(apiRef),
      aggregationModel: gridAggregationModelSelector(apiRef),
      aggregationFunctions: props.aggregationFunctions,
    });

    // Re-apply the row hydration to add / remove the aggregation footers
    if (!areAggregationRulesEqual(rulesOnLastRowHydration, aggregationRules)) {
      apiRef.current.requestPipeProcessorsApplication('hydrateRows');
      applyAggregation();
    }

    // Re-apply the column hydration to wrap / unwrap the aggregated columns
    if (!areAggregationRulesEqual(rulesOnLastColumnHydration, aggregationRules)) {
      apiRef.current.caches.aggregation.rulesOnLastColumnHydration = aggregationRules;
      apiRef.current.requestPipeProcessorsApplication('hydrateColumns');
    }
  }, [apiRef, applyAggregation, props.aggregationFunctions, props.disableAggregation]);

  useGridApiEventHandler(apiRef, 'aggregationModelChange', checkAggregationRulesDiff);
  useGridApiEventHandler(apiRef, 'columnsChange', checkAggregationRulesDiff);
  useGridApiEventHandler(apiRef, 'filteredRowsSet', applyAggregation);

  /**
   * EFFECTS
   */
  React.useEffect(() => {
    if (props.aggregationModel !== undefined) {
      apiRef.current.setAggregationModel(props.aggregationModel);
    }
  }, [apiRef, props.aggregationModel]);
};