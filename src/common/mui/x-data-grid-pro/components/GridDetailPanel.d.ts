import * as React from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import { GridRowId } from '@mui/x-data-grid';
interface GridDetailPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * The panel height.
     */
    height: number | 'auto';
    /**
     * The row ID that this panel belongs to.
     */
    rowId: GridRowId;
}
declare function GridDetailPanel(props: GridDetailPanelProps): JSX.Element;
export { GridDetailPanel };
