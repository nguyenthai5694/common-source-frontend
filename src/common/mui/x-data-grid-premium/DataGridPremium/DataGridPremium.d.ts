import * as React from 'react';
import { GridValidRowModel } from '@mui/x-data-grid-pro';
import { DataGridPremiumProps } from '../models/dataGridPremiumProps';

interface DataGridPremiumComponent {
    <R extends GridValidRowModel = any>(props: DataGridPremiumProps<R>
        & React.RefAttributes<HTMLDivElement>): JSX.Element;
    propTypes?: any;
}
export declare const DataGridPremium: DataGridPremiumComponent;
export { };