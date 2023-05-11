import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { GridFooterCell } from './GridFooterCell';
import { jsx as _jsx } from "react/jsx-runtime";
function GridGroupingColumnFooterCell(props) {
  var rowNode = props.rowNode;
  var rootProps = useGridRootProps();
  var marginLeft;
  if (rowNode.parent == null) {
    marginLeft = 0;
  } else if (rootProps.rowGroupingColumnMode === 'multiple') {
    marginLeft = 2;
  } else {
    marginLeft = rowNode.depth * 2;
  }
  return /*#__PURE__*/_jsx(GridFooterCell, _extends({
    sx: {
      ml: marginLeft
    }
  }, props));
}
export { GridGroupingColumnFooterCell };