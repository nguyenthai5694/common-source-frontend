/* eslint-disable max-len */
import * as React from 'react';
import { styled, useThemeProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { PickersToolbar, PickersToolbarButton, pickersToolbarClasses, useUtils, useLocaleText } from '@mui/x-date-pickers/internals';
import clsx from 'clsx';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';
import _extends from '@babel/runtime/helpers/esm/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import PropTypes from 'prop-types';
import { getDateRangePickerToolbarUtilityClass } from './dateRangePickerToolbarClasses';

const _excluded = ['value', 'rangePosition', 'onRangePositionChange', 'toolbarFormat', 'className'];

const useUtilityClasses = ownerState => {
  const {
    classes,
  } = ownerState;
  const slots = {
    root: ['root'],
    container: ['container'],
  };

  return composeClasses(slots, getDateRangePickerToolbarUtilityClass, classes);
};
const DateRangePickerToolbarRoot = styled(PickersToolbar, {
  name: 'MuiDateRangePickerToolbar',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root,
})({
  [`& .${pickersToolbarClasses.penIconButton}`]: {
    position: 'relative',
    top: 4,
  },
});
const DateRangePickerToolbarContainer = styled('div', {
  name: 'MuiDateRangePickerToolbar',
  slot: 'Container',
  overridesResolver: (_, styles) => styles.container,
})({
  display: 'flex',
});
const DateRangePickerToolbar = /*#__PURE__*/React.forwardRef(function DateRangePickerToolbar(inProps, ref) {
  const utils = useUtils();
  const props = useThemeProps({
    props: inProps,
    name: 'MuiDateRangePickerToolbar',
  });
  const {
    value: [start, end],
    rangePosition,
    onRangePositionChange,
    toolbarFormat,
    className,
  } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const localeText = useLocaleText();
  const startDateValue = start ? utils.formatByString(start, toolbarFormat || utils.formats.shortDate) : localeText.start;
  const endDateValue = end ? utils.formatByString(end, toolbarFormat || utils.formats.shortDate) : localeText.end;
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  return /*#__PURE__*/_jsx(DateRangePickerToolbarRoot, _extends({}, other, {
    toolbarTitle: localeText.dateRangePickerToolbarTitle,
    isLandscape: false,
    className: clsx(className, classes.root),
    ownerState,
    ref,
    children: /*#__PURE__*/_jsxs(DateRangePickerToolbarContainer, {
      className: classes.container,
      children: [/*#__PURE__*/_jsx(PickersToolbarButton, {
        variant: start !== null ? 'h5' : 'h6',
        value: startDateValue,
        selected: rangePosition === 'start',
        onClick: () => onRangePositionChange('start'),
      }), /*#__PURE__*/_jsxs(Typography, {
        variant: 'h5',
        children: ['\xA0', '–', '\xA0'],
      }), /*#__PURE__*/_jsx(PickersToolbarButton, {
        variant: end !== null ? 'h5' : 'h6',
        value: endDateValue,
        selected: rangePosition === 'end',
        onClick: () => onRangePositionChange('end'),
      })],
    }),
  }));
});

process.env.NODE_ENV !== 'production' ? DateRangePickerToolbar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  classes: PropTypes.object,
  /**
   * className applied to the root component.
   */
  className: PropTypes.string,
  disabled: PropTypes.bool,
  /**
   * If `true`, show the toolbar even in desktop mode.
   * @default `true` for Desktop, `false` for Mobile.
   */
  hidden: PropTypes.bool,
  onRangePositionChange: PropTypes.func.isRequired,
  rangePosition: PropTypes.oneOf(['end', 'start']).isRequired,
  readOnly: PropTypes.bool,
  titleId: PropTypes.string,
  /**
   * Toolbar date format.
   */
  toolbarFormat: PropTypes.string,
  /**
   * Toolbar value placeholder—it is displayed when the value is empty.
   * @default "––"
   */
  toolbarPlaceholder: PropTypes.node,
  value: PropTypes.arrayOf(PropTypes.any).isRequired,
} : void 0;
export { DateRangePickerToolbar };