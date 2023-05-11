import * as React from 'react';
import { useGridApiEventHandler, useGridSelector, gridSortModelSelector, gridFilterModelSelector, useGridApiOptionHandler } from '@mui/x-data-grid';
import { useGridVisibleRows, getRenderableIndexes } from '@mui/x-data-grid/internals';
function findSkeletonRowsSection({
  apiRef,
  visibleRows,
  range
}) {
  let {
    firstRowIndex,
    lastRowIndex
  } = range;
  const visibleRowsSection = visibleRows.slice(range.firstRowIndex, range.lastRowIndex);
  let startIndex = 0;
  let endIndex = visibleRowsSection.length - 1;
  let isSkeletonSectionFound = false;
  while (!isSkeletonSectionFound && firstRowIndex < lastRowIndex) {
    const isStartingWithASkeletonRow = apiRef.current.getRowNode(visibleRowsSection[startIndex].id).type === 'skeletonRow';
    const isEndingWithASkeletonRow = apiRef.current.getRowNode(visibleRowsSection[endIndex].id).type === 'skeletonRow';
    if (isStartingWithASkeletonRow && isEndingWithASkeletonRow) {
      isSkeletonSectionFound = true;
    }
    if (!isStartingWithASkeletonRow) {
      startIndex += 1;
      firstRowIndex += 1;
    }
    if (!isEndingWithASkeletonRow) {
      endIndex -= 1;
      lastRowIndex -= 1;
    }
  }
  return isSkeletonSectionFound ? {
    firstRowIndex,
    lastRowIndex
  } : undefined;
}
function isLazyLoadingDisabled({
  lazyLoadingFeatureFlag,
  rowsLoadingMode,
  gridDimensions
}) {
  if (!lazyLoadingFeatureFlag || !gridDimensions) {
    return true;
  }
  if (rowsLoadingMode !== 'server') {
    return true;
  }
  return false;
}

/**
 * @requires useGridRows (state)
 * @requires useGridPagination (state)
 * @requires useGridDimensions (method) - can be after
 * @requires useGridScroll (method
 */
export const useGridLazyLoader = (privateApiRef, props) => {
  const visibleRows = useGridVisibleRows(privateApiRef, props);
  const sortModel = useGridSelector(privateApiRef, gridSortModelSelector);
  const filterModel = useGridSelector(privateApiRef, gridFilterModelSelector);
  const renderedRowsIntervalCache = React.useRef({
    firstRowToRender: 0,
    lastRowToRender: 0
  });
  const {
    lazyLoading
  } = props.experimentalFeatures ?? {};
  const getCurrentIntervalToRender = React.useCallback(() => {
    const currentRenderContext = privateApiRef.current.getRenderContext();
    const [firstRowToRender, lastRowToRender] = getRenderableIndexes({
      firstIndex: currentRenderContext.firstRowIndex,
      lastIndex: currentRenderContext.lastRowIndex,
      minFirstIndex: 0,
      maxLastIndex: visibleRows.rows.length,
      buffer: props.rowBuffer
    });
    return {
      firstRowToRender,
      lastRowToRender
    };
  }, [privateApiRef, props.rowBuffer, visibleRows.rows.length]);
  const handleRenderedRowsIntervalChange = React.useCallback(params => {
    const dimensions = privateApiRef.current.getRootDimensions();
    if (isLazyLoadingDisabled({
      lazyLoadingFeatureFlag: lazyLoading,
      rowsLoadingMode: props.rowsLoadingMode,
      gridDimensions: dimensions
    })) {
      return;
    }
    const fetchRowsParams = {
      firstRowToRender: params.firstRowToRender,
      lastRowToRender: params.lastRowToRender,
      sortModel,
      filterModel
    };
    if (renderedRowsIntervalCache.current.firstRowToRender === params.firstRowToRender && renderedRowsIntervalCache.current.lastRowToRender === params.lastRowToRender) {
      return;
    }
    if (sortModel.length === 0 && filterModel.items.length === 0) {
      const skeletonRowsSection = findSkeletonRowsSection({
        apiRef: privateApiRef,
        visibleRows: visibleRows.rows,
        range: {
          firstRowIndex: params.firstRowToRender,
          lastRowIndex: params.lastRowToRender
        }
      });
      if (!skeletonRowsSection) {
        return;
      }
      fetchRowsParams.firstRowToRender = skeletonRowsSection.firstRowIndex;
      fetchRowsParams.lastRowToRender = skeletonRowsSection.lastRowIndex;
    }
    renderedRowsIntervalCache.current = params;
    privateApiRef.current.publishEvent('fetchRows', fetchRowsParams);
  }, [privateApiRef, props.rowsLoadingMode, sortModel, filterModel, visibleRows.rows, lazyLoading]);
  const handleGridSortModelChange = React.useCallback(newSortModel => {
    const dimensions = privateApiRef.current.getRootDimensions();
    if (isLazyLoadingDisabled({
      lazyLoadingFeatureFlag: lazyLoading,
      rowsLoadingMode: props.rowsLoadingMode,
      gridDimensions: dimensions
    })) {
      return;
    }
    privateApiRef.current.requestPipeProcessorsApplication('hydrateRows');
    const {
      firstRowToRender,
      lastRowToRender
    } = getCurrentIntervalToRender();
    const fetchRowsParams = {
      firstRowToRender,
      lastRowToRender,
      sortModel: newSortModel,
      filterModel
    };
    privateApiRef.current.publishEvent('fetchRows', fetchRowsParams);
  }, [privateApiRef, props.rowsLoadingMode, filterModel, lazyLoading, getCurrentIntervalToRender]);
  const handleGridFilterModelChange = React.useCallback(newFilterModel => {
    const dimensions = privateApiRef.current.getRootDimensions();
    if (isLazyLoadingDisabled({
      lazyLoadingFeatureFlag: lazyLoading,
      rowsLoadingMode: props.rowsLoadingMode,
      gridDimensions: dimensions
    })) {
      return;
    }
    privateApiRef.current.requestPipeProcessorsApplication('hydrateRows');
    const {
      firstRowToRender,
      lastRowToRender
    } = getCurrentIntervalToRender();
    const fetchRowsParams = {
      firstRowToRender,
      lastRowToRender,
      sortModel,
      filterModel: newFilterModel
    };
    privateApiRef.current.publishEvent('fetchRows', fetchRowsParams);
  }, [privateApiRef, props.rowsLoadingMode, sortModel, lazyLoading, getCurrentIntervalToRender]);
  useGridApiEventHandler(privateApiRef, 'renderedRowsIntervalChange', handleRenderedRowsIntervalChange);
  useGridApiEventHandler(privateApiRef, 'sortModelChange', handleGridSortModelChange);
  useGridApiEventHandler(privateApiRef, 'filterModelChange', handleGridFilterModelChange);
  useGridApiOptionHandler(privateApiRef, 'fetchRows', props.onFetchRows);
};