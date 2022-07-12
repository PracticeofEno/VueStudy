<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
import { useCookies } from 'vue3-cookies';
import QrcodeVue from 'qrcode.vue'
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

let store = useUserStore();
let id_validate = ref(true);
let selectFile = ref();
let nickname = ref();
let leftval = ref("");
let twoFactor1 = ref(false);
let twoFactor11 = ref(true);
let qrValue = ref();
let qrCodeText=ref();
let twoFactor2 = ref();
let backval = ref();
const { cookies } = useCookies();
let user = ref();

onBeforeMount(async () => {
  axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ` + cookies.get('jwt'),
        },
      })
    .then(res => {
      user.value = res.data;
      user.value.avatarPath = "http://localhost:7000/" + res.data.avatarPath;
      console.log(user.value);
      if (user.value.isTwoFactorAuthenticationEnabled)
      {
        leftval.value = "40px";
        backval.value = '#53FF4C';
        twoFactor2.value = true;
        twoFactor1.value = true;
        twoFactor11.value = false;
      }
      nickname.value = res.data.nickname;
    })
    .catch(error => {
        console.log(error);
        console.log(`api GET /users error`);
    })
  
})

/* png로 받아서 QRcode uri src 만드는건데 개삽질한거임 필요없지만 놔둠
function _arrayBufferToBase64( buffer : any) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}
*/

async function updateUserData() {
  console.log(nickname);
  await axios.post("/api/users/nickname/", { nickname: nickname.value },
    {
      headers: {
        Authorization: `Bearer ` + cookies.get('jwt'),
      }
    }
  )
    .then((res) => {
      console.log(res);
      console.log("send updateUserData Succcess");
      user.value.nickname = nickname.value;
    })
    .catch((error) => {
      console.log(error);
      if (error.response.data.statusCode == 409)
        id_validate.value = false;
      else
        router.push('/');
    })
}

async function updateAvatar() {
  if (selectFile.value.files[0]) {
    // Form 필드 생성
    let form = new FormData();
    console.log(selectFile.value.files[0]);
    form.append("file", selectFile.value.files[0]) // api file name

    await axios.post("/api/users/avatar", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ` + cookies.get('jwt'),
        },
      })
    .then(res => {
        user.value.avatarPath = "about:blank";
        setTimeout(() => { user.value.avatarPath = "http://localhost:7000/" + res.data }, 0)
        console.log("ok");
    })
    .catch(error => {
        console.log(error);
        console.log("nk");
    })
  } 
  else {
    alert("파일을 선택해 주세요.")
  }
}


async function twoFAClick() {
  console.log(`twoFactorValue = ${twoFactor1.value}`);
  if (!twoFactor1.value) {
    axios.get("/api/users/generate", {
        headers: {
          Authorization: `Bearer ` + cookies.get('jwt'),
        },
      })
    .then(res => {
      qrValue.value = res.data;
      twoFactor1.value = true;
    })
    .catch(error => {
        console.log(error);
        console.log(`api /users/generate error`);
    })
  }
  else {
    leftval.value = "0px";
    backval.value = '#CCCCCC';
    twoFactor1.value = false;
    twoFactor2.value = false;
    axios.post("/api/users/turn-off", { code: qrCodeText.value}, {
        headers: {
          Authorization: `Bearer ` + cookies.get('jwt'),
        },
      })
  }
}

async function twoFactorAuthentication() {
  console.log(`two authen`);
  console.log(localStorage.getItem("accesstoken"));
  axios.post("/api/users/turn-on", { code: qrCodeText.value}, {
        headers: {
          Authorization: `Bearer ` + cookies.get('jwt'),
        },
      })
    .then(res => {
      leftval.value = "40px";
      backval.value = '#53FF4C';
      twoFactor2.value = true;
      twoFactor1.value = false;

    })
    .catch(error => {
        console.log(`api /users/turn-on error`);
    })
}

</script>

