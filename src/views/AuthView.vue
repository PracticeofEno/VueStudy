<script setup lang="ts">
import { onBeforeMount } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import router from "@/router";
import { useUserStore } from "@/stores/user";

const currentRoute = useRoute();
let store = useUserStore();

onBeforeMount(() => {
  axios.post("/api/auth", { code: currentRoute.query.code })
    .then(
      (res) => {
        localStorage.setItem("accesstoken", res.data.jwt);

        axios.get("/api/users", {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("accesstoken")
          }
        })
        .then((res) => {
          console.log("Auth OK - AuthView");
          let store = useUserStore();
          store.data = res.data;
          store.login = true;
          console.log(res.data);
          if (res.data.nickname == "")
            router.push('/signup');
          else
            router.push('/');
        })
        .catch((error) => {
          store.$reset();
          console.log("/api/users error");
        })
      }
    )
    .catch(
      (error) => {
        console.error("There was an error!", error);
      });
});
</script>

<template>
  <div>
    <h1>This is an Auth page {{ currentRoute.query.code }}</h1>
  </div>
</template>

