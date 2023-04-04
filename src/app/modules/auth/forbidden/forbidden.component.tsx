import React from 'react';
import PageError, { PageErrorType } from 'soumu/blocks/page-error/page-error.component';
import PageComponent from 'soumu/utils/page/page.component';

export default class Forbidden extends PageComponent {
  pageTitle;

  render() {
    return <PageError error={PageErrorType.FORBIDDEN} />
  }
}