<template>
  <div class="box" style="background: #BDBDBD;">
    <img class="profile" :src="user.avatarPath">
  </div>
  <h2 class="title">기본정보 수정</h2>
  <table class="userDataTable">
    <colgroup>
      <col style="width: 180px;">
      <col>
    </colgroup>
    <tbody>
      <tr>
        <!-- 첫번째 줄 시작 -->
        <th class="row"> 닉네임 </th>
        <input type="text" v-model="nickname">
      </tr><!-- 첫번째 줄 끝 -->
      <tr>
        <th class="row"> 승 </th>
        <td> {{ user.win }} </td>
      </tr>
      <tr>
        <th class="row"> 패 </th>
        <td> {{ user.lose }} </td>
      </tr>
      <tr>
        <th class="row"> 아바타 </th>
        <td>
          <form @submit.prevent="updateAvatar" method="post">
            <input type="file" ref="selectFile"/>
            <button type="submit">프로필 변경</button>
          </form>
        </td>
      </tr>
      <tr>
        <th class="row"> 2단계 인증 </th>
        <td>
          <div class='toggleBG' v-bind:style="{background: backval}" @click="twoFAClick">
            <button class='toggleFG' v-bind:style="{left: leftval}"></button>
          </div>
          <div v-if="twoFactor2"> 인증이 완료되었습니다 </div>
        </td>

      </tr>
      <tr v-if="twoFactor1 && twoFactor11">
        <th class="row"> <qrcode-vue :value="qrValue"></qrcode-vue></th>
          <!-- 시발..삽질..<img :src="'data:image/jpeg;base64,'+qrValue"/></th>-->
        <td>
          <input type="text" v-model="qrCodeText"/> 
          <input type="button" value="전송" @click="twoFactorAuthentication"/>
        </td>
      </tr>
    </tbody>

  </table>
  <div v-if="!id_validate">이미 존재하는 아이디 입니다.</div>
  <input type="button" @click="updateUserData" value="수정">
</template>


<style scoped>
.input_text {
  -webkit-text-size-adjust: none;
  --animate-duration: 1s;
  --animate-delay: 1s;
  --animate-repeat: 1;
  --swiper-theme-color: #007aff;
  --main-color: #152348;
  --main-light-color: #e5edf8;
  border-spacing: 0;
  border-collapse: collapse;
  word-break: break-all;
  font-family: Noto Sans KR, sans-serif;
  vertical-align: middle;
  box-sizing: border-box;
  -webkit-appearance: none;
  width: 300px !important;
  font-size: 16px;
  background: transparent;
  padding: 0 17px;
  height: 40px;
  border: 1px solid #d0d3da;
  border-radius: 8px;
}

.row {
  -webkit-text-size-adjust: none;
  --animate-duration: 1s;
  --animate-delay: 1s;
  --animate-repeat: 1;
  --swiper-theme-color: #007aff;
  line-height: 24px;
  letter-spacing: -.5px;
  --main-color: #152348;
  --main-light-color: #e5edf8;
  font-family: Noto Sans KR, sans-serif;
  border-spacing: 0;
  border-collapse: collapse;
  font-size: 15px;
  margin: 0;
  box-sizing: border-box;
  border-bottom: 1px solid #dedede;
  padding: 15px 10px;
  height: 58px;
  color: #555;
  font-weight: 500;
  vertical-align: top;
  background: #fff;
}

.userDataTable {
  -webkit-text-size-adjust: none;
  --animate-duration: 1s;
  --animate-delay: 1s;
  --animate-repeat: 1;
  --swiper-theme-color: #007aff;
  text-align: left;
  color: #222;
  line-height: 24px;
  letter-spacing: -.5px;
  --main-color: #152348;
  --main-light-color: #e5edf8;
  margin: 0;
  padding: 0;
  font-family: Noto Sans KR, sans-serif;
  box-sizing: border-box;
  width: 100%;
  font-weight: 400;
  border-spacing: 0;
  border-collapse: collapse;
  margin-bottom: 80px !important;
  font-size: 15px;
  border-top: 1px solid #dedede;
}

.buttons {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}
.box {
    width: 150px;
    height: 150px; 
    border-radius: 70%;
    overflow: hidden;
}
.profile {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.toggleBG {
  background:#CCCCCC;
  width:70px;
  height:30px;
  border:1px solid#CCCCCC;
  border-radius:15px;
}
.toggleFG {
  background:#161111;
  width:30px;
  height:30px;
  border:none;
  border-radius:15px;
  position:relative;
  left:0px;
}

</style>
