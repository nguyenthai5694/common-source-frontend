export function closest(element, tag) {
  if (!element || !tag) return null;

  const ElementPrototype = window.Element.prototype

  if (!ElementPrototype.matches) {
    ElementPrototype.matches =
      (ElementPrototype as any).msMatchesSelector ||
      ElementPrototype.webkitMatchesSelector
  }

  if (ElementPrototype.closest) {
    return element.closest(tag)
  }

  do {
    if (element.matches(tag)) return element

    element = element.parentElement || element.parentNode
  } while (element !== null && element.nodeType === 1)

  return null
}
