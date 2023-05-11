import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
var _defaultColumnsStyles;
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { GRID_DATE_COL_DEF, GRID_DATETIME_COL_DEF } from '@mui/x-data-grid-pro';
import { buildWarning, isObject, isSingleSelectColDef } from '@mui/x-data-grid/internals';
var getExcelJs = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var _excelJsModule$defaul;
    var excelJsModule;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return import('exceljs');
        case 2:
          excelJsModule = _context.sent;
          return _context.abrupt("return", (_excelJsModule$defaul = excelJsModule.default) != null ? _excelJsModule$defaul : excelJsModule);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getExcelJs() {
    return _ref.apply(this, arguments);
  };
}();
var warnInvalidFormattedValue = buildWarning(['MUI: When the value of a field is an object or a `renderCell` is provided, the Excel export might not display the value correctly.', 'You can provide a `valueFormatter` with a string representation to be used.']);
var getFormattedValueOptions = function getFormattedValueOptions(colDef, valueOptions, api) {
  if (!colDef.valueOptions) {
    return [];
  }
  var valueOptionsFormatted = valueOptions;
  if (colDef.valueFormatter) {
    valueOptionsFormatted = valueOptionsFormatted.map(function (option) {
      if (_typeof(option) === 'object') {
        return option;
      }
      var params = {
        field: colDef.field,
        api: api,
        value: option
      };
      return String(colDef.valueFormatter(params));
    });
  }
  return valueOptionsFormatted.map(function (option) {
    return _typeof(option) === 'object' ? option.label : option;
  });
};
export var serializeRow = function serializeRow(id, columns, api, defaultValueOptionsFormulae) {
  var row = {};
  var dataValidation = {};
  var mergedCells = [];
  var firstCellParams = api.getCellParams(id, columns[0].field);
  var outlineLevel = firstCellParams.rowNode.depth;

  // `colSpan` is only calculated for rendered rows, so we need to calculate it during export for every row
  api.calculateColSpan({
    rowId: id,
    minFirstColumn: 0,
    maxLastColumn: columns.length,
    columns: columns
  });
  columns.forEach(function (column, colIndex) {
    var colSpanInfo = api.unstable_getCellColSpanInfo(id, colIndex);
    if (colSpanInfo && colSpanInfo.spannedByColSpan) {
      return;
    }
    if (colSpanInfo && colSpanInfo.cellProps.colSpan > 1) {
      mergedCells.push({
        leftIndex: colIndex + 1,
        rightIndex: colIndex + colSpanInfo.cellProps.colSpan
      });
    }
    var cellParams = api.getCellParams(id, column.field);
    switch (cellParams.colDef.type) {
      case 'singleSelect':
        {
          var castColumn = cellParams.colDef;
          if (typeof castColumn.valueOptions === 'function') {
            // If value option depends on the row, set specific options to the cell
            // This dataValidation is buggy with LibreOffice and does not allow to have coma
            var valueOptions = castColumn.valueOptions({
              id: id,
              row: row,
              field: cellParams.field
            });
            var formattedValueOptions = getFormattedValueOptions(castColumn, valueOptions, api);
            dataValidation[castColumn.field] = {
              type: 'list',
              allowBlank: true,
              formulae: ["\"".concat(formattedValueOptions.map(function (x) {
                return x.toString().replaceAll(',', 'CHAR(44)');
              }).join(','), "\"")]
            };
          } else {
            var address = defaultValueOptionsFormulae[column.field].address;

            // If value option is defined for the column, refer to another sheet
            dataValidation[castColumn.field] = {
              type: 'list',
              allowBlank: true,
              formulae: [address]
            };
          }
          var formattedValue = api.getCellParams(id, castColumn.field).formattedValue;
          if (process.env.NODE_ENV !== 'production') {
            if (String(cellParams.formattedValue) === '[object Object]') {
              warnInvalidFormattedValue();
            }
          }
          if (isObject(formattedValue)) {
            row[castColumn.field] = formattedValue == null ? void 0 : formattedValue.label;
          } else {
            row[castColumn.field] = formattedValue;
          }
          break;
        }
      case 'boolean':
      case 'number':
        row[column.field] = api.getCellParams(id, column.field).value;
        break;
      case 'date':
      case 'dateTime':
        {
          // Excel does not do any timezone conversion, so we create a date using UTC instead of local timezone
          // Solution from: https://github.com/exceljs/exceljs/issues/486#issuecomment-432557582
          // About Date.UTC(): https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC#exemples
          var value = api.getCellParams(id, column.field).value;
          // value may be `undefined` in auto-generated grouping rows
          if (!value) {
            break;
          }
          var utcDate = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours(), value.getMinutes(), value.getSeconds()));
          row[column.field] = utcDate;
          break;
        }
      case 'actions':
        break;
      default:
        row[column.field] = api.getCellParams(id, column.field).formattedValue;
        if (process.env.NODE_ENV !== 'production') {
          if (String(cellParams.formattedValue) === '[object Object]') {
            warnInvalidFormattedValue();
          }
        }
        break;
    }
  });
  return {
    row: row,
    dataValidation: dataValidation,
    outlineLevel: outlineLevel,
    mergedCells: mergedCells
  };
};
var defaultColumnsStyles = (_defaultColumnsStyles = {}, _defineProperty(_defaultColumnsStyles, GRID_DATE_COL_DEF.type, {
  numFmt: 'dd.mm.yyyy'
}), _defineProperty(_defaultColumnsStyles, GRID_DATETIME_COL_DEF.type, {
  numFmt: 'dd.mm.yyyy hh:mm'
}), _defaultColumnsStyles);
export var serializeColumn = function serializeColumn(column, columnsStyles) {
  var _column$headerName;
  var field = column.field,
    type = column.type;
  return {
    key: field,
    headerText: (_column$headerName = column.headerName) != null ? _column$headerName : column.field,
    // Excel width must stay between 0 and 255 (https://support.microsoft.com/en-us/office/change-the-column-width-and-row-height-72f5e3cc-994d-43e8-ae58-9774a0905f46)
    // From the example of column width behavior (https://docs.microsoft.com/en-US/office/troubleshoot/excel/determine-column-widths#example-of-column-width-behavior)
    // a value of 10 corresponds to 75px. This is an approximation, because column width depends on the the font-size
    width: Math.min(255, column.width ? column.width / 7.5 : 8.43),
    style: _extends({}, type && (defaultColumnsStyles == null ? void 0 : defaultColumnsStyles[type]), columnsStyles == null ? void 0 : columnsStyles[field])
  };
};
var addColumnGroupingHeaders = function addColumnGroupingHeaders(worksheet, columns, columnGroupPaths, columnGroupDetails) {
  var maxDepth = Math.max.apply(Math, _toConsumableArray(columns.map(function (_ref2) {
    var _columnGroupPaths$key, _columnGroupPaths$key2;
    var key = _ref2.key;
    return (_columnGroupPaths$key = (_columnGroupPaths$key2 = columnGroupPaths[key]) == null ? void 0 : _columnGroupPaths$key2.length) != null ? _columnGroupPaths$key : 0;
  })));
  if (maxDepth === 0) {
    return;
  }
  var _loop = function _loop(rowIndex) {
    var row = columns.map(function (_ref3) {
      var key = _ref3.key;
      var groupingPath = columnGroupPaths[key];
      if (groupingPath.length <= rowIndex) {
        return {
          groupId: null,
          parents: groupingPath
        };
      }
      return _extends({}, columnGroupDetails[groupingPath[rowIndex]], {
        parents: groupingPath.slice(0, rowIndex)
      });
    });
    var newRow = worksheet.addRow(row.map(function (group) {
      var _group$headerName;
      return group.groupId === null ? null : (_group$headerName = group == null ? void 0 : group.headerName) != null ? _group$headerName : group.groupId;
    }));

    // use `rowCount`, since worksheet can have additional rows added in `exceljsPreProcess`
    var lastRowIndex = newRow.worksheet.rowCount;
    var leftIndex = 0;
    var rightIndex = 1;
    var _loop2 = function _loop2() {
      var _row$leftIndex = row[leftIndex],
        leftGroupId = _row$leftIndex.groupId,
        leftParents = _row$leftIndex.parents;
      var _row$rightIndex = row[rightIndex],
        rightGroupId = _row$rightIndex.groupId,
        rightParents = _row$rightIndex.parents;
      var areInSameGroup = leftGroupId === rightGroupId && leftParents.length === rightParents.length && leftParents.every(function (leftParent, index) {
        return rightParents[index] === leftParent;
      });
      if (areInSameGroup) {
        rightIndex += 1;
      } else {
        if (rightIndex - leftIndex > 1) {
          worksheet.mergeCells(lastRowIndex, leftIndex + 1, lastRowIndex, rightIndex);
        }
        leftIndex = rightIndex;
        rightIndex += 1;
      }
    };
    while (rightIndex < columns.length) {
      _loop2();
    }
    if (rightIndex - leftIndex > 1) {
      worksheet.mergeCells(lastRowIndex, leftIndex + 1, lastRowIndex, rightIndex);
    }
  };
  for (var rowIndex = 0; rowIndex < maxDepth; rowIndex += 1) {
    _loop(rowIndex);
  }
};
export function serializeColumns(columns, styles) {
  return columns.map(function (column) {
    return serializeColumn(column, styles);
  });
}
export function getDataForValueOptionsSheet(_x, _x2, _x3) {
  return _getDataForValueOptionsSheet.apply(this, arguments);
}
function _getDataForValueOptionsSheet() {
  _getDataForValueOptionsSheet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(columns, valueOptionsSheetName, api) {
    var candidateColumns, excelJS, workbook, worksheet;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          candidateColumns = columns.filter(function (column) {
            return isSingleSelectColDef(column) && Array.isArray(column.valueOptions);
          }); // Creates a temp worksheet to obtain the column letters
          _context3.next = 3;
          return getExcelJs();
        case 3:
          excelJS = _context3.sent;
          workbook = new excelJS.Workbook();
          worksheet = workbook.addWorksheet('Sheet1');
          worksheet.columns = candidateColumns.map(function (column) {
            return {
              key: column.field
            };
          });
          return _context3.abrupt("return", candidateColumns.reduce(function (acc, column) {
            var _column$headerName2;
            var singleSelectColumn = column;
            var formattedValueOptions = getFormattedValueOptions(singleSelectColumn, singleSelectColumn.valueOptions, api);
            var header = (_column$headerName2 = column.headerName) != null ? _column$headerName2 : column.field;
            var values = [header].concat(_toConsumableArray(formattedValueOptions));
            var letter = worksheet.getColumn(column.field).letter;
            var address = "".concat(valueOptionsSheetName, "!$").concat(letter, "$2:$").concat(letter, "$").concat(values.length);
            acc[column.field] = {
              values: values,
              address: address
            };
            return acc;
          }, {}));
        case 8:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _getDataForValueOptionsSheet.apply(this, arguments);
}
function addSerializedRowToWorksheet(serializedRow, worksheet) {
  var row = serializedRow.row,
    dataValidation = serializedRow.dataValidation,
    outlineLevel = serializedRow.outlineLevel,
    mergedCells = serializedRow.mergedCells;
  var newRow = worksheet.addRow(row);
  Object.keys(dataValidation).forEach(function (field) {
    newRow.getCell(field).dataValidation = _extends({}, dataValidation[field]);
  });
  if (outlineLevel) {
    newRow.outlineLevel = outlineLevel;
  }

  // use `rowCount`, since worksheet can have additional rows added in `exceljsPreProcess`
  var lastRowIndex = newRow.worksheet.rowCount;
  mergedCells.forEach(function (mergedCell) {
    worksheet.mergeCells(lastRowIndex, mergedCell.leftIndex, lastRowIndex, mergedCell.rightIndex);
  });
}
function createValueOptionsSheetIfNeeded(_x4, _x5, _x6) {
  return _createValueOptionsSheetIfNeeded.apply(this, arguments);
}
function _createValueOptionsSheetIfNeeded() {
  _createValueOptionsSheetIfNeeded = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(valueOptionsData, sheetName, workbook) {
    var valueOptionsWorksheet;
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!(Object.keys(valueOptionsData).length === 0)) {
            _context4.next = 2;
            break;
          }
          return _context4.abrupt("return");
        case 2:
          valueOptionsWorksheet = workbook.addWorksheet(sheetName);
          valueOptionsWorksheet.columns = Object.keys(valueOptionsData).map(function (key) {
            return {
              key: key
            };
          });
          Object.entries(valueOptionsData).forEach(function (_ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
              field = _ref6[0],
              values = _ref6[1].values;
            valueOptionsWorksheet.getColumn(field).values = values;
          });
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _createValueOptionsSheetIfNeeded.apply(this, arguments);
}
export function buildExcel(_x7, _x8) {
  return _buildExcel.apply(this, arguments);
}
function _buildExcel() {
  _buildExcel = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(options, api) {
    var columns, rowIds, includeHeaders, includeColumnGroupsHeaders, _options$valueOptions, valueOptionsSheetName, exceljsPreProcess, exceljsPostProcess, _options$columnsStyle, columnsStyles, excelJS, workbook, worksheet, serializedColumns, columnGroupPaths, valueOptionsData;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          columns = options.columns, rowIds = options.rowIds, includeHeaders = options.includeHeaders, includeColumnGroupsHeaders = options.includeColumnGroupsHeaders, _options$valueOptions = options.valueOptionsSheetName, valueOptionsSheetName = _options$valueOptions === void 0 ? 'Options' : _options$valueOptions, exceljsPreProcess = options.exceljsPreProcess, exceljsPostProcess = options.exceljsPostProcess, _options$columnsStyle = options.columnsStyles, columnsStyles = _options$columnsStyle === void 0 ? {} : _options$columnsStyle;
          _context5.next = 3;
          return getExcelJs();
        case 3:
          excelJS = _context5.sent;
          workbook = new excelJS.Workbook();
          worksheet = workbook.addWorksheet('Sheet1');
          serializedColumns = serializeColumns(columns, columnsStyles);
          worksheet.columns = serializedColumns;
          if (!exceljsPreProcess) {
            _context5.next = 11;
            break;
          }
          _context5.next = 11;
          return exceljsPreProcess({
            workbook: workbook,
            worksheet: worksheet
          });
        case 11:
          if (includeColumnGroupsHeaders) {
            columnGroupPaths = columns.reduce(function (acc, column) {
              acc[column.field] = api.unstable_getColumnGroupPath(column.field);
              return acc;
            }, {});
            addColumnGroupingHeaders(worksheet, serializedColumns, columnGroupPaths, api.unstable_getAllGroupDetails());
          }
          if (includeHeaders) {
            worksheet.addRow(columns.map(function (column) {
              var _column$headerName3;
              return (_column$headerName3 = column.headerName) != null ? _column$headerName3 : column.field;
            }));
          }
          _context5.next = 15;
          return getDataForValueOptionsSheet(columns, valueOptionsSheetName, api);
        case 15:
          valueOptionsData = _context5.sent;
          createValueOptionsSheetIfNeeded(valueOptionsData, valueOptionsSheetName, workbook);
          rowIds.forEach(function (id) {
            var serializedRow = serializeRow(id, columns, api, valueOptionsData);
            addSerializedRowToWorksheet(serializedRow, worksheet);
          });
          if (!exceljsPostProcess) {
            _context5.next = 21;
            break;
          }
          _context5.next = 21;
          return exceljsPostProcess({
            workbook: workbook,
            worksheet: worksheet
          });
        case 21:
          return _context5.abrupt("return", workbook);
        case 22:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _buildExcel.apply(this, arguments);
}
export function setupExcelExportWebWorker() {
  var workerOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // eslint-disable-next-line no-restricted-globals
  addEventListener('message', /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(event) {
      var _options$includeHeade;
      var _event$data, serializedColumns, serializedRows, options, valueOptionsSheetName, valueOptionsData, columnGroupDetails, columnGroupPaths, exceljsPostProcess, exceljsPreProcess, excelJS, workbook, worksheet, includeHeaders;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _event$data = event.data, serializedColumns = _event$data.serializedColumns, serializedRows = _event$data.serializedRows, options = _event$data.options, valueOptionsSheetName = _event$data.valueOptionsSheetName, valueOptionsData = _event$data.valueOptionsData, columnGroupDetails = _event$data.columnGroupDetails, columnGroupPaths = _event$data.columnGroupPaths;
            exceljsPostProcess = workerOptions.exceljsPostProcess, exceljsPreProcess = workerOptions.exceljsPreProcess;
            _context2.next = 4;
            return getExcelJs();
          case 4:
            excelJS = _context2.sent;
            workbook = new excelJS.Workbook();
            worksheet = workbook.addWorksheet('Sheet1');
            worksheet.columns = serializedColumns;
            if (!exceljsPreProcess) {
              _context2.next = 11;
              break;
            }
            _context2.next = 11;
            return exceljsPreProcess({
              workbook: workbook,
              worksheet: worksheet
            });
          case 11:
            if (options.includeColumnGroupsHeaders) {
              addColumnGroupingHeaders(worksheet, serializedColumns, columnGroupPaths, columnGroupDetails);
            }
            includeHeaders = (_options$includeHeade = options.includeHeaders) != null ? _options$includeHeade : true;
            if (includeHeaders) {
              worksheet.addRow(serializedColumns.map(function (column) {
                return column.headerText;
              }));
            }
            createValueOptionsSheetIfNeeded(valueOptionsData, valueOptionsSheetName, workbook);
            serializedRows.forEach(function (serializedRow) {
              addSerializedRowToWorksheet(serializedRow, worksheet);
            });
            if (!exceljsPostProcess) {
              _context2.next = 19;
              break;
            }
            _context2.next = 19;
            return exceljsPostProcess({
              workbook: workbook,
              worksheet: worksheet
            });
          case 19:
            _context2.t0 = postMessage;
            _context2.next = 22;
            return workbook.xlsx.writeBuffer();
          case 22:
            _context2.t1 = _context2.sent;
            (0, _context2.t0)(_context2.t1);
          case 24:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x9) {
      return _ref4.apply(this, arguments);
    };
  }());
}