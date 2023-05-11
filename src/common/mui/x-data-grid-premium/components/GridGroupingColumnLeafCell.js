import * as React from 'react';
import Box from '@mui/material/Box';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
function GridGroupingColumnLeafCell(props) {
  var _props$formattedValue;
  const {
    rowNode
  } = props;
  const rootProps = useGridRootProps();
  const marginLeft = rootProps.rowGroupingColumnMode === 'multiple' ? 1 : rowNode.depth * 2;
  return /*#__PURE__*/_jsx(Box, {
    sx: {
      ml: marginLeft
    },
    children: (_props$formattedValue = props.formattedValue) != null ? _props$formattedValue : props.value
  });
}
export { GridGroupingColumnLeafCell };