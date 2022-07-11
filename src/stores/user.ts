import { defineStore } from 'pinia'
import { ref } from 'vue';
import { stringifyQuery } from 'vue-router';

export type UserType = {
  id: string;
  nickname: string;
  win: number;
  lose: number;
  admin: Boolean;
  avatarPath: string;
  twoFactorAuthenticationSecret: string,
  isTwoFactorAuthenticationEnabled: boolean,
  lating: number,
};

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    login: false,
    data : { },
  }),
  getters: {
    getLogin: (state) => state.login
  },
  actions: {
    increment() {
    }
  }
})
