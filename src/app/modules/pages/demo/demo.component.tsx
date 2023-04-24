import React from 'react';
import { FormikContextType } from 'formik';
import { DataTableQueries } from 'common/blocks/datatable/datatable.type';
import PageComponent from 'common/utils/page/page.component'
import { defaultQueries } from 'app/const/common.const';
import { ModalService } from '../../../services/modal';
import DemoTemplate from './demo.template';

interface DemoState {
  isRunning: boolean,
  queries: DataTableQueries,
}

export default class Demo extends PageComponent<DemoState> {
  state: DemoState = {
    isRunning: false,
    queries: {
      ...defaultQueries,
      sort: {
        type: 'asc',
        dataKey: 'name',
      },
    },
  };

  formRef = React.createRef<FormikContextType<any>>();

  pageTitle = 'Demo';

  breadcrumb = [

  ];

  private modalService = new ModalService();

  onSearch = (queries: DataTableQueries) => {
    console.log(queries);

    this.updateState('queries', queries)
  }

  render() {
    return (
      <DemoTemplate self={this} />
    )
  }
}
