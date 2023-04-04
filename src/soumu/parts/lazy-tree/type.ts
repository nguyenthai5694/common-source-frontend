export interface TreeNodeData<C = any> {
  id: string;
  label: string;
  isOpen?: boolean;
  customData?: C;
  children: TreeNodeData<C>[];
  [key: string]: any;
}

export type LazyTreeData<C> = TreeNodeData<C>[];
