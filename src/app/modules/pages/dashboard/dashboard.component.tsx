import React from 'react';
import { FormikContextType } from 'formik';
import { DataTableQueries } from 'common/blocks/datatable-ui/datatable.type';
import PageComponent from 'common/utils/page/page.component'
import { defaultQueries } from 'app/const/common.const';
import { ModalService } from 'app/services/modal';
import SettingMenuTemplate from './dashboard.template';
import { DashboardState } from './dashboard.type';

export default class Dashboard extends PageComponent<DashboardState> {
  state: DashboardState = {
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

  pageTitle = 'Dashboard';

  breadcrumb = [

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

    const store = window.localStorage.getItem('listmenu')

    this.setState({
      ...this.state,
      data: store ? JSON.parse(store) : [],
      queries,
      totalItem: 7,
    })
  }

  render() {
    return (
      <SettingMenuTemplate self={this} />
    )
  }
}
