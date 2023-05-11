import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridSelector, useGridApiEventHandler, useGridApiMethod, gridDataRowIdsSelector } from '@mui/x-data-grid';
import { useGridRegisterPipeProcessor } from '@mui/x-data-grid/internals';
import { GRID_DETAIL_PANEL_TOGGLE_FIELD } from './gridDetailPanelToggleColDef';
import { gridDetailPanelExpandedRowIdsSelector, gridDetailPanelExpandedRowsContentCacheSelector, gridDetailPanelExpandedRowsHeightCacheSelector, gridDetailPanelRawHeightCacheSelector } from './gridDetailPanelSelector';
export var detailPanelStateInitializer = function detailPanelStateInitializer(state, props) {
  var _ref, _props$detailPanelExp, _props$initialState, _props$initialState$d;
  return _extends({}, state, {
    detailPanel: {
      heightCache: {},
      expandedRowIds: (_ref = (_props$detailPanelExp = props.detailPanelExpandedRowIds) != null ? _props$detailPanelExp : (_props$initialState = props.initialState) == null ? void 0 : (_props$initialState$d = _props$initialState.detailPanel) == null ? void 0 : _props$initialState$d.expandedRowIds) != null ? _ref : []
    }
  });
};
function cacheContentAndHeight(apiRef, getDetailPanelContent, getDetailPanelHeight, previousHeightCache) {
  if (typeof getDetailPanelContent !== 'function') {
    return {};
  }

  // TODO change to lazy approach using a Proxy
  // only call getDetailPanelContent when asked for an id
  var rowIds = gridDataRowIdsSelector(apiRef);
  var contentCache = rowIds.reduce(function (acc, id) {
    var params = apiRef.current.getRowParams(id);
    acc[id] = getDetailPanelContent(params);
    return acc;
  }, {});
  var heightCache = rowIds.reduce(function (acc, id) {
    var _previousHeightCache$;
    if (contentCache[id] == null) {
      return acc;
    }
    var params = apiRef.current.getRowParams(id);
    var height = getDetailPanelHeight(params);
    var autoHeight = height === 'auto';
    acc[id] = {
      autoHeight: autoHeight,
      height: autoHeight ? (_previousHeightCache$ = previousHeightCache[id]) == null ? void 0 : _previousHeightCache$.height : height
    };
    return acc;
  }, {});
  return {
    contentCache: contentCache,
    heightCache: heightCache
  };
}
export var useGridDetailPanel = function useGridDetailPanel(apiRef, props) {
  var expandedRowIds = useGridSelector(apiRef, gridDetailPanelExpandedRowIdsSelector);
  var contentCache = useGridSelector(apiRef, gridDetailPanelExpandedRowsContentCacheSelector);
  var handleCellClick = React.useCallback(function (params, event) {
    if (params.field !== GRID_DETAIL_PANEL_TOGGLE_FIELD || props.getDetailPanelContent == null) {
      return;
    }
    var content = contentCache[params.id];
    if (! /*#__PURE__*/React.isValidElement(content)) {
      return;
    }

    // Ignore if the user didn't click specifically in the "i" button
    if (event.target === event.currentTarget) {
      return;
    }
    apiRef.current.toggleDetailPanel(params.id);
  }, [apiRef, contentCache, props.getDetailPanelContent]);
  var handleCellKeyDown = React.useCallback(function (params, event) {
    if (props.getDetailPanelContent == null) {
      return;
    }
    if (params.field === GRID_DETAIL_PANEL_TOGGLE_FIELD && event.key === ' ') {
      apiRef.current.toggleDetailPanel(params.id);
    }
  }, [apiRef, props.getDetailPanelContent]);
  useGridApiEventHandler(apiRef, 'cellClick', handleCellClick);
  useGridApiEventHandler(apiRef, 'cellKeyDown', handleCellKeyDown);
  apiRef.current.registerControlState({
    stateId: 'detailPanels',
    propModel: props.detailPanelExpandedRowIds,
    propOnChange: props.onDetailPanelExpandedRowIdsChange,
    stateSelector: gridDetailPanelExpandedRowIdsSelector,
    changeEvent: 'detailPanelsExpandedRowIdsChange'
  });
  var toggleDetailPanel = React.useCallback(function (id) {
    if (props.getDetailPanelContent == null) {
      return;
    }
    var content = contentCache[id];
    if (! /*#__PURE__*/React.isValidElement(content)) {
      return;
    }
    var ids = apiRef.current.getExpandedDetailPanels();
    apiRef.current.setExpandedDetailPanels(ids.includes(id) ? ids.filter(function (rowId) {
      return rowId !== id;
    }) : [].concat(_toConsumableArray(ids), [id]));
  }, [apiRef, contentCache, props.getDetailPanelContent]);
  var getExpandedDetailPanels = React.useCallback(function () {
    return gridDetailPanelExpandedRowIdsSelector(apiRef.current.state);
  }, [apiRef]);
  var setExpandedDetailPanels = React.useCallback(function (ids) {
    apiRef.current.setState(function (state) {
      return _extends({}, state, {
        detailPanel: _extends({}, state.detailPanel, {
          expandedRowIds: ids
        })
      });
    });
    apiRef.current.forceUpdate();
  }, [apiRef]);
  var storeDetailPanelHeight = React.useCallback(function (id, height) {
    var heightCache = gridDetailPanelRawHeightCacheSelector(apiRef.current.state);
    if (!heightCache[id] || heightCache[id].height === height) {
      return;
    }
    apiRef.current.setState(function (state) {
      return _extends({}, state, {
        detailPanel: _extends({}, state.detailPanel, {
          heightCache: _extends({}, heightCache, _defineProperty({}, id, _extends({}, heightCache[id], {
            height: height
          })))
        })
      });
    });
    apiRef.current.requestPipeProcessorsApplication('rowHeight');
  }, [apiRef]);
  var detailPanelHasAutoHeight = React.useCallback(function (id) {
    var heightCache = gridDetailPanelRawHeightCacheSelector(apiRef.current.state);
    return heightCache[id] ? heightCache[id].autoHeight : false;
  }, [apiRef]);
  var detailPanelPubicApi = {
    toggleDetailPanel: toggleDetailPanel,
    getExpandedDetailPanels: getExpandedDetailPanels,
    setExpandedDetailPanels: setExpandedDetailPanels
  };
  var detailPanelPrivateApi = {
    storeDetailPanelHeight: storeDetailPanelHeight,
    detailPanelHasAutoHeight: detailPanelHasAutoHeight
  };
  useGridApiMethod(apiRef, detailPanelPubicApi, 'public');
  useGridApiMethod(apiRef, detailPanelPrivateApi, 'private');
  React.useEffect(function () {
    if (props.detailPanelExpandedRowIds) {
      var currentModel = gridDetailPanelExpandedRowIdsSelector(apiRef.current.state);
      if (currentModel !== props.detailPanelExpandedRowIds) {
        apiRef.current.setExpandedDetailPanels(props.detailPanelExpandedRowIds);
      }
    }
  }, [apiRef, props.detailPanelExpandedRowIds]);
  var updateCachesAndForceUpdate = React.useCallback(function () {
    apiRef.current.setState(function (state) {
      return _extends({}, state, {
        detailPanel: _extends({}, state.detailPanel, cacheContentAndHeight(apiRef, props.getDetailPanelContent, props.getDetailPanelHeight, state.detailPanel.heightCache))
      });
    });
    apiRef.current.forceUpdate();
  }, [apiRef, props.getDetailPanelContent, props.getDetailPanelHeight]);
  useGridApiEventHandler(apiRef, 'sortedRowsSet', updateCachesAndForceUpdate);
  var previousGetDetailPanelContentProp = React.useRef();
  var previousGetDetailPanelHeightProp = React.useRef();
  var updateCachesIfNeeded = React.useCallback(function () {
    if (props.getDetailPanelContent === previousGetDetailPanelContentProp.current && props.getDetailPanelHeight === previousGetDetailPanelHeightProp.current) {
      return;
    }
    apiRef.current.setState(function (state) {
      return _extends({}, state, {
        detailPanel: _extends({}, state.detailPanel, cacheContentAndHeight(apiRef, props.getDetailPanelContent, props.getDetailPanelHeight, state.detailPanel.heightCache))
      });
    });
    previousGetDetailPanelContentProp.current = props.getDetailPanelContent;
    previousGetDetailPanelHeightProp.current = props.getDetailPanelHeight;
  }, [apiRef, props.getDetailPanelContent, props.getDetailPanelHeight]);
  var addDetailHeight = React.useCallback(function (initialValue, row) {
    var _heightCache$row$id;
    if (!expandedRowIds || expandedRowIds.length === 0 || !expandedRowIds.includes(row.id)) {
      return _extends({}, initialValue, {
        detail: 0
      });
    }
    updateCachesIfNeeded();
    var heightCache = gridDetailPanelExpandedRowsHeightCacheSelector(apiRef);
    return _extends({}, initialValue, {
      detail: (_heightCache$row$id = heightCache[row.id]) != null ? _heightCache$row$id : 0 // Fallback to zero because the cache might not be ready yet (e.g. page was changed)
    });
  }, [apiRef, expandedRowIds, updateCachesIfNeeded]);
  useGridRegisterPipeProcessor(apiRef, 'rowHeight', addDetailHeight);
  var isFirstRender = React.useRef(true);
  if (isFirstRender.current) {
    isFirstRender.current = false;
    updateCachesIfNeeded();
  }
};