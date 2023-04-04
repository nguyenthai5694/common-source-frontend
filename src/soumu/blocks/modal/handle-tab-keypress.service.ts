import { MutableRefObject } from 'react'

function findFocusableElements(element) {
  return element.querySelectorAll(`
    a:not([disabled]),
    button:not([disabled]),
    input:not([disabled]),
    textarea:not([disabled]),
    select:not([disabled]),
    .p-select__field:not(.-disabled)
  `);
}

function isVisible(elem) {
  let data = false;

  try {
    data = !!elem.offsetWidth || !!elem.offsetHeight || !!elem.getClientRects().length;
  } catch (e) { }

  return data;
}

export function handleAddEventFocusin(
  listModalRef: Array<MutableRefObject<HTMLDivElement>>,
  modalRef: MutableRefObject<HTMLDivElement>,
) {
  listModalRef.push(modalRef);

  const currentModalRef = listModalRef[listModalRef.length - 1];

  currentModalRef.current?.focus();

  const focusinEventListener = (event) => {
    const currentModalRef = listModalRef[listModalRef.length - 1];

    if (
      currentModalRef.current
      && currentModalRef.current !== event.target
      && !currentModalRef.current.contains(event.target)
      && !currentModalRef.current.hasAttribute('hidden')
    ) {
      const focusableElements = findFocusableElements(currentModalRef.current);

      if (event.target?.classList?.contains('modal-sentinel-start')) {
        focusableElements.item(focusableElements.length - 1).focus();
      } else if (event.target?.classList?.contains('modal-sentinel-end')) {
        let idxVisible = 0;

        while (!isVisible(focusableElements.item(idxVisible))) {
          idxVisible++;

          if (idxVisible === (focusableElements.length - 1)) break;
        }
        focusableElements.item(idxVisible).focus();
      } else {
        currentModalRef.current.focus();
      }
    }
  }

  document.addEventListener('focusin', focusinEventListener);

  return focusinEventListener;
}

export function handleRemoveEventFocusin(listModalRef: Array<MutableRefObject<HTMLDivElement>>, focusinEventListener) {
  document.removeEventListener('focusin', focusinEventListener);
  listModalRef.length && listModalRef.splice(listModalRef.length - 1, 1);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default null;
