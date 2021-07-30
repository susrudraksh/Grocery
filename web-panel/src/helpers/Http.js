import { servicePath, apiAccessKey } from "../constants/defaultValues";
import cryptLib from "@skavinvarnan/cryptlib";

export default (method, path, formData = undefined) => {
  var currentTimeStamp = Math.floor(Date.now()); // In seconds
  const accessToken = cryptLib.encryptPlainTextWithRandomIV(currentTimeStamp, apiAccessKey);
  const authToken = localStorage.getItem("auth_token");
  //const login_user_id = localStorage.getItem("user_id") || "";

  const apiUrl = servicePath + path;

  return fetch(apiUrl, {
    method: method,
    body: formData,
    headers: {
      "X-Access-Token": accessToken ? accessToken : "",
      Authorization: authToken ? "Bearer " + authToken : "",
      //login_user_id: login_user_id ? login_user_id : "",
    },
  })
    .then((apiRes) => {
      // on login session expire error

      if ([401, 408].includes(apiRes.status)) {
        localStorage.removeItem("user_id");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("userData");

        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload(true);
      } else if ([403].includes(apiRes.status)) {
        return apiRes.json().then((data) => ({
          status: apiRes.status,
          message: "You don't have permission to access this request",
          data: data.data,
        }));
      } else {
        return apiRes.json().then((data) => ({ status: apiRes.status, message: data.message, data: data.data }));
      }
    })
    .then((jsonRes) => {
      return jsonRes;
    })
    .catch((err) => {
      console.log(err.toString());
    });
};
