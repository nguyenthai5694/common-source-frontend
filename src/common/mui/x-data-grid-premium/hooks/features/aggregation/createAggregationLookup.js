import { gridColumnLookupSelector, gridFilteredRowsLookupSelector, gridRowTreeSelector, GRID_ROOT_GROUP_ID } from 'common/mui/x-data-grid-pro';
import { getAggregationRules } from './gridAggregationUtils';
import { gridAggregationModelSelector } from './gridAggregationSelectors';
const getAggregationCellValue = ({
  apiRef,
  groupId,
  field,
  aggregationFunction,
  aggregationRowsScope
}) => {
  const filteredRowsLookup = gridFilteredRowsLookupSelector(apiRef);
  const rowIds = apiRef.current.getRowGroupChildren({
    groupId
  });
  const values = [];
  rowIds.forEach(rowId => {
    if (aggregationRowsScope === 'filtered' && filteredRowsLookup[rowId] === false) {
      return;
    }

    // If the row is a group, we want to aggregate based on its children
    // For instance in the following tree, we want the aggregated values of A to be based on A.A, A.B.A and A.B.B but not A.B
    // A
    //   A.A
    //   A.B
    //     A.B.A
    //     A.B.B
    const rowNode = apiRef.current.getRowNode(rowId);
    if (rowNode.type === 'group') {
      return;
    }
    if (typeof aggregationFunction.getCellValue === 'function') {
      const row = apiRef.current.getRow(rowId);
      values.push(aggregationFunction.getCellValue({
        row
      }));
    } else {
      values.push(apiRef.current.getCellValue(rowId, field));
    }
  });
  return aggregationFunction.apply({
    values,
    groupId,
    field // Added per user request in https://github.com/mui/mui-x/issues/6995#issuecomment-1327423455
  });
};

const getGroupAggregatedValue = ({
  groupId,
  apiRef,
  aggregationRowsScope,
  aggregatedFields,
  aggregationRules,
  position
}) => {
  const groupAggregationLookup = {};
  for (let j = 0; j < aggregatedFields.length; j += 1) {
    const aggregatedField = aggregatedFields[j];
    const columnAggregationRules = aggregationRules[aggregatedField];
    groupAggregationLookup[aggregatedField] = {
      position,
      value: getAggregationCellValue({
        apiRef,
        groupId,
        field: aggregatedField,
        aggregationFunction: columnAggregationRules.aggregationFunction,
        aggregationRowsScope
      })
    };
  }
  return groupAggregationLookup;
};
export const createAggregationLookup = ({
  apiRef,
  aggregationFunctions,
  aggregationRowsScope,
  getAggregationPosition
}) => {
  const aggregationRules = getAggregationRules({
    columnsLookup: gridColumnLookupSelector(apiRef),
    aggregationModel: gridAggregationModelSelector(apiRef),
    aggregationFunctions
  });
  const aggregatedFields = Object.keys(aggregationRules);
  if (aggregatedFields.length === 0) {
    return {};
  }
  const aggregationLookup = {};
  const rowTree = gridRowTreeSelector(apiRef);
  const createGroupAggregationLookup = groupNode => {
    for (let i = 0; i < groupNode.children.length; i += 1) {
      const childId = groupNode.children[i];
      const childNode = rowTree[childId];
      if (childNode.type === 'group') {
        createGroupAggregationLookup(childNode);
      }
    }
    const hasAggregableChildren = groupNode.children.length;
    if (hasAggregableChildren) {
      const position = getAggregationPosition(groupNode);
      if (position != null) {
        aggregationLookup[groupNode.id] = getGroupAggregatedValue({
          groupId: groupNode.id,
          apiRef,
          aggregatedFields,
          aggregationRowsScope,
          aggregationRules,
          position
        });
      }
    }
  };
  createGroupAggregationLookup(rowTree[GRID_ROOT_GROUP_ID]);
  return aggregationLookup;
};