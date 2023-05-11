"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridLazyLoaderPreProcessors = exports.GRID_SKELETON_ROW_ROOT_ID = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _internals = require("@mui/x-data-grid/internals");
var _xDataGrid = require("@mui/x-data-grid");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const GRID_SKELETON_ROW_ROOT_ID = 'auto-generated-skeleton-row-root';
exports.GRID_SKELETON_ROW_ROOT_ID = GRID_SKELETON_ROW_ROOT_ID;
const getSkeletonRowId = index => `${GRID_SKELETON_ROW_ROOT_ID}-${index}`;
const useGridLazyLoaderPreProcessors = (privateApiRef, props) => {
  const {
    lazyLoading
  } = props.experimentalFeatures ?? {};
  const addSkeletonRows = React.useCallback(groupingParams => {
    const tree = (0, _extends2.default)({}, groupingParams.tree);
    const rootGroup = tree[_xDataGrid.GRID_ROOT_GROUP_ID];
    if (!lazyLoading || props.rowsLoadingMode !== 'server' || !props.rowCount || rootGroup.children.length >= props.rowCount) {
      return groupingParams;
    }
    const rootGroupChildren = [...rootGroup.children];
    for (let i = 0; i < props.rowCount - rootGroup.children.length; i += 1) {
      const skeletonId = getSkeletonRowId(i);
      rootGroupChildren.push(skeletonId);
      const skeletonRowNode = {
        type: 'skeletonRow',
        id: skeletonId,
        parent: _xDataGrid.GRID_ROOT_GROUP_ID,
        depth: 0
      };
      tree[skeletonId] = skeletonRowNode;
    }
    tree[_xDataGrid.GRID_ROOT_GROUP_ID] = (0, _extends2.default)({}, rootGroup, {
      children: rootGroupChildren
    });
    return (0, _extends2.default)({}, groupingParams, {
      tree
    });
  }, [props.rowCount, props.rowsLoadingMode, lazyLoading]);
  (0, _internals.useGridRegisterPipeProcessor)(privateApiRef, 'hydrateRows', addSkeletonRows);
};
exports.useGridLazyLoaderPreProcessors = useGridLazyLoaderPreProcessors;