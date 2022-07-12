import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    login: false,
    data: {},
  }),
  getters: {
    getLogin: (state) => state.login
  },
  actions: {
    increment() {
    }
  }
})
