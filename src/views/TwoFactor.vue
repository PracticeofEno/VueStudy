<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { ref } from "vue";
import { useCookies } from 'vue3-cookies';


let qrCodeText = ref();
const { cookies } = useCookies();
let store = useUserStore();

async function twoFactorAuthentication() {
    axios.post("/api/auth/two", { code: qrCodeText.value }, {
        headers: {
            Authorization: `Bearer ` + cookies.get('jwt'),
        },
    })
    .then((res) => {

        axios.get("/api/users", {
          headers: {
            Authorization: `Bearer ` + cookies.get('jwt'),
          }
        })
        .then((res) => {
          console.log("Auth OK - AuthView");
          let store = useUserStore();
          store.data = res.data;
          store.login = true;
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
        router.push('/');
    })
    .catch(error => {
         console.log(`api /auth/two error`);
    })

}
</script>

<template>
    <div>
        <input type="text" v-model="qrCodeText" />
        <input type="button" value="전송" @click="twoFactorAuthentication" />
    </div>

</template>

<style scoped>
@media (min-width: 1024px) {}
</style>