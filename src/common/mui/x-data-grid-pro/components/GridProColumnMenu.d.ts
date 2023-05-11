import * as React from 'react';
import { GridColumnMenuProps } from '@mui/x-data-grid';
import { GridColumnMenuPinningItem } from './GridColumnMenuPinningItem';

export declare const GRID_COLUMN_MENU_SLOTS_PRO: {
    columnMenuPinningItem: typeof GridColumnMenuPinningItem;
    columnMenuSortItem: typeof
    import('@mui/x-data-grid/components/menu/columnMenu/menuItems/GridColumnMenuSortItem').GridColumnMenuSortItem;
    columnMenuFilterItem: typeof
    import('@mui/x-data-grid/components/menu/columnMenu/menuItems/GridColumnMenuFilterItem').GridColumnMenuFilterItem;
    columnMenuColumnsItem: typeof
    import('@mui/x-data-grid/components/menu/columnMenu/menuItems/GridColumnMenuColumnsItem').GridColumnMenuColumnsItem;
};
export declare const GRID_COLUMN_MENU_SLOT_PROPS_PRO: {
    columnMenuPinningItem: {
        displayOrder: number;
    };
    columnMenuSortItem: {
        displayOrder: number;
    };
    columnMenuFilterItem: {
        displayOrder: number;
    };
    columnMenuColumnsItem: {
        displayOrder: number;
    };
};
declare const GridProColumnMenu:
    React.ForwardRefExoticComponent<GridColumnMenuProps & React.RefAttributes<HTMLUListElement>>;
export { GridProColumnMenu };
