import React from 'react';
import { FormikContextType } from 'formik';
import { DataTableQueries } from 'common/blocks/datatable/datatable.type';
import { defaultQueries } from 'common/blocks/table-ui/table';
import PageComponent from 'common/utils/page/page.component'
import { ModalService } from 'app/services/modal';
import AddMenuModal from './components/add-menu-modal.component';
import { SettingMenuData } from './data-table.config';
import SettingMenuTemplate from './setting-menu.template';

interface DemoState {
  isRunning: boolean,
  queries: DataTableQueries,
  data: SettingMenuData[]
}

export default class SettingMenu extends PageComponent<DemoState> {
  state: DemoState = {
    isRunning: false,
    queries: {
      ...defaultQueries,
      sort: {
        type: 'asc',
        dataKey: 'name',
      },
    },
    data: [],
  };

  formRef = React.createRef<FormikContextType<any>>();

  pageTitle = 'Setting Menu';

  breadcrumb = [

  ];

  private modalService = new ModalService();

  componentDidMount() {
    this.onSearch(this.state.queries)
  }

  onSearch = (queries: DataTableQueries) => {
    const store = window.localStorage.getItem('listmenu')

    this.setState({
      ...this.state,
      data: store ? JSON.parse(store) : [],
      queries,
    })
  }

  render() {
    return (
      <SettingMenuTemplate self={this} />
    )
  }

  handAddMenu = () => {
    const submitForm = this.modalService.openPortalDialog(AddMenuModal, {
      a: '1',
    });

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
