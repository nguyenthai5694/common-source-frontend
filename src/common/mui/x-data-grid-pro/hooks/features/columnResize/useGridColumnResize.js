import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_ownerDocument as ownerDocument, unstable_useEventCallback as useEventCallback } from '@mui/utils';
import { gridClasses, useGridApiEventHandler, useGridApiOptionHandler, useGridNativeEventListener, useGridLogger } from '@mui/x-data-grid';
import { clamp, findParentElementFromClassName } from '@mui/x-data-grid/internals';
import { useTheme } from '@mui/material/styles';
import { findGridCellElementsFromCol, getFieldFromHeaderElem, findHeaderElementFromField, findGroupHeaderElementsFromField } from '../../../utils/domUtils';
// TODO: remove support for Safari < 13.
// https://caniuse.com/#search=touch-action
//
// Safari, on iOS, supports touch action since v13.
// Over 80% of the iOS phones are compatible
// in August 2020.
// Utilizing the CSS.supports method to check if touch-action is supported.
// Since CSS.supports is supported on all but Edge@12 and IE and touch-action
// is supported on both Edge@12 and IE if CSS.supports is not available that means that
// touch-action will be supported
let cachedSupportsTouchActionNone = false;
function doesSupportTouchActionNone() {
  if (cachedSupportsTouchActionNone === undefined) {
    if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
      cachedSupportsTouchActionNone = CSS.supports('touch-action', 'none');
    } else {
      cachedSupportsTouchActionNone = true;
    }
  }
  return cachedSupportsTouchActionNone;
}
function trackFinger(event, currentTouchId) {
  if (currentTouchId !== undefined && event.changedTouches) {
    for (let i = 0; i < event.changedTouches.length; i += 1) {
      const touch = event.changedTouches[i];
      if (touch.identifier === currentTouchId) {
        return {
          x: touch.clientX,
          y: touch.clientY
        };
      }
    }
    return false;
  }
  return {
    x: event.clientX,
    y: event.clientY
  };
}
function computeNewWidth(initialOffsetToSeparator, clickX, columnBounds, resizeDirection) {
  let newWidth = initialOffsetToSeparator;
  if (resizeDirection === 'Right') {
    newWidth += clickX - columnBounds.left;
  } else {
    newWidth += columnBounds.right - clickX;
  }
  return newWidth;
}
function computeOffsetToSeparator(clickX, columnBounds, resizeDirection) {
  if (resizeDirection === 'Left') {
    return clickX - columnBounds.left;
  }
  return columnBounds.right - clickX;
}
function flipResizeDirection(side) {
  if (side === 'Right') {
    return 'Left';
  }
  return 'Right';
}
function getResizeDirection(element, direction) {
  const side = element.classList.contains(gridClasses['columnSeparator--sideRight']) ? 'Right' : 'Left';
  if (direction === 'rtl') {
    // Resizing logic should be mirrored in the RTL case
    return flipResizeDirection(side);
  }
  return side;
}
export const columnResizeStateInitializer = state => _extends({}, state, {
  columnResize: {
    resizingColumnField: ''
  }
});

/**
 * @requires useGridColumns (method, event)
 * TODO: improve experience for last column
 */
