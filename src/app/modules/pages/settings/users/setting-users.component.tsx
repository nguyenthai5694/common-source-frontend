import React from 'react';
import { FormikContextType } from 'formik';
import { DataTableQueries } from 'common/blocks/datatable/datatable.type';
import PageComponent from 'common/utils/page/page.component'
import { defaultQueries } from 'app/const/common.const';
import { ModalService } from 'app/services/modal';
import { SettingMenuData } from './data-table.config';
import SettingUsersTemplate from './setting-users.template';

interface UsersState {
  isRunning: boolean,
  queries: DataTableQueries,
  data: SettingMenuData[],
  totalItem: number,
}

export default class SettingUsers extends PageComponent<UsersState> {
  state: UsersState = {
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

  pageTitle = 'Setting Users';

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
    const store = window.localStorage.getItem('listUser')

    console.log(JSON.parse(store));
    this.setState({
      ...this.state,
      data: store ? JSON.parse(store) : [],
      queries,
      totalItem: 7,
    })
  }

  render() {
    return (
      <SettingUsersTemplate self={this} />
    )
  }

  /** 
   * Event add record 
  */
  handAddUser = () => {
    // Open dialog Add Menu
    this.props.history.push('/setting/add-user')
  }
}
