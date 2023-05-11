"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridDetailPanel = exports.detailPanelStateInitializer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _xDataGrid = require("@mui/x-data-grid");
var _internals = require("@mui/x-data-grid/internals");
var _gridDetailPanelToggleColDef = require("./gridDetailPanelToggleColDef");
var _gridDetailPanelSelector = require("./gridDetailPanelSelector");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const detailPanelStateInitializer = (state, props) => {
  return (0, _extends2.default)({}, state, {
    detailPanel: {
      heightCache: {},
      expandedRowIds: props.detailPanelExpandedRowIds ?? props.initialState?.detailPanel?.expandedRowIds ?? []
    }
  });
};
exports.detailPanelStateInitializer = detailPanelStateInitializer;
function cacheContentAndHeight(apiRef, getDetailPanelContent, getDetailPanelHeight, previousHeightCache) {
  if (typeof getDetailPanelContent !== 'function') {
    return {};
  }

  // TODO change to lazy approach using a Proxy
  // only call getDetailPanelContent when asked for an id
  const rowIds = (0, _xDataGrid.gridDataRowIdsSelector)(apiRef);
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
      height: autoHeight ? previousHeightCache[id]?.height : height
    };
    return acc;
  }, {});
  return {
    contentCache,
    heightCache
  };
}
const useGridDetailPanel = (apiRef, props) => {
  const expandedRowIds = (0, _xDataGrid.useGridSelector)(apiRef, _gridDetailPanelSelector.gridDetailPanelExpandedRowIdsSelector);
  const contentCache = (0, _xDataGrid.useGridSelector)(apiRef, _gridDetailPanelSelector.gridDetailPanelExpandedRowsContentCacheSelector);
  const handleCellClick = React.useCallback((params, event) => {
    if (params.field !== _gridDetailPanelToggleColDef.GRID_DETAIL_PANEL_TOGGLE_FIELD || props.getDetailPanelContent == null) {
      return;
    }
    const content = contentCache[params.id];
    if (! /*#__PURE__*/React.isValidElement(content)) {
      return;
    }

    // Ignore if the user didn't click specifically in the "i" button
    if (event.target === event.currentTarget) {
      return;
    }
    apiRef.current.toggleDetailPanel(params.id);
  }, [apiRef, contentCache, props.getDetailPanelContent]);
  const handleCellKeyDown = React.useCallback((params, event) => {
    if (props.getDetailPanelContent == null) {
      return;
    }
    if (params.field === _gridDetailPanelToggleColDef.GRID_DETAIL_PANEL_TOGGLE_FIELD && event.key === ' ') {
      apiRef.current.toggleDetailPanel(params.id);
    }
  }, [apiRef, props.getDetailPanelContent]);
  (0, _xDataGrid.useGridApiEventHandler)(apiRef, 'cellClick', handleCellClick);
  (0, _xDataGrid.useGridApiEventHandler)(apiRef, 'cellKeyDown', handleCellKeyDown);
  apiRef.current.registerControlState({
    stateId: 'detailPanels',
    propModel: props.detailPanelExpandedRowIds,
    propOnChange: props.onDetailPanelExpandedRowIdsChange,
    stateSelector: _gridDetailPanelSelector.gridDetailPanelExpandedRowIdsSelector,
    changeEvent: 'detailPanelsExpandedRowIdsChange'
  });
  const toggleDetailPanel = React.useCallback(id => {
    if (props.getDetailPanelContent == null) {
      return;
    }
    const content = contentCache[id];
    if (! /*#__PURE__*/React.isValidElement(content)) {
      return;
    }
    const ids = apiRef.current.getExpandedDetailPanels();
    apiRef.current.setExpandedDetailPanels(ids.includes(id) ? ids.filter(rowId => rowId !== id) : [...ids, id]);
  }, [apiRef, contentCache, props.getDetailPanelContent]);
  const getExpandedDetailPanels = React.useCallback(() => (0, _gridDetailPanelSelector.gridDetailPanelExpandedRowIdsSelector)(apiRef.current.state), [apiRef]);
  const setExpandedDetailPanels = React.useCallback(ids => {
    apiRef.current.setState(state => {
      return (0, _extends2.default)({}, state, {
        detailPanel: (0, _extends2.default)({}, state.detailPanel, {
          expandedRowIds: ids
        })
      });
    });
    apiRef.current.forceUpdate();
  }, [apiRef]);
  const storeDetailPanelHeight = React.useCallback((id, height) => {
    const heightCache = (0, _gridDetailPanelSelector.gridDetailPanelRawHeightCacheSelector)(apiRef.current.state);
    if (!heightCache[id] || heightCache[id].height === height) {
      return;
    }
    apiRef.current.setState(state => {
      return (0, _extends2.default)({}, state, {
        detailPanel: (0, _extends2.default)({}, state.detailPanel, {
          heightCache: (0, _extends2.default)({}, heightCache, {
            [id]: (0, _extends2.default)({}, heightCache[id], {
              height
            })
          })
        })
      });
    });
    apiRef.current.requestPipeProcessorsApplication('rowHeight');
  }, [apiRef]);
  const detailPanelHasAutoHeight = React.useCallback(id => {
    const heightCache = (0, _gridDetailPanelSelector.gridDetailPanelRawHeightCacheSelector)(apiRef.current.state);
    return heightCache[id] ? heightCache[id].autoHeight : false;
  }, [apiRef]);
  const detailPanelPubicApi = {
    toggleDetailPanel,
    getExpandedDetailPanels,
    setExpandedDetailPanels
  };
  const detailPanelPrivateApi = {
    storeDetailPanelHeight,
    detailPanelHasAutoHeight
  };
  (0, _xDataGrid.useGridApiMethod)(apiRef, detailPanelPubicApi, 'public');
  (0, _xDataGrid.useGridApiMethod)(apiRef, detailPanelPrivateApi, 'private');
  React.useEffect(() => {
    if (props.detailPanelExpandedRowIds) {
      const currentModel = (0, _gridDetailPanelSelector.gridDetailPanelExpandedRowIdsSelector)(apiRef.current.state);
      if (currentModel !== props.detailPanelExpandedRowIds) {
        apiRef.current.setExpandedDetailPanels(props.detailPanelExpandedRowIds);
      }
    }
  }, [apiRef, props.detailPanelExpandedRowIds]);
  const updateCachesAndForceUpdate = React.useCallback(() => {
    apiRef.current.setState(state => {
      return (0, _extends2.default)({}, state, {
        detailPanel: (0, _extends2.default)({}, state.detailPanel, cacheContentAndHeight(apiRef, props.getDetailPanelContent, props.getDetailPanelHeight, state.detailPanel.heightCache))
      });
    });
    apiRef.current.forceUpdate();
  }, [apiRef, props.getDetailPanelContent, props.getDetailPanelHeight]);
  (0, _xDataGrid.useGridApiEventHandler)(apiRef, 'sortedRowsSet', updateCachesAndForceUpdate);
  const previousGetDetailPanelContentProp = React.useRef();
  const previousGetDetailPanelHeightProp = React.useRef();
  const updateCachesIfNeeded = React.useCallback(() => {
    if (props.getDetailPanelContent === previousGetDetailPanelContentProp.current && props.getDetailPanelHeight === previousGetDetailPanelHeightProp.current) {
      return;
    }
    apiRef.current.setState(state => {
      return (0, _extends2.default)({}, state, {
        detailPanel: (0, _extends2.default)({}, state.detailPanel, cacheContentAndHeight(apiRef, props.getDetailPanelContent, props.getDetailPanelHeight, state.detailPanel.heightCache))
      });
    });
    previousGetDetailPanelContentProp.current = props.getDetailPanelContent;
    previousGetDetailPanelHeightProp.current = props.getDetailPanelHeight;
  }, [apiRef, props.getDetailPanelContent, props.getDetailPanelHeight]);
  const addDetailHeight = React.useCallback((initialValue, row) => {
    if (!expandedRowIds || expandedRowIds.length === 0 || !expandedRowIds.includes(row.id)) {
      return (0, _extends2.default)({}, initialValue, {
        detail: 0
      });
    }
    updateCachesIfNeeded();
    const heightCache = (0, _gridDetailPanelSelector.gridDetailPanelExpandedRowsHeightCacheSelector)(apiRef);
    return (0, _extends2.default)({}, initialValue, {
      detail: heightCache[row.id] ?? 0 // Fallback to zero because the cache might not be ready yet (e.g. page was changed)
    });
  }, [apiRef, expandedRowIds, updateCachesIfNeeded]);
  (0, _internals.useGridRegisterPipeProcessor)(apiRef, 'rowHeight', addDetailHeight);
  const isFirstRender = React.useRef(true);
  if (isFirstRender.current) {
    isFirstRender.current = false;
    updateCachesIfNeeded();
  }
};
exports.useGridDetailPanel = useGridDetailPanel;