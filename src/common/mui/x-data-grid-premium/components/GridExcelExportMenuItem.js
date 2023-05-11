import MenuItem from '@mui/material/MenuItem';
import { jsx as _jsx } from 'react/jsx-runtime';
import _extends from '@babel/runtime/helpers/esm/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import PropTypes from 'prop-types';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';

const _excluded = ['hideMenu', 'options'];

function GridExcelExportMenuItem(props) {
  const apiRef = useGridApiContext();
  const {
    hideMenu,
    options,
  } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);

  return /*#__PURE__*/_jsx(MenuItem, _extends({
    onClick: () => {
      apiRef.current.exportDataAsExcel(options);
      hideMenu == null ? void 0 : hideMenu();
    },
  }, other, {
    children: apiRef.current.getLocaleText('toolbarExportExcel'),
  }));
}
process.env.NODE_ENV !== 'production' ? GridExcelExportMenuItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  hideMenu: PropTypes.func,
  options: PropTypes.shape({
    allColumns: PropTypes.bool,
    columnsStyles: PropTypes.object,
    disableToolbarButton: PropTypes.bool,
    exceljsPostProcess: PropTypes.func,
    exceljsPreProcess: PropTypes.func,
    fields: PropTypes.arrayOf(PropTypes.string),
    fileName: PropTypes.string,
    getRowsToExport: PropTypes.func,
    includeColumnGroupsHeaders: PropTypes.bool,
    includeHeaders: PropTypes.bool,
    valueOptionsSheetName: PropTypes.string,
    worker: PropTypes.func,
  }),
} : void 0;
export { GridExcelExportMenuItem };