import React from 'react';
import { FormikContextType } from 'formik';
import PageComponent from 'common/utils/page/page.component'
import { ModalService } from '../../../services/modal';
import InputTemplate from './input.template';

interface DashboardState {
  isRunning: boolean,
}

export default class InputComponent extends PageComponent<DashboardState> {
  state: DashboardState = {
    isRunning: false,
  };

  formRef = React.createRef<FormikContextType<any>>();

  pageTitle = 'Input';

  breadcrumb = [

  ];

  private modalService = new ModalService();

  render() {
    return (
      <InputTemplate self={this} />
    )
  }
}
