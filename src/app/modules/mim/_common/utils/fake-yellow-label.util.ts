import { requestAnimation } from './request-animation.util';

/**
 * Use this method for case that handles 'defaultItemSelected' (RADIO / CHECKBOX)
 * For example, see 'recordscheduleupload.component' line 370
 * @param type type must be 'radio' or 'checkbox'
 */
export const fakeYellowLabelForRadioOrCheckbox = (type = 'radio') => {
  // Fake label yellow for checked row
  setTimeout(() => {
    document.querySelectorAll('.-checked')?.forEach((elem) => {
      elem.classList.remove('-checked');
    });

    const elem: any = document.querySelectorAll(
      `${type === 'radio' ? '.b-table__radio' : '.b-table__checkbox'} :checked`,
    );

    let parentElem: any[] = [];

    if (elem) {
      for (let val of elem) {
        parentElem.push(val?.parentElement.parentElement.parentElement);
      }
    }

    if (parentElem && parentElem.length) {
      let nodes = Array.prototype.slice.call(document.querySelectorAll('.b-table__body')[0].children);
      let listIndexes: number[] = [];

      parentElem.forEach((val) => {
        listIndexes.push(nodes.indexOf(val));
      });

      // Add -checked class for table-row left
      parentElem.forEach((val) => {
        val.className = val.className + ' -checked';
      });

      // Add -checked class for table-row right
      listIndexes.forEach((index) => {
        document.querySelector(`.b-table__row.-right:nth-child(${index + 1})`)?.classList.add('-checked');
      });
    }
  }, 10);
};

export interface DataChange {
  rowId: any;
}

/**
 * Used for faking checked row (yellow highlighted)
 * @param rowIdList
 * @param isRemove
 * @param dataKey
 */
export const fakeYellowLabelForSwitch = (rowIdList: DataChange[], isRemove = false, dataKey: string) => {
  setTimeout(() => {
    let nodes = Array.prototype.slice.call(document.querySelectorAll('.b-table__body')[0].children);
    let listIndexes: number[] = [];

    // Add -checked class for table-row left
    rowIdList.forEach((val) => {
      const switchOrangeTableRow = document.getElementById(`switch-orange-${val.rowId}-${dataKey}`)?.parentElement
        .parentElement.parentElement;

      switchOrangeTableRow && listIndexes.push(nodes.indexOf(switchOrangeTableRow));

      if (!isRemove) switchOrangeTableRow?.classList.add('-checked');
      else switchOrangeTableRow?.classList.remove('-checked');
    });

    // Add -checked class for table-row right
    listIndexes.forEach((index) => {
      const tableRowRight = document.querySelector(`.b-table__row.-right:nth-child(${index + 1})`);

      if (!isRemove) tableRowRight?.classList.add('-checked');
      else tableRowRight?.classList.remove('-checked');
    });
  }, 10);
};

/**
 * Check whether new data is different from old data, if different, then fake checked status for the matching row
 * @param value current value to compare
 * @param options options to filter data
 * @returns object { dataChanged, dataUnchanged } for manual manipulating
 * <!> Note: by using primaryKey, the row matched with primary key still accessed in virtual DataTable
 */
export const doCheckedChangesSwitch = (
  value: any,
  options: { oldDataArray: any[]; dataKeys: any[]; primaryKey: string },
) => {
  const { oldDataArray, dataKeys, primaryKey } = options;

  if (!value || !oldDataArray || !dataKeys) {
    return;
  }

  const dataChanged: DataChange[] = [];
  const dataUnchanged: DataChange[] = [];

  const oldData = oldDataArray.find((val) => val[primaryKey] === value[primaryKey]);

  let isUnchanged = false;

  for (const key of dataKeys) {
    isUnchanged = value[key] === oldData[key];

    if (!isUnchanged) {
      break;
    }
  }

  if (isUnchanged) {
    dataUnchanged.push({ rowId: value[primaryKey] });
  } else {
    dataChanged.push({ rowId: value[primaryKey] });
  }

  fakeYellowLabelForSwitch(dataChanged, false, primaryKey);
  fakeYellowLabelForSwitch(dataUnchanged, true, primaryKey);

  return {
    dataChanged,
    dataUnchanged,
  };
};

/**
 * Set and keep track of switch ID (like state)
 * @param cmbSeq this variable is used to specify exact switch
 * @param options options to pass to
 * @returns
 */
export const setOnOffCmbList = (
  cmbSeq,
  options: { isOn: boolean; listCmbOff: any[]; listCmbOn: any[]; isSingle?: boolean },
) => {
  let { isOn, listCmbOff, listCmbOn, isSingle } = options;

  if (isOn) {
    const index = listCmbOff.findIndex((val) => val === cmbSeq);

    listCmbOff.splice(index, 1);

    listCmbOn.push(cmbSeq);

    const uniqueData = _.uniq(_.cloneDeep(listCmbOn));

    listCmbOn.splice(0, listCmbOn.length);

    if (isSingle) {
      uniqueData.forEach((val, index) => {
        if (index !== uniqueData.length - 1) listCmbOff.push(val);
      });

      listCmbOn.push(uniqueData[uniqueData.length - 1]);

      return;
    }

    uniqueData.forEach((val) => {
      listCmbOn.push(val);
    });
  } else {
    const index = listCmbOn.findIndex((val) => val === cmbSeq);

    listCmbOn.splice(index, 1);

    listCmbOff.push(cmbSeq);

    const uniqueData = _.uniq(_.cloneDeep(listCmbOff));

    listCmbOff.splice(0, listCmbOff.length);

    uniqueData.forEach((val) => {
      listCmbOff.push(val);
    });
  }
};

interface ListCmbType {
  listSwitch: any[]; // list switch containing switch ID
  dataKey: string; // data key to check changes
  primaryKey: string; // primary key of the switch (set in data-table.config)
  querySelectorPattern: string; // DOM query selector pattern. Must contain [val] to replace with actual switch ID
  callback?: Function; // To handle after main logic execution
}

/**
 * Set on/off for switch button by manipulating nodes in DOM
 * <!> Note: only use this method if you don't want to render DataTable again
 * @param listSwitchAll contains all list switch
 * @param backgroundData actual data to send to API
 */
export const doSetCmbOnOffDOM = (listSwitchAll: ListCmbType[], backgroundData: any[]) => {
  requestAnimation(() => {
    listSwitchAll.forEach((child) => {
      const { listSwitch, querySelectorPattern, dataKey, primaryKey, callback } = child;

      listSwitch.forEach((val) => {
        setTimeout(() => {
          const querySelectorPttrn = querySelectorPattern.replace('[val]', val);

          // Only select data visible on virtual DataTable, so this querySelector will be OK
          const switchHtmlElm: any = document.querySelector(querySelectorPttrn) as any;

          const backgroundDataItem = backgroundData.find((value) => value[primaryKey] === val);

          if (backgroundDataItem[dataKey]) {
            requestAnimation(function () {
              if (switchHtmlElm) {
                switchHtmlElm.checked = true;

                callback &&
                  setTimeout(() => {
                    callback(backgroundDataItem[primaryKey]);
                  }, 0);
              }
            });
          } else {
            requestAnimation(function () {
              if (switchHtmlElm) {
                switchHtmlElm.checked = false;

                switchHtmlElm.removeAttribute('checked');

                callback &&
                  setTimeout(() => {
                    callback(backgroundDataItem[primaryKey]);
                  }, 0);
              }
            });
          }
        }, 0);
      });
    });
  });
};
