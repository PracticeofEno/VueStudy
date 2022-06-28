<script setup lang="ts">
import { onBeforeMount } from "@vue/runtime-core";
import axios from "axios";
import { RouterView } from "vue-router";
import AppNav from "./components/AppNav.vue"
import router from "./router";
import { useUserStore } from "./stores/user";
import Chat from "./components/Chat.vue";
import io from "socket.io-client"

let store = useUserStore();

</script>

<template>
  <div v-if="store.login"> {{ store.data.nickname }} 님 환영합니다!</div>
  <div v-else> 로그인이 필요합니다</div>
  <AppNav />
  <RouterView />
  <Chat :msg="io('http://localhost:7000')"/>
</template>

<style>
@import "@/assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}
</style>

