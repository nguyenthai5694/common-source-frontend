import React from 'react';
import { FormikContextType } from 'formik';
import PageComponent from 'soumu/utils/page/page.component'
import { NoticeType } from '../../../const/oshirase.const';
import { ModalService } from '../../../services/modal';
import DashboardTemplate from './dashboard.template';

interface DashboardState {
  isRunning: boolean,
  type: number
}

export default class Dashboard extends PageComponent<DashboardState> {
  state: DashboardState = {
    isRunning: false,
    type: window.location.pathname.includes('oshirase/system') ? NoticeType.SYSTEM : NoticeType.ADMIN,
  };

  formRef = React.createRef<FormikContextType<any>>();

  pageTitle = (this.state.type === NoticeType.ADMIN) ? '組織内管理者からのお知らせ投稿編集' : 'システムからのお知らせ投稿編集';

  breadcrumb = [

  ];

  private modalService = new ModalService();

  render() {
    return (
      <DashboardTemplate self={this} />
    )
  }
}
