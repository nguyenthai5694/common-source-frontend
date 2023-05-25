"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDragRange = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _useEventCallback = _interopRequireDefault(require("@mui/utils/useEventCallback"));
var _dateUtils = require("../internal/utils/date-utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const resolveDateFromTarget = (target, utils) => {
  const timestampString = target.dataset.timestamp;
  if (!timestampString) {
    return null;
  }
  const timestamp = +timestampString;
  return utils.date(new Date(timestamp));
};
const isSameAsDraggingDate = event => {
  const timestampString = event.target.dataset.timestamp;
  return timestampString === event.dataTransfer.getData('draggingDate');
};
const resolveButtonElement = element => {
  if (element) {
    if (element instanceof HTMLButtonElement && !element.disabled) {
      return element;
    }
    if (element.children.length) {
      return resolveButtonElement(element.children[0]);
    }
    return null;
  }
  return element;
};
const resolveElementFromTouch = (event, ignoreTouchTarget) => {
  // don't parse multi-touch result
  if (event.changedTouches?.length === 1 && event.touches.length <= 1) {
    const element = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    // `elementFromPoint` could have resolved preview div or wrapping div
    // might need to recursively find the nested button
    const buttonElement = resolveButtonElement(element);
    if (ignoreTouchTarget && buttonElement === event.changedTouches[0].target) {
      return null;
    }
    return buttonElement;
  }
  return null;
};
const useDragRangeEvents = ({
  utils,
  setRangeDragDay,
  setIsDragging,
  isDragging,
  onDatePositionChange,
  onDrop,
  disableDragEditing,
  dateRange
}) => {
  const emptyDragImgRef = React.useRef(null);
  React.useEffect(() => {
    // Preload the image - required for Safari support: https://stackoverflow.com/a/40923520/3303436
    emptyDragImgRef.current = document.createElement('img');
    emptyDragImgRef.current.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  }, []);
  const isElementDraggable = day => {
    if (day == null) {
      return false;
    }
    const shouldInitDragging = !disableDragEditing && !!dateRange[0] && !!dateRange[1];
    const isSelectedStartDate = (0, _dateUtils.isStartOfRange)(utils, day, dateRange);
    const isSelectedEndDate = (0, _dateUtils.isEndOfRange)(utils, day, dateRange);
    return shouldInitDragging && (isSelectedStartDate || isSelectedEndDate);
  };
  const handleDragStart = (0, _useEventCallback.default)(event => {
    const newDate = resolveDateFromTarget(event.target, utils);
    if (!isElementDraggable(newDate)) {
      return;
    }
    event.stopPropagation();
    if (emptyDragImgRef.current) {
      event.dataTransfer.setDragImage(emptyDragImgRef.current, 0, 0);
    }
    setRangeDragDay(newDate);
    event.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
    const buttonDataset = event.target.dataset;
    if (buttonDataset.timestamp) {
      event.dataTransfer.setData('draggingDate', buttonDataset.timestamp);
    }
    if (buttonDataset.position) {
      onDatePositionChange(buttonDataset.position);
    }
  });
  const handleTouchStart = (0, _useEventCallback.default)(event => {
    const target = resolveElementFromTouch(event);
    if (!target) {
      return;
    }
    const newDate = resolveDateFromTarget(target, utils);
    if (!isElementDraggable(newDate)) {
      return;
    }
    setRangeDragDay(newDate);
    setIsDragging(true);
    const button = event.target;
    const buttonDataset = button.dataset;
    if (buttonDataset.position) {
      onDatePositionChange(buttonDataset.position);
    }
  });
  const handleDragEnter = (0, _useEventCallback.default)(event => {
    if (!isDragging) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'move';
    setRangeDragDay(resolveDateFromTarget(event.target, utils));
  });
  const handleTouchMove = (0, _useEventCallback.default)(event => {
    const target = resolveElementFromTouch(event);
    if (!isDragging || !target) {
      return;
    }
    const newDate = resolveDateFromTarget(target, utils);
    if (newDate) {
      setRangeDragDay(newDate);
    }
  });
  const handleDragLeave = (0, _useEventCallback.default)(event => {
    if (!isDragging) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  });
  const handleDragOver = (0, _useEventCallback.default)(event => {
    if (!isDragging) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'move';
  });
  const handleTouchEnd = (0, _useEventCallback.default)(event => {
    if (!isDragging) {
      return;
    }
    setRangeDragDay(null);
    setIsDragging(false);
    const target = resolveElementFromTouch(event, true);
    if (!target) {
      return;
    }

    // make sure the focused element is the element where touch ended
    target.focus();
    const newDate = resolveDateFromTarget(target, utils);
    if (newDate) {
      onDrop(newDate);
    }
  });
  const handleDragEnd = (0, _useEventCallback.default)(event => {
    if (!isDragging) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    setRangeDragDay(null);
  });
  const handleDrop = (0, _useEventCallback.default)(event => {
    if (!isDragging) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    setRangeDragDay(null);
    // make sure the focused element is the element where drop ended
    event.currentTarget.focus();
    if (isSameAsDraggingDate(event)) {
      return;
    }
    const newDate = resolveDateFromTarget(event.target, utils);
    if (newDate) {
      onDrop(newDate);
    }
  });
  return {
    onDragStart: handleDragStart,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd,
    onDrop: handleDrop,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  };
};
const useDragRange = ({
  disableDragEditing,
  utils,
  onDatePositionChange,
  onDrop,
  dateRange
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [rangeDragDay, setRangeDragDay] = React.useState(null);
  const handleRangeDragDayChange = (0, _useEventCallback.default)(val => {
    if (!utils.isEqual(val, rangeDragDay)) {
      setRangeDragDay(val);
    }
  });
  const draggingDatePosition = React.useMemo(() => {
    const [start, end] = dateRange;
    if (rangeDragDay) {
      if (start && utils.isBefore(rangeDragDay, start)) {
        return 'start';
      }
      if (end && utils.isAfter(rangeDragDay, end)) {
        return 'end';
      }
    }
    return null;
  }, [dateRange, rangeDragDay, utils]);
  const dragRangeEvents = useDragRangeEvents({
    utils,
    onDatePositionChange,
    onDrop,
    setIsDragging,
    isDragging,
    setRangeDragDay: handleRangeDragDayChange,
    disableDragEditing,
    dateRange
  });
  return React.useMemo(() => (0, _extends2.default)({
    isDragging,
    rangeDragDay,
    draggingDatePosition
  }, !disableDragEditing ? dragRangeEvents : {}), [isDragging, rangeDragDay, draggingDatePosition, disableDragEditing, dragRangeEvents]);
};
exports.useDragRange = useDragRange;