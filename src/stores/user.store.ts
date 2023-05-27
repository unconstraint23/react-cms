import type { Role } from '@/interface/user/login';
import type { Locale, UserState } from '@/interface/user/user';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import cache from '@/utils/cache';
import { getGlobalState } from '@/utils/getGloabal';

const initialState: UserState = {
  ...getGlobalState(),
  noticeCount: 0,
  locale: (cache.getCache('locale')! || 'zh_CN') as Locale,
  newUser: JSON.parse(cache.getCache('newUser')!) ?? true,
  logged: cache.getCache('token') ? true : false,
  menuList: [],
  userInfo: cache.getCache('userInfo') || {},
  role: (cache.getCache('username') || '') as Role,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserItem(state, action: PayloadAction<Partial<UserState>>) {
      const { userInfo } = action.payload;

      if (userInfo !== state.userInfo) {
        cache.setCache('userInfo', action.payload.userInfo);
      }

      Object.assign(state, action.payload);
    },
  },
});

export const { setUserItem } = userSlice.actions;

export default userSlice.reducer;
