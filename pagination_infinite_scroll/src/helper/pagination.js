let offsetId = [];
// const baseKey = process.env.BASE_KEY;
// const apiKey = process.env.API_KEY;
const baseKey="appy19HtBkyLLeEF1"
const apiKey="keypO3dUKSWTYI2X2"
console.log(baseKey);
console.log(apiKey);

function* getRecords(tableName, offsetId = null) {
  console.log("hii");
  let apiData;

  if (offsetId === null) {
    apiData = yield call(
      api,
      `https://api.airtable.com/v0/${baseKey}/${tableName}?api_key=${apiKey}`
    );
  } else {
    apiData = yield call(
      api,
      `https://api.airtable.com/v0/${baseKey}/${tableName}?api_key=${apiKey}&offset=${offsetId}`
    );
  }
  return apiData.records;
}

const getTotalRecords=(tableName)=> {
  return new Promise((resolve,reject)=>{
  let temp = [];
  //let offsetId = [];
  let flag = true;
  let apiData;
  let i = 0;
  let offset;
  while (true) {
    if (flag === true) {
      apiData = getRecords(tableName);
      console.log(apiData);
      offset = apiData.offset;
      offsetId.push(apiData.offset);
      console.log(offsetId);
      temp.push(...apiData.records);
      console.log(temp);
      flag = false;
    } else {
      if (offsetId.length > 0 && offset) {
        apiData =getRecords(tableName, offsetId[i]);
        offset = apiData.offset;
        if (apiData.offset) {
          offsetId.push(apiData.offset);

          console.log(offsetId);
          i = i + 1;
        }
        temp.push(...apiData.records);
        console.log(temp);
      } else {
        break;
      }
    }
  }

  console.log(temp);
  resolve(temp);
})
}
