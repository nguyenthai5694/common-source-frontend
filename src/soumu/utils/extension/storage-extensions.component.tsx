export{}
declare global {
  interface Storage  {
    setItems(key: string, items: any): any[];
    getItems(key: string): any[];
  }
}

Storage.prototype.setItems = function (key, items) {
  return this.setItem(key, JSON.stringify(items))
}

Storage.prototype.getItems = function(key) {
  let array;

  try {
    let data = JSON.parse(sessionStorage.getItem(key));

    array = data?.length ? data : [];
  } catch (error) { }

  return array || [];
}

