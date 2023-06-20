import React from 'react';
import { FormikContextType } from 'formik';
import { DataTableQueries } from 'common/blocks/datatable-ui/datatable.type';
import PageComponent from 'common/utils/page/page.component'
import { defaultQueries } from 'app/const/common.const';
import { ModalService } from 'app/services/modal';
import { InventoryCalendarData } from './data-table.config';
import InventoryCalendarTemplate from './inventory-calendar.template';

interface InventoryCalendarState {
  isRunning: boolean,
  queries: DataTableQueries,
  data: InventoryCalendarData[],
  totalItem: number,
}

export default class InventoryCalendar extends PageComponent<InventoryCalendarState> {
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

  pageTitle = '棚卸計画管理';

  breadcrumb = [
    {
      label: '棚卸計画管理',
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
    console.log(items);
  }

  /**
   * 
   * @param action Event after click action in table
   */
  onActionClick = (action) => {
    console.log(action);
  }

  /**
   * 
   * @param queries Event search of table
   */
  onSearch = (queries: DataTableQueries) => {
    // console.log(queries);

    this.setState({
      ...this.state,
      data: this.hardCodeDate(this.state.queries.page - 1, this.state.queries.size),
      queries,
      totalItem: 102,
      isRunning: false,
    })
  }

  render() {
    return (
      <InventoryCalendarTemplate self={this} />
    )
  }

  hardCodeDate(pages, size) {
    let res = []

    for (let index = pages * size; index < (pages + 1) * size; index++) {
      res.push({
        id: index,
        colectDate: '2023/05 - 2回目',
        date: '2023/05/10',
        name: 'Dang Tran Minh',
        typeName: Math.random() >= 0.5 ? '棚卸中' : '完了',
      } as InventoryCalendarData)
    }

    return res;
  }
}
