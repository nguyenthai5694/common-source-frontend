const TAB_KEYCODE = 9;
const HEADER_HEIGHT = 50;
const FOOTER_HEIGHT = 65;

// Manual check closest tag
const checkClosest = (elem, tag) => {
  if (!elem || !tag) return null;

  const ElementPrototype = window.Element.prototype

  if (!ElementPrototype.matches) {
    ElementPrototype.matches =
      (ElementPrototype as any).msMatchesSelector ||
      ElementPrototype.webkitMatchesSelector
  }

  if (!ElementPrototype.closest) {
    do {
      if (elem.matches(tag)) {
        return elem
      }

      elem = elem.parentElement || elem.parentNode
    } while (elem !== null && elem.nodeType === 1)

    return null
  } else {
    return elem.closest(tag)
  }
}

const isElementVisible = (el) => {
  const style = getComputedStyle(el);

  return !(el.getBoundingClientRect().height === 0
    || !style.opacity
    || style.visibility !== 'visible'
    || style.display === 'none');
}

// eslint-disable-next-line complexity
export const handleTabShiftTabIntoView = function (event) {
  if (
    checkClosest(event.target, '.u-footer-fixed-menu')
    || checkClosest(event.target, '.app__main-header')
  ) return;

  if (!event.shiftKey && event.keyCode === TAB_KEYCODE) {
    const footerEl = document.getElementsByClassName('u-footer-fixed-menu');
    const rectEl = event.target?.getBoundingClientRect();

    if (!footerEl || !footerEl[0] || !isElementVisible(footerEl[0])) return;

    const scrollY = window.scrollY || document.documentElement.scrollTop;

    if (rectEl.bottom <= window.innerHeight && rectEl.bottom > (window.innerHeight - FOOTER_HEIGHT)) {
      // bottom element target inside footer element
      const scrollHeight = FOOTER_HEIGHT - (window.innerHeight - rectEl.bottom);

      scrollHeight > 0 && window.scrollTo({ top: scrollY + scrollHeight })
    } else if (
      rectEl.top < window.innerHeight
      && rectEl.top >= window.innerHeight - FOOTER_HEIGHT
      && rectEl.bottom > window.innerHeight
    ) {
      // bottom element target > bottom footer element, and top element target inside footer element
      const scrollHeight = FOOTER_HEIGHT - (window.innerHeight - rectEl.top) + rectEl.height;

      scrollHeight > 0 && window.scrollTo({ top: scrollY + scrollHeight })
    } else if (
      rectEl.height <= (window.innerHeight - HEADER_HEIGHT + FOOTER_HEIGHT)
      && rectEl.bottom > window.innerHeight
    ) {
      // bottom element target > bottom footer element, and top element target < top footer element
      const scrollHeight = rectEl.bottom - window.innerHeight + FOOTER_HEIGHT;

      scrollHeight > 0 && window.scrollTo({ top: scrollY + scrollHeight })
    }
  }

  if (event.shiftKey && event.keyCode === TAB_KEYCODE) {
    const rectEl = event.target?.getBoundingClientRect();

    const scrollY = window.scrollY || document.documentElement.scrollTop;

    if (rectEl.top >= 0 && rectEl.top < HEADER_HEIGHT) {
      // top element target inside header element
      const scrollHeight = HEADER_HEIGHT - rectEl.top;

      scrollHeight > 0 && window.scrollTo({ top: scrollY - scrollHeight })
    } else if (
      rectEl.top < 0
      && rectEl.bottom < HEADER_HEIGHT
      && rectEl.bottom >= 0
    ) {
      // top element target < 0, and bottom element target inside header element
      const scrollHeight = HEADER_HEIGHT - rectEl.bottom + rectEl.height;

      scrollHeight > 0 && window.scrollTo({ top: scrollY - scrollHeight })
    }
  }
}
