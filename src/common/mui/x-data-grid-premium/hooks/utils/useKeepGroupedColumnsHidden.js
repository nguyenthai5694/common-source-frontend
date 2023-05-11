import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { gridColumnVisibilityModelSelector } from '@mui/x-data-grid-pro';
const updateColumnVisibilityModel = (columnVisibilityModel, rowGroupingModel, prevRowGroupingModel) => {
  const newColumnVisibilityModel = _extends({}, columnVisibilityModel);
  rowGroupingModel == null ? void 0 : rowGroupingModel.forEach(field => {
    if (!(prevRowGroupingModel != null && prevRowGroupingModel.includes(field))) {
      newColumnVisibilityModel[field] = false;
    }
  });
  prevRowGroupingModel == null ? void 0 : prevRowGroupingModel.forEach(field => {
    if (!(rowGroupingModel != null && rowGroupingModel.includes(field))) {
      newColumnVisibilityModel[field] = true;
    }
  });
  return newColumnVisibilityModel;
};

/**
 * Automatically hide columns when added to the row grouping model and stop hiding them when they are removed.
 * Handles both the `props.initialState.rowGrouping.model` and `props.rowGroupingModel`
 * Does not work when used with the `hide` property of `GridColDef`
 */
export const useKeepGroupedColumnsHidden = props => {
  var _props$rowGroupingMod, _props$initialState, _props$initialState$r;
  const initialProps = React.useRef(props);
  const rowGroupingModel = React.useRef((_props$rowGroupingMod = props.rowGroupingModel) != null ? _props$rowGroupingMod : (_props$initialState = props.initialState) == null ? void 0 : (_props$initialState$r = _props$initialState.rowGrouping) == null ? void 0 : _props$initialState$r.model);
  React.useEffect(() => {
    props.apiRef.current.subscribeEvent('rowGroupingModelChange', newModel => {
      const columnVisibilityModel = updateColumnVisibilityModel(gridColumnVisibilityModelSelector(props.apiRef), newModel, rowGroupingModel.current);
      props.apiRef.current.setColumnVisibilityModel(columnVisibilityModel);
      rowGroupingModel.current = newModel;
    });
  }, [props.apiRef]);
  return React.useMemo(() => {
    var _invariantInitialStat;
    const invariantInitialState = initialProps.current.initialState;
    const columnVisibilityModel = updateColumnVisibilityModel(invariantInitialState == null ? void 0 : (_invariantInitialStat = invariantInitialState.columns) == null ? void 0 : _invariantInitialStat.columnVisibilityModel, rowGroupingModel.current, undefined);
    return _extends({}, invariantInitialState, {
      columns: _extends({}, invariantInitialState == null ? void 0 : invariantInitialState.columns, {
        columnVisibilityModel
      })
    });
  }, []);
};