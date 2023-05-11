import * as React from 'react';
import { UseGridColumnHeadersProps } from '@mui/x-data-grid/internals';
import { GridPinnedColumns } from '../hooks/features/columnPinning';

interface DataGridProColumnHeadersProps extends
    React.HTMLAttributes<HTMLDivElement>, Omit<UseGridColumnHeadersProps, 'innerRef'> {
    innerRef?: React.Ref<HTMLDivElement>;
    pinnedColumns: GridPinnedColumns;
}
declare const GridColumnHeaders:
    React.ForwardRefExoticComponent<DataGridProColumnHeadersProps & React.RefAttributes<HTMLDivElement>>;
export { GridColumnHeaders };