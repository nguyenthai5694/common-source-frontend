/** Used for sorting data in DataTable **/
export const sortData = (arr: any[], sortBy: string, sortType: string) => {
  const clonedArray = JSON.parse(JSON.stringify(arr));

  clonedArray.sort((a: any, b: any) => {
    if (a[sortBy] && b[sortBy]) {
      switch (sortType.toLocaleLowerCase()) {
        case 'asc':
          switch (sortBy) {
            case 'rowNo':
            case 'line':
              return parseInt(a[sortBy], 10) - parseInt(b[sortBy], 10);
            default:
              return a[sortBy].toString().localeCompare(b[sortBy].toString());
          }

        case 'desc':
          switch (sortBy) {
            case 'rowNo':
            case 'line':
              return parseInt(b[sortBy], 10) - parseInt(a[sortBy], 10);
            default:
              return b[sortBy].toString().localeCompare(a[sortBy].toString());
          }

        default:
          return 0;
      }
    } else {
      return 0; // No sort if null or undefined
    }
  });

  return clonedArray;
};
