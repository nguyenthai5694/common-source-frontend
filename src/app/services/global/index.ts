/**
 * GLOBAL HELPER
 */
import * as lodash from 'lodash'
// eslint-disable-next-line import/order
import { msg } from 'app/services/message'
import { sanitize } from 'app/services/sanitize'

/**
 * Lodash is relatively big, but this app is client side render,
 * so it is ok to fetch common library on initial.
 */
window['_'] = lodash;

window.text = msg;

window.__active_cookie__ = window.__active_cookie__ || '';

window.sanitize = sanitize;

// window.getEnforcementLaw = getEnforcementLaw;
