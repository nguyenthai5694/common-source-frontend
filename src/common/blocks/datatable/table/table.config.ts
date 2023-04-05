export const calcScrollbarWidth = () => {
  const outer = document.createElement('div')

  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll'
  document.body.appendChild(outer)

  const inner = document.createElement('div')

  outer.appendChild(inner)

  const scrollbarWidth = Math.floor(outer.offsetWidth - inner.offsetWidth)

  outer.parentNode.removeChild(outer)

  return scrollbarWidth
}

export const findFocusableElements = (element) => {
  return element.querySelectorAll(`
    a:not([disabled]),
    button:not([disabled]),
    input:not([disabled]),
    textarea:not([disabled]),
    select:not([disabled]),
    .p-select__field:not(.-disabled)
  `);
}

export const calculatedScrollbarWidth = calcScrollbarWidth();

export const tolerance = 20;
export const checkboxWidth = 46;
export const radioWidth = 44;
export const dragWidth = 50;
export const marginTopBottomWindow = 90;
export const marginTopBottomModalBody = 40;
export const titleTableHeight = 52;
/** normal table vs table has column group. */
export const normalTableHeaderHeight = 44;
export const tableHasColGroupHeight = 50;
export const tableMinHeight = 400; // px

// 50 より小さくならないように調整
export const columnMinWidth = 50;