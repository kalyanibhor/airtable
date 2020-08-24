import { call } from "redux-saga/effects";
export function* api(uri, method = "GET", body = null) {
  let response;
  console.log("===",method);
  console.log("??",body);
  if (body) {
    response = yield call(fetch, uri, {
      method: method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    });
  } else {
    console.log("else block is called");
    response = yield call(fetch, uri, { method: method || "GET" });
  }
  const json = yield call(retrieveJSON, response);
 
  return json;
}
export function retrieveJSON(response) {
  return response.json();
}
