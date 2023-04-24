import React from 'react';
import { FormikContextType } from 'formik';
import PageComponent from 'common/utils/page/page.component'
import { ModalService } from '../../../services/modal';
import DashboardTemplate from './dashboard.template';

interface DashboardState {
  isRunning: boolean,
}

export default class Dashboard extends PageComponent<DashboardState> {
  state: DashboardState = {
    isRunning: false,
  };

  formRef = React.createRef<FormikContextType<any>>();

  pageTitle = '2222222222';

  breadcrumb = [

  ];

  private modalService = new ModalService();

  render() {
    return (
      <DashboardTemplate self={this} />
    )
  }
}
