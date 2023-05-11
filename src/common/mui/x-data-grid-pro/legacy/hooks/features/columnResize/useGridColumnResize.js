import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
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
var cachedSupportsTouchActionNone = false;
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
    for (var i = 0; i < event.changedTouches.length; i += 1) {
      var touch = event.changedTouches[i];
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
  var newWidth = initialOffsetToSeparator;
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
  var side = element.classList.contains(gridClasses['columnSeparator--sideRight']) ? 'Right' : 'Left';
  if (direction === 'rtl') {
    // Resizing logic should be mirrored in the RTL case
    return flipResizeDirection(side);
  }
  return side;
}
export var columnResizeStateInitializer = function columnResizeStateInitializer(state) {
  return _extends({}, state, {
    columnResize: {
      resizingColumnField: ''
    }
  });
};

/**
 * @requires useGridColumns (method, event)
 * TODO: improve experience for last column
 */
export var useGridColumnResize = function useGridColumnResize(apiRef, props) {
  var logger = useGridLogger(apiRef, 'useGridColumnResize');
  var colDefRef = React.useRef();
  var colElementRef = React.useRef();
  var colGroupingElementRef = React.useRef();
  var colCellElementsRef = React.useRef();
  var theme = useTheme();

  // To improve accessibility, the separator has padding on both sides.
  // Clicking inside the padding area should be treated as a click in the separator.
  // This ref stores the offset between the click and the separator.
  var initialOffsetToSeparator = React.useRef();
  var resizeDirection = React.useRef();
  var stopResizeEventTimeout = React.useRef();
  var touchId = React.useRef();
  var updateWidth = function updateWidth(newWidth) {
    logger.debug("Updating width to ".concat(newWidth, " for col ").concat(colDefRef.current.field));
    var prevWidth = colElementRef.current.offsetWidth;
    var widthDiff = newWidth - prevWidth;
    colDefRef.current.computedWidth = newWidth;
    colDefRef.current.width = newWidth;
    colDefRef.current.flex = 0;
    colElementRef.current.style.width = "".concat(newWidth, "px");
    colElementRef.current.style.minWidth = "".concat(newWidth, "px");
    colElementRef.current.style.maxWidth = "".concat(newWidth, "px");
    [].concat(_toConsumableArray(colCellElementsRef.current), _toConsumableArray(colGroupingElementRef.current)).forEach(function (element) {
      var div = element;
      var finalWidth;
      if (div.getAttribute('aria-colspan') === '1') {
        finalWidth = "".concat(newWidth, "px");
      } else {
        // Cell with colspan > 1 cannot be just updated width new width.
        // Instead, we add width diff to the current width.
        finalWidth = "".concat(div.offsetWidth + widthDiff, "px");
      }
      div.style.width = finalWidth;
      div.style.minWidth = finalWidth;
      div.style.maxWidth = finalWidth;
    });
  };
  var handleResizeMouseUp = useEventCallback(function (nativeEvent) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    stopListening();
    apiRef.current.updateColumns([colDefRef.current]);
    clearTimeout(stopResizeEventTimeout.current);
    stopResizeEventTimeout.current = setTimeout(function () {
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
    logger.debug("Updating col ".concat(colDefRef.current.field, " with new width: ").concat(colDefRef.current.width));
  });
  var handleResizeMouseMove = useEventCallback(function (nativeEvent) {
    // Cancel move in case some other element consumed a mouseup event and it was not fired.
    if (nativeEvent.buttons === 0) {
      handleResizeMouseUp(nativeEvent);
      return;
    }
    var newWidth = computeNewWidth(initialOffsetToSeparator.current, nativeEvent.clientX, colElementRef.current.getBoundingClientRect(), resizeDirection.current);
    newWidth = clamp(newWidth, colDefRef.current.minWidth, colDefRef.current.maxWidth);
    updateWidth(newWidth);
    var params = {
      element: colElementRef.current,
      colDef: colDefRef.current,
      width: newWidth
    };
    apiRef.current.publishEvent('columnResize', params, nativeEvent);
  });
  var handleColumnResizeMouseDown = useEventCallback(function (_ref, event) {
    var _apiRef$current$colum, _apiRef$current$colum2;
    var colDef = _ref.colDef;
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
    logger.debug("Start Resize on col ".concat(colDef.field));
    apiRef.current.publishEvent('columnResizeStart', {
      field: colDef.field
    }, event);
    colDefRef.current = colDef;
    colElementRef.current = (_apiRef$current$colum = apiRef.current.columnHeadersContainerElementRef) == null ? void 0 : _apiRef$current$colum.current.querySelector("[data-field=\"".concat(colDef.field, "\"]"));
    colGroupingElementRef.current = findGroupHeaderElementsFromField((_apiRef$current$colum2 = apiRef.current.columnHeadersContainerElementRef) == null ? void 0 : _apiRef$current$colum2.current, colDef.field);
    colCellElementsRef.current = findGridCellElementsFromCol(colElementRef.current, apiRef.current);
    var doc = ownerDocument(apiRef.current.rootElementRef.current);
    doc.body.style.cursor = 'col-resize';
    resizeDirection.current = getResizeDirection(event.currentTarget, theme.direction);
    initialOffsetToSeparator.current = computeOffsetToSeparator(event.clientX, colElementRef.current.getBoundingClientRect(), resizeDirection.current);
    doc.addEventListener('mousemove', handleResizeMouseMove);
    doc.addEventListener('mouseup', handleResizeMouseUp);
  });
  var handleTouchEnd = useEventCallback(function (nativeEvent) {
    var finger = trackFinger(nativeEvent, touchId.current);
    if (!finger) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    stopListening();
    apiRef.current.updateColumns([colDefRef.current]);
    clearTimeout(stopResizeEventTimeout.current);
    stopResizeEventTimeout.current = setTimeout(function () {
      apiRef.current.publishEvent('columnResizeStop', null, nativeEvent);
    });
    logger.debug("Updating col ".concat(colDefRef.current.field, " with new width: ").concat(colDefRef.current.width));
  });
  var handleTouchMove = useEventCallback(function (nativeEvent) {
    var finger = trackFinger(nativeEvent, touchId.current);
    if (!finger) {
      return;
    }

    // Cancel move in case some other element consumed a touchmove event and it was not fired.
    if (nativeEvent.type === 'mousemove' && nativeEvent.buttons === 0) {
      handleTouchEnd(nativeEvent);
      return;
    }
    var newWidth = computeNewWidth(initialOffsetToSeparator.current, finger.x, colElementRef.current.getBoundingClientRect(), resizeDirection.current);
    newWidth = clamp(newWidth, colDefRef.current.minWidth, colDefRef.current.maxWidth);
    updateWidth(newWidth);
    var params = {
      element: colElementRef.current,
      colDef: colDefRef.current,
      width: newWidth
    };
    apiRef.current.publishEvent('columnResize', params, nativeEvent);
  });
  var handleTouchStart = useEventCallback(function (event) {
    var _apiRef$current$colum3, _apiRef$current$colum4;
    var cellSeparator = findParentElementFromClassName(event.target, gridClasses['columnSeparator--resizable']);
    // Let the event bubble if the target is not a col separator
    if (!cellSeparator) {
      return;
    }
    // If touch-action: none; is not supported we need to prevent the scroll manually.
    if (!doesSupportTouchActionNone()) {
      event.preventDefault();
    }
    var touch = event.changedTouches[0];
    if (touch != null) {
      // A number that uniquely identifies the current finger in the touch session.
      touchId.current = touch.identifier;
    }
    colElementRef.current = findParentElementFromClassName(event.target, gridClasses.columnHeader);
    var field = getFieldFromHeaderElem(colElementRef.current);
    var colDef = apiRef.current.getColumn(field);
    colGroupingElementRef.current = findGroupHeaderElementsFromField((_apiRef$current$colum3 = apiRef.current.columnHeadersContainerElementRef) == null ? void 0 : _apiRef$current$colum3.current, field);
    logger.debug("Start Resize on col ".concat(colDef.field));
    apiRef.current.publishEvent('columnResizeStart', {
      field: field
    }, event);
    colDefRef.current = colDef;
    colElementRef.current = findHeaderElementFromField((_apiRef$current$colum4 = apiRef.current.columnHeadersElementRef) == null ? void 0 : _apiRef$current$colum4.current, colDef.field);
    colCellElementsRef.current = findGridCellElementsFromCol(colElementRef.current, apiRef.current);
    resizeDirection.current = getResizeDirection(event.target, theme.direction);
    initialOffsetToSeparator.current = computeOffsetToSeparator(touch.clientX, colElementRef.current.getBoundingClientRect(), resizeDirection.current);
    var doc = ownerDocument(event.currentTarget);
    doc.addEventListener('touchmove', handleTouchMove);
    doc.addEventListener('touchend', handleTouchEnd);
  });
  var stopListening = React.useCallback(function () {
    var doc = ownerDocument(apiRef.current.rootElementRef.current);
    doc.body.style.removeProperty('cursor');
    doc.removeEventListener('mousemove', handleResizeMouseMove);
    doc.removeEventListener('mouseup', handleResizeMouseUp);
    doc.removeEventListener('touchmove', handleTouchMove);
    doc.removeEventListener('touchend', handleTouchEnd);
  }, [apiRef, handleResizeMouseMove, handleResizeMouseUp, handleTouchMove, handleTouchEnd]);
  var handleResizeStart = React.useCallback(function (_ref2) {
    var field = _ref2.field;
    apiRef.current.setState(function (state) {
      return _extends({}, state, {
        columnResize: _extends({}, state.columnResize, {
          resizingColumnField: field
        })
      });
    });
    apiRef.current.forceUpdate();
  }, [apiRef]);
  var handleResizeStop = React.useCallback(function () {
    apiRef.current.setState(function (state) {
      return _extends({}, state, {
        columnResize: _extends({}, state.columnResize, {
          resizingColumnField: ''
        })
      });
    });
    apiRef.current.forceUpdate();
  }, [apiRef]);
  React.useEffect(function () {
    return function () {
      clearTimeout(stopResizeEventTimeout.current);
      stopListening();
    };
  }, [apiRef, handleTouchStart, stopListening]);
  useGridNativeEventListener(apiRef, function () {
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