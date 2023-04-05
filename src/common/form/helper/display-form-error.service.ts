import { FormikContextType, FormikProps } from 'formik'
import { addToast } from 'common/parts/toast/toast.service'
import { formItemsOrder } from './form-item-order.service'

/**
* @param hasArrayField
* Enable when used with field array
*/
export function displayFormErrors(
  formik: FormikContextType<any>,
  hasArrayField?: boolean,
  totalItemsFormError?: number,
  ignoreFieldKeys?: string[],
): boolean {
  if (ignoreFieldKeys) {
    ignoreFieldKeys.forEach(ignoreKey => {
      delete formik.errors[ignoreKey];
    })
  }

  if (!Object.keys(formik.errors).length) {
    return false;
  }

  showError(formik, formik.errors, hasArrayField, totalItemsFormError);

  return true;
}

export const ignoreValue = Symbol();
/**
 * Display form errors, ignore some 'required' errors.
 *
 * TODO:
 * - support nested value(array, object).
 */
export async function displayErrorWithInsufficientRequire(
  formik,
  requiredFields?: string[],
  ignoreFieldKeys?: string[],
) {
  const originalErrors = { ...formik.errors };
  const values = { ...formik.values };

  //pass required
  _.forOwn(formik.errors, function (_, key) {
    // eslint-disable-next-line max-len
    if ((!values[key] || !values[key].length) && (!requiredFields || (requiredFields && !requiredFields.includes(key)))) {
      values[key] = ignoreValue;
    }
  });

  _.forOwn(values, function (_, key) {
    if (values[key] === undefined)
      values[key] = '';
  });

  let errors;

  // hotfix
  try {
    errors = await formik.validateForm(values);
  } catch (err) { }

  if (ignoreFieldKeys) {
    ignoreFieldKeys.forEach(ignoreKey => {
      delete errors[ignoreKey];
    })
  }

  const hasError = !!Object.keys(errors).length;

  formik.setErrors(originalErrors);

  if (hasError) {
    showError(formik, errors);
  }

  return hasError;
}

function showError(formik: FormikProps<any>, errors, hasArrayField = false, totalItemsFormError?: number) {
  const touched = {};

  const orders = formItemsOrder.get(formik);

  if (!orders) return

  let newErrors = {};
  const errorsKey = Object.keys(errors);

  errors && errorsKey.length && errorsKey.forEach(key => {
    if (!_.isArray(errors[key])) {
      newErrors[key] = errors[key];

      return;
    }

    for (let errorIndex = 0; errorIndex < errors[key].length; errorIndex++) {
      if (!errors[key][errorIndex]) {
        continue;
      }

      const nameDatas = Object.keys(errors[key][errorIndex]);

      if (!nameDatas.length) {
        newErrors[`${key}[${errorIndex}]`] = errors[key][errorIndex];
        continue;
      }

      for (let nameData of nameDatas) {
        newErrors[`${key}[${errorIndex}].${nameData}`] = errors[key][errorIndex][nameData];
      }
    }
  });
  const listErrorKeys = orders.filter(itemName => typeof newErrors[itemName] !== 'undefined');

  listErrorKeys.forEach(key => {
    _.set(touched, key, true);
  })

  formik.setTouched(touched);

  let displayError = newErrors[listErrorKeys[0]] as string
  const arrayError = newErrors[listErrorKeys[0]]

  if (hasArrayField && Array.isArray(arrayError)) {
    for (let i = 0; i < arrayError.length; ++i) {
      if (arrayError[i]) {
        displayError = arrayError[i][Object.keys(arrayError[i])[0]]
        break
      }
    }
  }

  addToast({ title: displayError, status: 'error', totalItemsFormError: totalItemsFormError ?? errorsKey.length });
}
