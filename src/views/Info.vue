<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { onBeforeMount, ref, computed} from 'vue';

let store = useUserStore();
let id_validate = ref(true);
let nickname = ref();

onBeforeMount(async () => {
  nickname.value = store.data.nickname;
})

async function updateUserData() {
  console.log(nickname);
  await axios.post("/api/users/nickname/", { nickname: nickname.value },
    {
      headers : {
        Authorization: `Bearer ` + localStorage.getItem("accesstoken")
      }
    }
  )
  .then((res) => {
    console.log(res);
    console.log("send updateUserData Succcess");
    store.data.nickname = nickname.value;
  })
  .catch((error) => {
    console.log(error);
    if (error.response.data.statusCode == 409)
      id_validate.value = false;
    else
      router.push('/');
  })
}

</script>

<template>
<h2 class="title">기본정보 수정</h2>
<table class="userDataTable">
  <colgroup><col style="width: 180px;"> <col></colgroup>
  <tbody>
	  <tr><!-- 첫번째 줄 시작 -->
      <th class="row"> 닉네임 </th>
      <input type="text" v-model="nickname">
	  </tr><!-- 첫번째 줄 끝 -->
    <tr>
      <th class="row"> 승 </th>
	    <td> {{ store.data.win }} </td>
	  </tr>
    <tr>
      <th class="row"> 패 </th>
	    <td> {{ store.data.lose }} </td>
	  </tr>
    <tr>
      <th class="row"> 아바타경로 </th>
	    <td> {{ store.data.avatarPath }} </td>
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
    font-family: Noto Sans KR,sans-serif;
    vertical-align: middle;
    box-sizing: border-box;
    -webkit-appearance: none;
    width: 300px!important;
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
    font-family: Noto Sans KR,sans-serif;
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
    font-family: Noto Sans KR,sans-serif;
    box-sizing: border-box;
    width: 100%;
    font-weight: 400;
    border-spacing: 0;
    border-collapse: collapse;
    margin-bottom: 80px!important;
    font-size: 15px;
    border-top: 1px solid #dedede;
}

.buttons {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}
.parent {
display: grid;
grid-template-columns: repeat(5, 1fr);
grid-template-rows: 0.3fr repeat(4, 1fr);
grid-column-gap: 0px;
grid-row-gap: 0px;
}

.div1 { grid-area: 1 / 1 / 2 / 2; }
.div2 { grid-area: 1 / 2 / 2 / 3; }
.div3 { grid-area: 1 / 3 / 2 / 4; }
.div4 { grid-area: 1 / 4 / 2 / 5; }
.div5 { grid-area: 1 / 5 / 2 / 6; }
.div6 { grid-area: 2 / 1 / 6 / 5; }
.div7 { grid-area: 2 / 5 / 6 / 6; }
</style>
