/* eslint-disable max-len */
import { styled } from '@mui/material/styles';
import { usePicker, DIALOG_WIDTH } from '@mui/x-date-pickers/internals';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersLayout } from '@mui/x-date-pickers/PickersLayout';
import clsx from 'clsx';
import { jsx as _jsx } from 'react/jsx-runtime';
import _extends from '@babel/runtime/helpers/esm/extends';
import { useRangePosition } from '../useRangePosition';

const PickerStaticLayout = styled(PickersLayout)(({
  theme,
}) => ({
  overflow: 'hidden',
  minWidth: DIALOG_WIDTH,
  backgroundColor: (theme.vars || theme).palette.background.paper,
}));

/**
 * Hook managing all the range static pickers:
 * - StaticDateRangePicker
 */
export const useStaticRangePicker = ({
  props,
  valueManager,
  validator,
  ref,
}) => {
  var _slots$layout;
  const {
    localeText,
    slots,
    slotProps,
    className,
    sx,
    displayStaticWrapperAs,
    autoFocus,
  } = props;
  const {
    rangePosition,
    onRangePositionChange,
  } = useRangePosition(props);
  const {
    layoutProps,
    renderCurrentView,
  } = usePicker({
    props,
    valueManager,
    validator,
    autoFocusView: autoFocus != null ? autoFocus : false,
    additionalViewProps: {
      rangePosition,
      onRangePositionChange,
    },
    wrapperVariant: displayStaticWrapperAs,
  });
  const Layout = (_slots$layout = slots == null ? void 0 : slots.layout) != null ? _slots$layout : PickerStaticLayout;
  const slotPropsForLayout = _extends({}, slotProps, {
    toolbar: _extends({}, slotProps == null ? void 0 : slotProps.toolbar, {
      rangePosition,
      onRangePositionChange,
    }),
  });
  const renderPicker = () => {
    var _slotProps$layout, _slotProps$layout2, _slotProps$layout3;

    return /*#__PURE__*/_jsx(LocalizationProvider, {
      localeText,
      children: /*#__PURE__*/_jsx(Layout, _extends({}, layoutProps, slotProps == null ? void 0 : slotProps.layout, {
        slots,
        slotProps: slotPropsForLayout,
        sx: [...(Array.isArray(sx) ? sx : [sx]), ...(Array.isArray(slotProps == null ? void 0 : (_slotProps$layout = slotProps.layout) == null ? void 0 : _slotProps$layout.sx) ? slotProps.layout.sx : [slotProps == null ? void 0 : (_slotProps$layout2 = slotProps.layout) == null ? void 0 : _slotProps$layout2.sx])],
        className: clsx(className, slotProps == null ? void 0 : (_slotProps$layout3 = slotProps.layout) == null ? void 0 : _slotProps$layout3.className),
        ref,
        children: renderCurrentView(),
      })),
    });
  };

  return {
    renderPicker,
  };
};