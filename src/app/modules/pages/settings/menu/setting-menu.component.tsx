import React from 'react';
import { FormikContextType } from 'formik';
import { DataTableQueries } from 'common/blocks/datatable/datatable.type';
import PageComponent from 'common/utils/page/page.component'
import { defaultQueries } from 'app/const/common.const';
import { ModalService } from 'app/services/modal';
import AddMenuModal from './components/add-menu-modal.component';
import { SettingMenuData } from './data-table.config';
import SettingMenuTemplate from './setting-menu.template';

interface DemoState {
  isRunning: boolean,
  queries: DataTableQueries,
  data: SettingMenuData[],
  totalItem: number,
}

export default class SettingMenu extends PageComponent<DemoState> {
  state: DemoState = {
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

  pageTitle = 'Setting Menu';

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
    console.log(queries);

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

  /** 
   * Event add record 
  */
  handAddMenu = () => {
    // Open dialog Add Menu
    const submitForm = this.modalService.openPortalDialog(AddMenuModal, {
      a: '1',
    });

    // Event after close dialog Add Menu
    submitForm.afterClosed().subscribe((data) => {
      if (data) {
        let store = window.localStorage.getItem('listmenu') ? JSON.parse(window.localStorage.getItem('listmenu')) : [];

        store.push(data.data)

        window.localStorage.setItem('listmenu', JSON.stringify(store))

        this.onSearch(this.state.queries)
      }
    })
  }
}
