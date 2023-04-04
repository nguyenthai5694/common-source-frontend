import React from 'react';
import { MIM_MESSAGE } from 'app/const/mim.const';
import { sanitize } from 'app/services/sanitize';

// Handle for the case "\n"
export const breakWord = (message) => {
  const arr: string[] = message.split('\n');

  const dom = document.createElement('strong');
  let lastBr;

  arr.forEach((val) => {
    const textNode = document.createElement('span');

    textNode.innerHTML = val;

    dom.appendChild(textNode);
    lastBr = dom.appendChild(document.createElement('br'));
  });

  dom.removeChild(lastBr);

  // DOM generated document cannot render normally with React. So we must do like this instead
  return <div dangerouslySetInnerHTML={{ __html: sanitize(dom.outerHTML) }} />;
};

// MIMCW013
export const CONFIRM_UPLOAD_CSV = (
  <strong>
    {MIM_MESSAGE.CONFIRM.UPLOAD_CSV}

    <br />

    {MIM_MESSAGE.QUESTION.IS_IT_OK}
  </strong>
);

// MIMCW017
export const CONFIRM_CHECK_START = (
  <strong>
    {MIM_MESSAGE.CONFIRM.CHECK_START}

    <br />

    {MIM_MESSAGE.QUESTION.IS_IT_OK}
  </strong>
);

// MIMCW004
export const CONFIRM_RUN = (
  <strong>
    {MIM_MESSAGE.CONFIRM.RUN}

    <br />

    {MIM_MESSAGE.QUESTION.IS_IT_OK}
  </strong>
);

// MIMCW018
export const CONFIRM_CANCEL = (screenName: string) => (
  <strong>
    {MIM_MESSAGE.CONFIRM.CANCEL(screenName)}

    <br />

    {MIM_MESSAGE.QUESTION.IS_IT_OK}
  </strong>
);

export const CONFIRM_DOWNLOAD_CSV = (
  <strong>
    {MIM_MESSAGE.CONFIRM.DOWNLOAD}

    <br />

    {MIM_MESSAGE.QUESTION.IS_IT_OK}
  </strong>
);

export const CONFIRM_DELETE_ITEM = (
  <strong>
    {MIM_MESSAGE.CONFIRM.DELETE_ITEM}

    <br />

    {MIM_MESSAGE.QUESTION.IS_IT_OK}
  </strong>
);

export const CONFIRM_DELETE_IN_USE = (
  <strong>
    {MIM_MESSAGE.CONFIRM.DELETE_IN_USE}

    <br />

    {MIM_MESSAGE.QUESTION.SURE_DELETE}
  </strong>
);

export const CONFIRM_SWITCH_ADMIN_TYPE = (
  <strong>
    {MIM_MESSAGE.CONFIRM.SWITCH_ADMIN_TYPE}

    <br />

    {MIM_MESSAGE.QUESTION.IS_IT_OK}
  </strong>
);

export const CONFIRM_UPDATE = (
  <strong>
    {MIM_MESSAGE.CONFIRM.UPDATE}

    <br />

    {MIM_MESSAGE.QUESTION.IS_IT_OK}
  </strong>
);

export const CONFIRM_UPDATE_OVERRIDE = (
  <strong>
    {MIM_MESSAGE.CONFIRM.UPDATE_OVERRIDE}

    <br />

    {MIM_MESSAGE.QUESTION.IS_IT_OK}
  </strong>
);

export const CONFIRM_OVERRIDE_WARNING_THRESHOLD = function (warningThreshold: string) {
  return (
    <strong>
      {MIM_MESSAGE.CONFIRM.OVERRIDE_WARNING_THRESHOLD(warningThreshold)}

      <br />

      {MIM_MESSAGE.QUESTION.OVERRIDE_WARNING_THRESHOLD}
    </strong>
  );
};

export const CONFIRM_SWITCH_BUNGRI_GROUP_CODE = breakWord(MIM_MESSAGE.CONFIRM.SWITCH_BUNGRI_GROUP_CODE);
