import React from 'react';
import { FormikContextType } from 'formik';
import PageComponent from 'soumu/utils/page/page.component'
import { NoticeType } from '../../../const/oshirase.const';
import { ModalService } from '../../../services/modal';
import InputTemplate from './input.template';

interface DashboardState {
  isRunning: boolean,
  type: number
}

export default class InputComponent extends PageComponent<DashboardState> {
  state: DashboardState = {
    isRunning: false,
    type: window.location.pathname.includes('oshirase/system') ? NoticeType.SYSTEM : NoticeType.ADMIN,
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
