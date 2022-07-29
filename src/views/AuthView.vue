<script setup lang="ts">
import { onBeforeMount } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { useCookies } from 'vue3-cookies';

const currentRoute = useRoute();
const { cookies } = useCookies();
let store = useUserStore();


onBeforeMount(() => {
  axios.post("/api/users/login", { code: currentRoute.query.code })
    .then(
      (res) => {
        console.log(cookies.get("jwt"));
        axios.get("/api/users", {
          headers: {
            Authorization: `Bearer ` + cookies.get('jwt'),
          }
        })
        .then((res) => {
          console.log("Auth OK - AuthView");
          let store = useUserStore();
          store.data = res.data;
          store.data.avatarPath = "http://localhost:7000/" + res.data.avatarPath;
          store.login = true;
          console.log(res.data);
          if (res.data.nickname == "")
            router.push('/signup');
          else
            router.push('/');
        })
        .catch((error) => {
          const data = error.response.data;
          if (data.statusCode == 401) {
              router.push('/twoFactor')
          }
          else {
            store.$reset();
            console.log("/api/users error");  
          }
        })
      }
    )
    .catch(
      (error) => {
        console.log(error);
      });
});
</script>

<template>
  <div>
    <h1>This is an Auth page </h1>
  </div>
</template>