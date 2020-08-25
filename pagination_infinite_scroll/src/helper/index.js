export const sortBy = (sortType) => (a, b) => {
  console.log(sortType, "", a, b);
  if (sortType === true) return a > b ? 1 : b > a ? -1 : 0;
  if (sortType === false) return a > b ? -1 : b > a ? 1 : 0;
};

export const sorting = (arr, data) => {
  console.log(arr);
  console.log(data);
  arr.sort((a, b) => {
    if (data.sortBy === "STRING") {
      let aName = a.fields[data.fieldName].toLowerCase();
      let bName = b.fields[data.fieldName].toLowerCase();
      return sortBy(data.sortType)(aName, bName);
    }
    if (data.sortBy === "INTEGER") {
      let aScore = parseInt(a.fields[data.fieldName]);
      let bScore = parseInt(b.fields[data.fieldName]);
      return sortBy(data.sortType)(aScore, bScore);
    }
    if (data.sortBy === "DATE") {
      let aDate = new Date(a.fields[data.fieldName]);
      let bDate = new Date(b.fields[data.fieldName]);
      return sortBy(data.sortType)(aDate, bDate);
    }
    if (data.sortBy === "FLOAT") {
      let aFloat = parseFloat(a.fields[data.fieldName]);
      let bFloat = parseFloat(b.fields[data.fieldName]);
      return sortBy(data.sortType)(aFloat, bFloat);
    }
  });
  return arr;
};
export const searchText = (arr) => (searchText) => {
  console.log(arr, "", searchText);
  let str = "";
  let filterArray = [];
  arr.forEach((el) => {
    for (const [key, value] of Object.entries(el.fields)) {
      if (key !== "createdAt" && key !== "updatedAt") {
        if (typeof el.fields[key] === "string") {
          str = el.fields[key].toLowerCase();
        }
        if (typeof el.fields[key] === "number") {
          str = el.fields[key].toString();
        }

        if (typeof el.fields[key] === "string" || typeof el.fields[key] === "number") {
          console.log(str, "", str.indexOf(searchText.toLowerCase()));
          if (str.indexOf(searchText.toLowerCase()) !== -1) {
            filterArray.push(el);
            break;
          }
        }
      }
    }
  });
  return filterArray;
};
