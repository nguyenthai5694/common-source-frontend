import { DataTableQueries } from 'common/blocks/datatable-ui/datatable.type';

export interface SettingMenuData {
  id: number
  name: string;
  path: number;
  icon: number;
}

export interface DashboardState {
  isRunning: boolean,
  queries: DataTableQueries,
  data: SettingMenuData[],
  totalItem: number,
}