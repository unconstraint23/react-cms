import type { LoginParams } from '../interface/user/login';
import type { Dispatch } from '@reduxjs/toolkit';

import cache from '@/utils/cache';

import { apiLogin, apiLogout } from '../api/user.api';
import { setUserItem } from './user.store';
import { createAsyncAction } from './utils';
// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const loginAsync = createAsyncAction<LoginParams, boolean>(payload => {
  return async dispatch => {
    const { result, code } = await apiLogin(payload);

    if (code === 200) {
      cache.setCache('token', result.token);
      cache.setCache('userInfo', result?.userInfo);
      dispatch(
        setUserItem({
          logged: true,
          userInfo: result?.userInfo,
        }),
      );

      return true;
    }

    return false;
  };
});

export const logoutAsync = () => {
  return async (dispatch: Dispatch) => {
    cache.clearCache();
    dispatch(
      setUserItem({
        logged: false,
      }),
    );

    return true;
  };
};
