import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { auth } from "../../helpers/Firebase";
import Http from "../../helpers/Http";
import ApiRoutes from "../../helpers/ApiRoutes";
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from "../actions";

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
} from "./actions";

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password) => {
  let formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);

  let path = ApiRoutes.ADMIN_LOGIN;
  const res = await Http("POST", path, formData);

  if(res){
    if (res.status==200) {
      return res.data;
    } else {
      throw res.message;
    }
  }else{
    throw "Invalid Login Cridential.";
  }
};

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
    
    if (loginUser) {
      console.log(loginUser);
      localStorage.setItem("user_id", loginUser._id);
      localStorage.setItem("auth_token", loginUser.auth_token);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          username: loginUser.username,
          user_role: loginUser.user_role,
          user_image_url: loginUser.user_image_url,
          user_image_thumb_url: loginUser.user_image_thumb_url,
          user_permissions: loginUser.user_permissions,
        })
      );

      yield put(loginUserSuccess(loginUser));
      history.push("/");
    } else {
      yield put(loginUserError(loginUser.message));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  let path = ApiRoutes.ADMIN_LOGOUT;
  const res = await Http("PUT", path);

  if (res.status == "success") {
    history.push("/");
  } else {
    throw res.message;
  }
};

function* logout({ payload }) {
  const { history } = payload;
  try {
    yield call(logoutAsync, history);
    localStorage.removeItem("user_id");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("userData");
  } catch (error) { }
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  let formData = new FormData();
  formData.append("email", email);
  formData.append("otp_for", "forgot_password");

  let path = ApiRoutes.ADMIN_RESEND_OTP;
  const res = await Http("POST", path, formData);

  if (res.status == "success") {
    return res.data;
  } else {
    throw res.message;
  }
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess("success"));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  return await auth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then((user) => user)
    .catch((error) => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess("success"));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (email, password) => {
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => authUser)
    .catch((error) => error);
};

function* registerWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      email,
      password
    );
    if (!registerUser.message) {
      localStorage.setItem("user_id", registerUser.user.uid);
      yield put(registerUserSuccess(registerUser));
      history.push("/");
    } else {
      yield put(registerUserError(registerUser.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchRegisterUser),
  ]);
}
