import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridApiEventHandler, gridDataRowIdsSelector } from '@mui/x-data-grid';
function cacheContentAndHeight(apiRef, getDetailPanelContent, getDetailPanelHeight, previousHeightCache) {
  if (typeof getDetailPanelContent !== 'function') {
    return {};
  }

  // TODO change to lazy approach using a Proxy
  // only call getDetailPanelContent when asked for an id
  const rowIds = gridDataRowIdsSelector(apiRef);
  const contentCache = rowIds.reduce((acc, id) => {
    const params = apiRef.current.getRowParams(id);
    acc[id] = getDetailPanelContent(params);
    return acc;
  }, {});
  const heightCache = rowIds.reduce((acc, id) => {
    if (contentCache[id] == null) {
      return acc;
    }
    const params = apiRef.current.getRowParams(id);
    const height = getDetailPanelHeight(params);
    const autoHeight = height === 'auto';
    acc[id] = {
      autoHeight,
      height: !autoHeight ? height : previousHeightCache[id]?.height
    };
    return acc;
  }, {});
  return {
    contentCache,
    heightCache
  };
}
export const useGridDetailPanelCache = (apiRef, props) => {
  const updateCaches = React.useCallback(() => {
    apiRef.current.setState(state => {
      return _extends({}, state, {
        detailPanel: _extends({}, state.detailPanel, cacheContentAndHeight(apiRef, props.getDetailPanelContent, props.getDetailPanelHeight, state.detailPanel.heightCache))
      });
    });
    apiRef.current.forceUpdate();
  }, [apiRef, props.getDetailPanelContent, props.getDetailPanelHeight]);
  useGridApiEventHandler(apiRef, 'sortedRowsSet', updateCaches);
  const isFirstRender = React.useRef(true);
  if (isFirstRender.current) {
    isFirstRender.current = false;
    updateCaches();
  }
  React.useEffect(() => {
    if (isFirstRender.current) {
      return;
    }
    updateCaches();
  }, [updateCaches]);
};