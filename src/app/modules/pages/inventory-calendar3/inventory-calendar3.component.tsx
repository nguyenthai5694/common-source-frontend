import React from 'react';
import { FormikContextType } from 'formik';
import { DataTableQueries } from 'common/blocks/datatable-ui/datatable.type';
import PageComponent from 'common/utils/page/page.component'
import { defaultQueries } from 'app/const/common.const';
import { ModalService } from 'app/services/modal';
import { InventoryCalendarData } from './data-table.config';
import InventoryCalendar3Template from './inventory-calendar3.template';

interface InventoryCalendarState {
  isRunning: boolean,
  queries: DataTableQueries,
  data: InventoryCalendarData[],
  totalItem: number,
}

export default class InventoryCalendar3 extends PageComponent<InventoryCalendarState> {
  state: InventoryCalendarState = {
    isRunning: true,
    queries: {
      ...defaultQueries,
      sort: {
        type: 'asc',
        dataKey: 'id',
      },
    },
    data: [],
    totalItem: 0,
  };

  formRef = React.createRef<FormikContextType<any>>();

  pageTitle = '2023/05 - 1回目 レイアウト一覧';

  breadcrumb = [
    {
      label: '2023/05 - 1回目 レイアウト一覧',
      url: '/inventory-calendar',
    },
  ];

  private modalService = new ModalService();

  componentDidMount() {
    this.onSearch(this.state.queries)
  }

  /**
   * 
   * @param items Event after click checkbox or radio in table
   */
  onSelectItem = (items) => {
    // console.log(items);
  }

  /**
   * 
   * @param action Event after click action in table
   */
  onActionClick = (action) => {
    // console.log(action);
  }

  /**
   * 
   * @param queries Event search of table
   */
  onSearch = (queries: DataTableQueries) => {
    // console.log(queries);

    this.setState({
      ...this.state,
      data: this.hardCodeDate(),
      queries,
      totalItem: 102,
    })
  }

  render() {
    return (
      <InventoryCalendar3Template self={this} />
    )
  }

  hardCodeDate() {
    let res = [
      {
        id: '1.1',
        name: '荷受室（1.牛）',
        imageName: 'Layout 部屋.PNG',
      },
      {
        id: '1.2',
        name: '荷受室（2.豚）',
        imageName: 'Layout 部屋.PNG',
      },
      {
        id: '1.3',
        name: '荷受室（3.鶏）',
        imageName: 'Layout 部屋.PNG',
      },
      {
        id: '2.1',
        name: '原料庫A（1.牛）',
        imageName: 'Layout 部屋.PNG',
      },
      {
        id: '2.2',
        name: '原料庫A（2.豚）',
        imageName: 'Layout 部屋.PNG',
      },
      {
        id: '3.1',
        name: '原料庫Ｂ（1.牛）原料庫Ｂ（1.牛）原料庫Ｂ（1.牛）原料庫Ｂ（1.牛）原料庫Ｂ（1.牛）原料庫Ｂ（1.牛）原料庫Ｂ（1.牛）原料庫Ｂ（1.牛）' +
          '原料庫Ｂ（1.牛）原料庫Ｂ（1.牛）原料庫Ｂ（1.牛）原料庫Ｂ（1.牛）原料庫Ｂ（1.牛）原料庫Ｂ（1.牛）原料庫Ｂ（1.牛）',
        imageName: 'Layout 部屋.PNG',
      },
      {
        id: '3.2',
        name: '原料庫Ｂ（2.豚）',
        imageName: 'Layout 部屋.PNG',
      },
      {
        id: '3.3',
        name: '原料庫Ｂ（3.挽肉）',
        imageName: 'Layout 部屋.PNG',
      },
      {
        id: '3.4',
        name: '原料庫Ｂ（4.通過品）',
        imageName: 'Layout 部屋.PNG',
      },
      {
        id: '3.5',
        name: '原料庫Ｂ（5.MDC）',
        imageName: 'Layout 部屋.PNG',
      },
    ]

    return res;
  }
}
