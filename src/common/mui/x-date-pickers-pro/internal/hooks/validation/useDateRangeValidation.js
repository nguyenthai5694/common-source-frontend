import { validateDate } from '@mui/x-date-pickers/internals';
import _extends from '@babel/runtime/helpers/esm/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import { isRangeValid } from '../../utils/date-utils';

const _excluded = ['shouldDisableDate'];

export const validateDateRange = ({
  props,
  value,
  adapter,
}) => {
  const [start, end] = value;
  const {
    shouldDisableDate,
  } = props,
    otherProps = _objectWithoutPropertiesLoose(props, _excluded);
  const dateValidations = [validateDate({
    adapter,
    value: start,
    props: _extends({}, otherProps, {
      shouldDisableDate: day => !!(shouldDisableDate != null && shouldDisableDate(day, 'start')),
    }),
  }), validateDate({
    adapter,
    value: end,
    props: _extends({}, otherProps, {
      shouldDisableDate: day => !!(shouldDisableDate != null && shouldDisableDate(day, 'end')),
    }),
  })];

  if (dateValidations[0] || dateValidations[1]) {
    return dateValidations;
  }

  // for partial input
  if (start === null || end === null) {
    return [null, null];
  }

  if (!isRangeValid(adapter.utils, value)) {
    return ['invalidRange', 'invalidRange'];
  }

  return [null, null];
};