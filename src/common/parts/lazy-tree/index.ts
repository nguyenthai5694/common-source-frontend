import { LazyTreeData as LazyTreeDataAlias, TreeNodeData as TreeNodeDataAlias } from './type';

export { LazyTree } from './lazy-tree.component';
export { getNodeInfo, activeNodeByPath } from './lazy-tree.helper';

export type LazyTreeData<C = any> = LazyTreeDataAlias<C>;
export type TreeNodeData<C = any> = TreeNodeDataAlias<C>;