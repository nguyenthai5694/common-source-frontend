import React from 'react';
import { FormikContextType } from 'formik';
import { displayFormErrors } from 'common/form';
import PageComponent from 'common/utils/page/page.component'
import AddUserTemplate from './add-user.template';

interface AddUserState {
  isRunning: boolean,
  data: any[],
}

export default class AddUser extends PageComponent<AddUserState> {
  state: AddUserState = {
    isRunning: true,
    data: [],
  };

  formRef = React.createRef<FormikContextType<any>>();

  pageTitle = 'Add User';

  breadcrumb = [

  ];

  componentDidMount() {
  }

  render() {
    return (
      <AddUserTemplate self={this} />
    )
  }

  /**
   * Event submit form
   */
  handSubmitForm() {
    //Validate
    console.log(this.formRef.current.values);

    if (!this.formRef.current.isValid) {
      displayFormErrors(this.formRef.current);

      return
    }
  }
}
