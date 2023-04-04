/**
 * check value default flag with flag
 * @param mDefault
 * @param mFlag
 */

export function validateDefaultFlag(mDefault, mFlag){
  return !(Number(mDefault) && !Number(mFlag))
}
