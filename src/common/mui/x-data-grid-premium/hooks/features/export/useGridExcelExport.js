import * as React from 'react';
import { useGridApiMethod, useGridLogger, useGridApiOptionHandler } from '@mui/x-data-grid';
import {
  useGridRegisterPipeProcessor, exportAs,
  getColumnsToExport, defaultGetRowsToExport,
} from '@mui/x-data-grid/internals';
/**
 * @requires useGridColumns (state)
 * @requires useGridFilter (state)
 * @requires useGridSorting (state)
 * @requires useGridSelection (state)
 * @requires useGridParamsApi (method)
 */
import { jsx as _jsx } from 'react/jsx-runtime';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import { GridExcelExportMenuItem } from '../../../components';
import {
  buildExcel, getDataForValueOptionsSheet,
  serializeColumns, serializeRow,
} from './serializer/excelSerializer';

const _excluded = ['worker', 'exceljsPostProcess', 'exceljsPreProcess',
  'columnsStyles', 'includeHeaders', 'getRowsToExport', 'valueOptionsSheetName'];

export const useGridExcelExport = (apiRef, props) => {
  const logger = useGridLogger(apiRef, 'useGridExcelExport');
  const getDataAsExcel = React.useCallback((options = {}) => {
    var _options$getRowsToExp, _options$includeHeade, _options$includeColum;

    logger.debug('Get data as excel');
    const getRowsToExport = (_options$getRowsToExp = options.getRowsToExport) != null ?
      _options$getRowsToExp : defaultGetRowsToExport;
    const exportedRowIds = getRowsToExport({
      apiRef,
    });
    const exportedColumns = getColumnsToExport({
      apiRef,
      options,
    });

    return buildExcel({
      columns: exportedColumns,
      rowIds: exportedRowIds,
      includeHeaders: (_options$includeHeade = options.includeHeaders) != null ? _options$includeHeade : true,
      includeColumnGroupsHeaders: (_options$includeColum = options.includeColumnGroupsHeaders) != null ?
        _options$includeColum : true,
      valueOptionsSheetName: (options == null ? void 0 : options.valueOptionsSheetName) || 'Options',
      columnsStyles: options == null ? void 0 : options.columnsStyles,
      exceljsPreProcess: options == null ? void 0 : options.exceljsPreProcess,
      exceljsPostProcess: options == null ? void 0 : options.exceljsPostProcess,
    }, apiRef.current);
  }, [logger, apiRef]);
  const exportDataAsExcel = React.useCallback(async (options = {}) => {
    const {
      worker: workerFn,
      exceljsPostProcess,
      exceljsPreProcess,
      getRowsToExport = defaultGetRowsToExport,
      valueOptionsSheetName = 'Options',
    } = options,
      cloneableOptions = _objectWithoutPropertiesLoose(options, _excluded);
    const sendExcelToUser = buffer => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      exportAs(blob, 'xlsx', options == null ? void 0 : options.fileName);
    };

    if (!workerFn) {
      apiRef.current.publishEvent('excelExportStateChange', 'pending');
      const workbook = await getDataAsExcel(options);

      if (workbook === null) {
        return;
      }

      const content = await workbook.xlsx.writeBuffer();

      apiRef.current.publishEvent('excelExportStateChange', 'finished');
      sendExcelToUser(content);

      return;
    }

    if (exceljsPostProcess && process.env.NODE_ENV !== 'production') {
      console.warn(['MUI: The exceljsPostProcess option is not supported when a web worker is used.',
        'As alternative, pass the callback to the same option in setupExcelExportWebWorker.'].join('\n'));
    }

    if (exceljsPreProcess && process.env.NODE_ENV !== 'production') {
      console.warn(['MUI: The exceljsPreProcess option is not supported when a web worker is used.',
        'As alternative, pass the callback to the same option in setupExcelExportWebWorker.'].join('\n'));
    }

    const worker = workerFn();

    apiRef.current.publishEvent('excelExportStateChange', 'pending');
    worker.onmessage = async event => {
      sendExcelToUser(event.data);
      apiRef.current.publishEvent('excelExportStateChange', 'finished');
      worker.terminate();
    };
    const exportedRowIds = getRowsToExport({
      apiRef,
    });
    const exportedColumns = getColumnsToExport({
      apiRef,
      options,
    });
    const valueOptionsData = await getDataForValueOptionsSheet(exportedColumns, valueOptionsSheetName, apiRef.current);
    const serializedColumns = serializeColumns(exportedColumns, options.columnsStyles || {});
    const serializedRows = exportedRowIds.map(id =>
      serializeRow(id, exportedColumns, apiRef.current, valueOptionsData),
    );
    const columnGroupPaths = exportedColumns.reduce((acc, column) => {
      acc[column.field] = apiRef.current.unstable_getColumnGroupPath(column.field);

      return acc;
    }, {});
    const message = {
      serializedColumns,
      serializedRows,
      valueOptionsData,
      columnGroupPaths,
      columnGroupDetails: apiRef.current.unstable_getAllGroupDetails(),
      options: cloneableOptions,
      valueOptionsSheetName,
    };

    worker.postMessage(message);
  }, [apiRef, getDataAsExcel]);
  const excelExportApi = {
    getDataAsExcel,
    exportDataAsExcel,
  };

  useGridApiMethod(apiRef, excelExportApi, 'public');

  /**
   * PRE-PROCESSING
   */
  const addExportMenuButtons = React.useCallback((initialValue, options) => {
    var _options$excelOptions;

    if ((_options$excelOptions = options.excelOptions) != null && _options$excelOptions.disableToolbarButton) {
      return initialValue;
    }

    return [...initialValue, {
      component: /*#__PURE__*/_jsx(GridExcelExportMenuItem, {
        options: options.excelOptions,
      }),
      componentName: 'excelExport',
    }];
  }, []);

  useGridRegisterPipeProcessor(apiRef, 'exportMenu', addExportMenuButtons);
  useGridApiOptionHandler(apiRef, 'excelExportStateChange', props.onExcelExportStateChange);
};