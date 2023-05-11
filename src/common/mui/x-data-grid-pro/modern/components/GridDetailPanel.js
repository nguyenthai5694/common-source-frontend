import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["rowId", "height", "style"];
import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useGridRootProps } from '@mui/x-data-grid';
import { useGridPrivateApiContext } from '../hooks/utils/useGridPrivateApiContext';
import { jsx as _jsx } from "react/jsx-runtime";
const DetailPanel = styled(Box, {
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
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const apiRef = useGridPrivateApiContext();
  const ref = React.useRef();
  const rootProps = useGridRootProps();
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
  const style = _extends({}, styleProp, {
    height
  });
  return /*#__PURE__*/_jsx(DetailPanel, _extends({
    ref: ref,
    ownerState: ownerState,
    style: style
  }, other));
}
export { GridDetailPanel };