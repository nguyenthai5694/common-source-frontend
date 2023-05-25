/// <reference types="react" />
import { GridExportMenuItemProps } from 'common/mui/x-data-grid-pro';
import { GridExcelExportOptions } from '../hooks/features/export';

export type GridExcelExportMenuItemProps = GridExportMenuItemProps<GridExcelExportOptions>;
declare function GridExcelExportMenuItem(props: GridExcelExportMenuItemProps): JSX.Element;
declare namespace GridExcelExportMenuItem {
    var propTypes: any;
}
export { GridExcelExportMenuItem };
