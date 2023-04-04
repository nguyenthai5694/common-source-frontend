import { PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  department: string,
  name: string,
}

export interface LoggedInUserState {
  userInfo?: UserInfo;
}

export const initialState: LoggedInUserState = {
  userInfo: {
    department: null,
    name: null,
  },
};

export const reducers = {
  setUserInfo: (state: LoggedInUserState, action: PayloadAction<UserInfo>) => {
    state.userInfo = action.payload;
  },
};