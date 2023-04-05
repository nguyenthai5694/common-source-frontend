/**
 * NOTE: This page is just a dummy page, DO NOT use it in production
 */
import React from 'react';
import { FormikContextType } from 'formik';
import PageComponent from 'common/utils/page/page.component'
import { RECOVERY_PREV_PATH } from 'app/const/env.const';
import Template from './login.template';

interface LoginState {
  isRunning: boolean;
  tab: string;
}

export default class Login extends PageComponent<LoginState> {
  state = {
    isRunning: true,
    tab: 'email',
  }

  /**
   * Title Page
   */
  pageTitle = 'Login';

  /**
   * Init values of Formik
   */
  initialValues = {
    email: 'soumu.io',
    password: 'zx0472524',
  };

  /**
   * Create form by Formik
   */
  formRef = React.createRef<FormikContextType<any>>()

  componentDidMount() {
    const prevPath = sessionStorage.getItem(RECOVERY_PREV_PATH);

    sessionStorage.clear()
    prevPath && sessionStorage.setItem(RECOVERY_PREV_PATH, prevPath);

    this.formRef.current.setValues({
      email: 'demo@devias.io',
      password: 'Password123!',
      submit: null,
    })

    this.updateState('isRunning', false)
  }

  render() {
    return (

      <Template self={this} />

    );
  }

  login = (user) => () => {
    this.onSubmit({
      ...this.initialValues,
      user,
    });
  }

  handleMethodChange = (value) => {
    // this.updateState('tab', value)
    this.setState({
      ...this.state,
      tab: value,
    })
  }

  onSubmit = (values) => {
    this.updateState('isRunning', true);

    // eslint-disable-next-line max-len
    window.localStorage.setItem('token', 'JSESSIONID=B3F86A53861A9F24EDFBBD24009544DC; FD_NinshoSessionID=9f7a99a1db2dadb9af85d479695a6d2b8f4997bc323c75c7344ded71253a1f39678a5d1ba5449526ce547efcae80d9d753e4010382070c83f2d2788bae6be864e6b5d08d5410fca05c96026fad70078c552eee9688dc45155b8bbbd656a3ccc37c78fe41b55037c08241e0daea83b451372a5a6546bcc777c3c7786cb95cd919351d8cac85f31f60f5c93d51c71a70ac3fb1f4792cb6a7d3011e685f19660e2faa51df9e9ef47c58f1f749afb15d747a;')
    // const loginSub = login(values.domain, values.user).subscribe(
    //   () => {
    this.updateState('isRunning', false);
    this.props.history.push('/dashboard');
    //   },
    //   () => this.updateState('isRunning', false),
    // )

    // this.subscription.add(loginSub);
  };
}
