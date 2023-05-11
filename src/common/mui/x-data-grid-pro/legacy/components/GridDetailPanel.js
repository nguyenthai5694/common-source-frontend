import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["rowId", "height", "style"];
import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useGridRootProps } from '@mui/x-data-grid';
import { useGridPrivateApiContext } from '../hooks/utils/useGridPrivateApiContext';
import { jsx as _jsx } from "react/jsx-runtime";
var DetailPanel = styled(Box, {
  name: 'MuiDataGrid',
  slot: 'DetailPanel',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.detailPanel;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return {
    zIndex: 2,
    width: '100%',
    position: 'absolute',
    backgroundColor: (theme.vars || theme).palette.background.default,
    overflow: 'auto'
  };
});
function GridDetailPanel(props) {
  var rowId = props.rowId,
    height = props.height,
    _props$style = props.style,
    styleProp = _props$style === void 0 ? {} : _props$style,
    other = _objectWithoutProperties(props, _excluded);
  var apiRef = useGridPrivateApiContext();
  var ref = React.useRef();
  var rootProps = useGridRootProps();
  var ownerState = rootProps;
  React.useLayoutEffect(function () {
    if (height === 'auto' && ref.current && typeof ResizeObserver === 'undefined') {
      // Fallback for IE
      apiRef.current.storeDetailPanelHeight(rowId, ref.current.clientHeight);
    }
  }, [apiRef, height, rowId]);
  React.useLayoutEffect(function () {
    var hasFixedHeight = height !== 'auto';
    if (!ref.current || hasFixedHeight || typeof ResizeObserver === 'undefined') {
      return undefined;
    }
    var resizeObserver = new ResizeObserver(function (entries) {
      var _entries = _slicedToArray(entries, 1),
        entry = _entries[0];
      var observedHeight = entry.borderBoxSize && entry.borderBoxSize.length > 0 ? entry.borderBoxSize[0].blockSize : entry.contentRect.height;
      apiRef.current.storeDetailPanelHeight(rowId, observedHeight);
    });
    resizeObserver.observe(ref.current);
    return function () {
      return resizeObserver.disconnect();
    };
  }, [apiRef, height, rowId]);
  var style = _extends({}, styleProp, {
    height: height
  });
  return /*#__PURE__*/_jsx(DetailPanel, _extends({
    ref: ref,
    ownerState: ownerState,
    style: style
  }, other));
}
export { GridDetailPanel };