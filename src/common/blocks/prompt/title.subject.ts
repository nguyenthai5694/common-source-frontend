import { BehaviorSubject } from 'rxjs';

/**
 * TODO: `titleSubject` need to placed at other place.
 */
export const titleSubject = new BehaviorSubject(window.document.title);