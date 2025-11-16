export const create = (key, newItem) => {
    const data = JSON.parse(localStorage.getItem(key)) || [];
    data.push(newItem);
    localStorage.setItem(key, JSON.stringify(data));
    return newItem;
  };
  
  export const read = (key) => {
    return JSON.parse(localStorage.getItem(key)) || [];
  };
  
  export const update = (key, updatedItem) => {
    const data = JSON.parse(localStorage.getItem(key)) || [];
    const newData = data.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    localStorage.setItem(key, JSON.stringify(newData));
    return updatedItem
  };