export const useGridColumnResize = (apiRef, props) => {
  const logger = useGridLogger(apiRef, 'useGridColumnResize');
  const colDefRef = React.useRef();
  const colElementRef = React.useRef();
  const colGroupingElementRef = React.useRef();
  const colCellElementsRef = React.useRef();
  const theme = useTheme();

  // To improve accessibility, the separator has padding on both sides.
  // Clicking inside the padding area should be treated as a click in the separator.
  // This ref stores the offset between the click and the separator.
  const initialOffsetToSeparator = React.useRef();
  const resizeDirection = React.useRef();
  const stopResizeEventTimeout = React.useRef();
  const touchId = React.useRef();
  const updateWidth = newWidth => {
    logger.debug(`Updating width to ${newWidth} for col ${colDefRef.current.field}`);
    const prevWidth = colElementRef.current.offsetWidth;
    const widthDiff = newWidth - prevWidth;
    colDefRef.current.computedWidth = newWidth;
    colDefRef.current.width = newWidth;
    colDefRef.current.flex = 0;
    colElementRef.current.style.width = `${newWidth}px`;
    colElementRef.current.style.minWidth = `${newWidth}px`;
    colElementRef.current.style.maxWidth = `${newWidth}px`;
    [...colCellElementsRef.current, ...colGroupingElementRef.current].forEach(element => {
      const div = element;
      let finalWidth;
      if (div.getAttribute('aria-colspan') === '1') {
        finalWidth = `${newWidth}px`;
      } else {
        // Cell with colspan > 1 cannot be just updated width new width.
        // Instead, we add width diff to the current width.
        finalWidth = `${div.offsetWidth + widthDiff}px`;
      }
      div.style.width = finalWidth;
      div.style.minWidth = finalWidth;
      div.style.maxWidth = finalWidth;
    });
  };
  const handleResizeMouseUp = useEventCallback(nativeEvent => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    stopListening();
    apiRef.current.updateColumns([colDefRef.current]);
    clearTimeout(stopResizeEventTimeout.current);
    stopResizeEventTimeout.current = setTimeout(() => {
      apiRef.current.publishEvent('columnResizeStop', null, nativeEvent);
      if (colDefRef.current) {
        var _colDefRef$current;
        apiRef.current.publishEvent('columnWidthChange', {
          element: colElementRef.current,
          colDef: colDefRef.current,
          width: (_colDefRef$current = colDefRef.current) == null ? void 0 : _colDefRef$current.computedWidth
        }, nativeEvent);
      }
    });
    logger.debug(`Updating col ${colDefRef.current.field} with new width: ${colDefRef.current.width}`);
  });
  const handleResizeMouseMove = useEventCallback(nativeEvent => {
    // Cancel move in case some other element consumed a mouseup event and it was not fired.
    if (nativeEvent.buttons === 0) {
      handleResizeMouseUp(nativeEvent);
      return;
    }
    let newWidth = computeNewWidth(initialOffsetToSeparator.current, nativeEvent.clientX, colElementRef.current.getBoundingClientRect(), resizeDirection.current);
    newWidth = clamp(newWidth, colDefRef.current.minWidth, colDefRef.current.maxWidth);
    updateWidth(newWidth);
    const params = {
      element: colElementRef.current,
      colDef: colDefRef.current,
      width: newWidth
    };
    apiRef.current.publishEvent('columnResize', params, nativeEvent);
  });
  const handleColumnResizeMouseDown = useEventCallback(({
    colDef
  }, event) => {
    var _apiRef$current$colum, _apiRef$current$colum2;
    // Only handle left clicks
    if (event.button !== 0) {
      return;
    }

    // Skip if the column isn't resizable
    if (!event.currentTarget.classList.contains(gridClasses['columnSeparator--resizable'])) {
      return;
    }

    // Avoid text selection
    event.preventDefault();
    logger.debug(`Start Resize on col ${colDef.field}`);
    apiRef.current.publishEvent('columnResizeStart', {
      field: colDef.field
    }, event);
    colDefRef.current = colDef;
    colElementRef.current = (_apiRef$current$colum = apiRef.current.columnHeadersContainerElementRef) == null ? void 0 : _apiRef$current$colum.current.querySelector(`[data-field="${colDef.field}"]`);
    colGroupingElementRef.current = findGroupHeaderElementsFromField((_apiRef$current$colum2 = apiRef.current.columnHeadersContainerElementRef) == null ? void 0 : _apiRef$current$colum2.current, colDef.field);
    colCellElementsRef.current = findGridCellElementsFromCol(colElementRef.current, apiRef.current);
    const doc = ownerDocument(apiRef.current.rootElementRef.current);
    doc.body.style.cursor = 'col-resize';
    resizeDirection.current = getResizeDirection(event.currentTarget, theme.direction);
    initialOffsetToSeparator.current = computeOffsetToSeparator(event.clientX, colElementRef.current.getBoundingClientRect(), resizeDirection.current);
    doc.addEventListener('mousemove', handleResizeMouseMove);
    doc.addEventListener('mouseup', handleResizeMouseUp);
  });
  const handleTouchEnd = useEventCallback(nativeEvent => {
    const finger = trackFinger(nativeEvent, touchId.current);
    if (!finger) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    stopListening();
    apiRef.current.updateColumns([colDefRef.current]);
    clearTimeout(stopResizeEventTimeout.current);
    stopResizeEventTimeout.current = setTimeout(() => {
      apiRef.current.publishEvent('columnResizeStop', null, nativeEvent);
    });
    logger.debug(`Updating col ${colDefRef.current.field} with new width: ${colDefRef.current.width}`);
  });
  const handleTouchMove = useEventCallback(nativeEvent => {
    const finger = trackFinger(nativeEvent, touchId.current);
    if (!finger) {
      return;
    }

    // Cancel move in case some other element consumed a touchmove event and it was not fired.
    if (nativeEvent.type === 'mousemove' && nativeEvent.buttons === 0) {
      handleTouchEnd(nativeEvent);
      return;
    }
    let newWidth = computeNewWidth(initialOffsetToSeparator.current, finger.x, colElementRef.current.getBoundingClientRect(), resizeDirection.current);
    newWidth = clamp(newWidth, colDefRef.current.minWidth, colDefRef.current.maxWidth);
    updateWidth(newWidth);
    const params = {
      element: colElementRef.current,
      colDef: colDefRef.current,
      width: newWidth
    };
    apiRef.current.publishEvent('columnResize', params, nativeEvent);
  });
  const handleTouchStart = useEventCallback(event => {
    var _apiRef$current$colum3, _apiRef$current$colum4;
    const cellSeparator = findParentElementFromClassName(event.target, gridClasses['columnSeparator--resizable']);
    // Let the event bubble if the target is not a col separator
    if (!cellSeparator) {
      return;
    }
    // If touch-action: none; is not supported we need to prevent the scroll manually.
    if (!doesSupportTouchActionNone()) {
      event.preventDefault();
    }
    const touch = event.changedTouches[0];
    if (touch != null) {
      // A number that uniquely identifies the current finger in the touch session.
      touchId.current = touch.identifier;
    }
    colElementRef.current = findParentElementFromClassName(event.target, gridClasses.columnHeader);
    const field = getFieldFromHeaderElem(colElementRef.current);
    const colDef = apiRef.current.getColumn(field);
    colGroupingElementRef.current = findGroupHeaderElementsFromField((_apiRef$current$colum3 = apiRef.current.columnHeadersContainerElementRef) == null ? void 0 : _apiRef$current$colum3.current, field);
    logger.debug(`Start Resize on col ${colDef.field}`);
    apiRef.current.publishEvent('columnResizeStart', {
      field
    }, event);
    colDefRef.current = colDef;
    colElementRef.current = findHeaderElementFromField((_apiRef$current$colum4 = apiRef.current.columnHeadersElementRef) == null ? void 0 : _apiRef$current$colum4.current, colDef.field);
    colCellElementsRef.current = findGridCellElementsFromCol(colElementRef.current, apiRef.current);
    resizeDirection.current = getResizeDirection(event.target, theme.direction);
    initialOffsetToSeparator.current = computeOffsetToSeparator(touch.clientX, colElementRef.current.getBoundingClientRect(), resizeDirection.current);
    const doc = ownerDocument(event.currentTarget);
    doc.addEventListener('touchmove', handleTouchMove);
    doc.addEventListener('touchend', handleTouchEnd);
  });
  const stopListening = React.useCallback(() => {
    const doc = ownerDocument(apiRef.current.rootElementRef.current);
    doc.body.style.removeProperty('cursor');
    doc.removeEventListener('mousemove', handleResizeMouseMove);
    doc.removeEventListener('mouseup', handleResizeMouseUp);
    doc.removeEventListener('touchmove', handleTouchMove);
    doc.removeEventListener('touchend', handleTouchEnd);
  }, [apiRef, handleResizeMouseMove, handleResizeMouseUp, handleTouchMove, handleTouchEnd]);
  const handleResizeStart = React.useCallback(({
    field
  }) => {
    apiRef.current.setState(state => _extends({}, state, {
      columnResize: _extends({}, state.columnResize, {
        resizingColumnField: field
      })
    }));
    apiRef.current.forceUpdate();
  }, [apiRef]);
  const handleResizeStop = React.useCallback(() => {
    apiRef.current.setState(state => _extends({}, state, {
      columnResize: _extends({}, state.columnResize, {
        resizingColumnField: ''
      })
    }));
    apiRef.current.forceUpdate();
  }, [apiRef]);
  React.useEffect(() => {
    return () => {
      clearTimeout(stopResizeEventTimeout.current);
      stopListening();
    };
  }, [apiRef, handleTouchStart, stopListening]);
  useGridNativeEventListener(apiRef, () => {
    var _apiRef$current$colum5;
    return (_apiRef$current$colum5 = apiRef.current.columnHeadersElementRef) == null ? void 0 : _apiRef$current$colum5.current;
  }, 'touchstart', handleTouchStart, {
    passive: doesSupportTouchActionNone()
  });
  useGridApiEventHandler(apiRef, 'columnSeparatorMouseDown', handleColumnResizeMouseDown);
  useGridApiEventHandler(apiRef, 'columnResizeStart', handleResizeStart);
  useGridApiEventHandler(apiRef, 'columnResizeStop', handleResizeStop);
  useGridApiOptionHandler(apiRef, 'columnResize', props.onColumnResize);
  useGridApiOptionHandler(apiRef, 'columnWidthChange', props.onColumnWidthChange);
};