"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridDetailPanel = GridDetailPanel;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _styles = require("@mui/material/styles");
var _xDataGrid = require("@mui/x-data-grid");
var _useGridPrivateApiContext = require("../hooks/utils/useGridPrivateApiContext");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["rowId", "height", "style"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const DetailPanel = (0, _styles.styled)(_Box.default, {
  name: 'MuiDataGrid',
  slot: 'DetailPanel',
  overridesResolver: (props, styles) => styles.detailPanel
})(({
  theme
}) => ({
  zIndex: 2,
  width: '100%',
  position: 'absolute',
  backgroundColor: (theme.vars || theme).palette.background.default,
  overflow: 'auto'
}));
function GridDetailPanel(props) {
  const {
      rowId,
      height,
      style: styleProp = {}
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const apiRef = (0, _useGridPrivateApiContext.useGridPrivateApiContext)();
  const ref = React.useRef();
  const rootProps = (0, _xDataGrid.useGridRootProps)();
  const ownerState = rootProps;
  React.useLayoutEffect(() => {
    if (height === 'auto' && ref.current && typeof ResizeObserver === 'undefined') {
      // Fallback for IE
      apiRef.current.storeDetailPanelHeight(rowId, ref.current.clientHeight);
    }
  }, [apiRef, height, rowId]);
  React.useLayoutEffect(() => {
    const hasFixedHeight = height !== 'auto';
    if (!ref.current || hasFixedHeight || typeof ResizeObserver === 'undefined') {
      return undefined;
    }
    const resizeObserver = new ResizeObserver(entries => {
      const [entry] = entries;
      const observedHeight = entry.borderBoxSize && entry.borderBoxSize.length > 0 ? entry.borderBoxSize[0].blockSize : entry.contentRect.height;
      apiRef.current.storeDetailPanelHeight(rowId, observedHeight);
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [apiRef, height, rowId]);
  const style = (0, _extends2.default)({}, styleProp, {
    height
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(DetailPanel, (0, _extends2.default)({
    ref: ref,
    ownerState: ownerState,
    style: style
  }, other));
}