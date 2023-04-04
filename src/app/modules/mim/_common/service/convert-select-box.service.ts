export const convertSelectBox = (
  listItem,
): {
  label: any;
  value: any;
}[] => {
  let newList = listItem.map((item) => {
    return {
      label: item.name,
      value: item.key,
    };
  });

  return newList;
};

export const convertSelectBoxFilter = (listItem) => {
  let newList = listItem.map(item => {
    return {
      'label': item.gyoBruiFnm,
      'value': item.gyoBruiKjnBan,
    }
  })

  return newList;
}

export const convertSelectBoxFilterOffLineOutputList = (listItem) => {
  let newList = listItem.map(item => {
    return {
      'label': item.gyoBruiFnm,
      'value': item.gyoBruiKjnBan,
    }
  })

  return newList;
}

export const convertDepartment = (departmentList) => {
  let newList = departmentList.map(item => {
    return {
      ...item,
      'label': item.kaName,
      'value': item.kaNo,
    }
  })

  return newList;
}

export const ignoreValuesObjects = (object, val) => {
  let newObject = [];

  object.forEach(item => {
    if (item.value !== val.toString()) {
      newObject.push( item );
    }
  })

  return newObject;
}
/**
 * get default value for selectbox
 * @param list
 * @param defaultValue
 * @return string value
 */
export const getDefaultSelectedForSelectBox = (selectList, defaultValue = '', mustConvert = true) => {
  if (defaultValue.trim()) {
    return defaultValue;
  }

  let newList = selectList;

  if (mustConvert) {
    newList = convertSelectBox(selectList);
  }

  if (!newList.length) {
    return '';
  }

  return newList[0]?.value;
}
