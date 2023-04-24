import React from 'react';
import { FormikContextType } from 'formik';
import PageComponent from 'common/utils/page/page.component'
import { ModalService } from '../../../services/modal';
import DashboardTemplate from './dashboard.template';

interface DashboardState {
  isRunning: boolean,
  type: number
}

export default class Dashboard extends PageComponent<DashboardState> {
  state: DashboardState = {
    isRunning: false,
    type: 0,
  };

  formRef = React.createRef<FormikContextType<any>>();

  pageTitle = (this.state.type === 0) ? '組織内管理者からのお知らせ投稿編集' : 'システムからのお知らせ投稿編集';

  breadcrumb = [

  ];

  private modalService = new ModalService();

  render() {
    return (
      <DashboardTemplate self={this} />
    )
  }
}
