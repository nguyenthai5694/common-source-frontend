import { FormikContextType } from 'formik';

/**
 * Note: this var is only used inside common/form,
 * DO NOT expose it to outside world.
 */
export const formItemsOrder = new Map<FormikContextType<any>, string[]>();