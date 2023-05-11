import * as React from 'react';
import { GridBaseColDef } from '@mui/x-data-grid-pro/internals';
import { GridApiPremium } from '../../../models/gridApiPremium';
import { GridAggregationRule } from './gridAggregationInterfaces';

declare const AGGREGATION_WRAPPABLE_PROPERTIES:
    readonly ["valueGetter", "valueFormatter", "renderCell", "renderHeader", "filterOperators"];
type WrappableColumnProperty = (typeof AGGREGATION_WRAPPABLE_PROPERTIES)[number];
interface GridColDefWithAggregationWrappers extends GridBaseColDef {
    aggregationWrappedProperties?: {
        [P in WrappableColumnProperty]?: {
            original: GridBaseColDef[P];
            wrapped: GridBaseColDef[P];
        };
    };
}
/**
 * Add a wrapper around each wrappable property of the column to customize the behavior of the aggregation cells.
 */
export declare const wrapColumnWithAggregationValue: ({ column, apiRef, aggregationRule, }: {
    column: GridBaseColDef;
    apiRef: React.MutableRefObject<GridApiPremium>;
    aggregationRule: GridAggregationRule;
}) => GridBaseColDef;
/**
 * Remove the aggregation wrappers around the wrappable properties of the column.
 */
export declare const unwrapColumnFromAggregation: ({ column, }: {
    column: GridColDefWithAggregationWrappers;
}) => GridBaseColDef<import("@mui/x-data-grid-pro").GridValidRowModel, any, any>;
export { };