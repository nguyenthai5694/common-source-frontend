import * as React from 'react';
import { useThemeProps } from '@mui/material/styles';
import { GRID_DEFAULT_LOCALE_TEXT, DATA_GRID_PROPS_DEFAULT_VALUES } from '@mui/x-data-grid';
import { computeSlots, uncapitalizeObjectKeys } from '@mui/x-data-grid/internals';
import _extends from '@babel/runtime/helpers/esm/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import { DATA_GRID_PRO_DEFAULT_SLOTS_COMPONENTS } from '../constants/dataGridProDefaultSlotsComponents';

const _excluded = ['components', 'componentsProps'];

/**
 * The default values of `DataGridProPropsWithDefaultValue` to inject in the props of DataGridPro.
 */
export const DATA_GRID_PRO_PROPS_DEFAULT_VALUES = _extends({}, DATA_GRID_PROPS_DEFAULT_VALUES, {
  scrollEndThreshold: 80,
  treeData: false,
  defaultGroupingExpansionDepth: 0,
  disableColumnPinning: false,
  keepColumnPositionIfDraggedOutside: false,
  disableChildrenFiltering: false,
  disableChildrenSorting: false,
  rowReordering: false,
  rowsLoadingMode: 'client',
  getDetailPanelHeight: () => 500,
});
const defaultSlots = uncapitalizeObjectKeys(DATA_GRID_PRO_DEFAULT_SLOTS_COMPONENTS);

export const useDataGridProProps = inProps => {
  const _useThemeProps = useThemeProps({
    props: inProps,
    name: 'MuiDataGrid',
  }),
    {
      components,
      componentsProps,
    } = _useThemeProps,
    themedProps = _objectWithoutPropertiesLoose(_useThemeProps, _excluded);
  const localeText = React.useMemo(() =>
    _extends({}, GRID_DEFAULT_LOCALE_TEXT, themedProps.localeText), [themedProps.localeText]);
  const slots = React.useMemo(() => computeSlots({
    defaultSlots,
    slots: themedProps.slots,
    components,
  }), [components, themedProps.slots]);

  return React.useMemo(() => {
    var _themedProps$slotProp;

    return _extends({}, DATA_GRID_PRO_PROPS_DEFAULT_VALUES, themedProps, {
      localeText,
      slots,
      slotProps: (_themedProps$slotProp = themedProps.slotProps) != null ? _themedProps$slotProp : componentsProps,
      signature: 'DataGridPro',
    });
  }, [themedProps, localeText, slots, componentsProps]);
};