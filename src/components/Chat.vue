<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import io from "socket.io-client"
import { ref } from "vue";
import { useCookies } from "vue3-cookies";
import Channel from "./channel/Channel.vue";

let store = useUserStore();
let message = ref("");
let socket: any;
let items = ref([]);
let hide = ref(false);
let ch_btn_string = ref(">")
const { cookies } = useCookies();

const socketOptions = {
   transportOptions: {
     polling: {
       extraHeaders: {
         Authorization: "Bearer " + cookies.get('jwt')
       }
     }
   }
};
socket = io('http://localhost:7000', socketOptions);
socket.on('connect', () => {
    socket.emit('join', 'join_data');
});

socket.on('message', (data) => {
    console.log(data);
    items.value.push(data.nickname + ": " + data.message);
});

socket.on('disconnected', () => {
    console.log('haha');
    socket.emit('disconnected', 'haha');
});


async function chatSend() {
    console.log(items);
    console.log( { nickname: store.data.nickname, message: message.value} );
    socket.emit('send', { nickname: store.data.nickname, message: message.value}, response => 
        {
          console.log('send:', response);
        },
    );
}

function ch_btn() {
    if (hide.value == true) {
        hide.value = false;
        ch_btn_string.value = "<";
    }
    else {
        hide.value = true;
        ch_btn_string.value = ">";
    }
}

</script>

<template>
    <div class="chat_area">
        <button type="button" class="btn_ch_close" @click="ch_btn"> {{ ch_btn_string }}</button>
        <Channel :hide="hide"/>
        <div v-if="hide" class="chat_box" >
            <div class="chat_font_size_14">
                <div class="castChat" style="height: calc(100% - 196px);">
                    <div v-for="item in items">
                        {{ item }}
                    </div>
                </div>
                <div class="cht_effect">
                    <!---->
                </div>
                <!---->
            </div>
        </div>
        <div v-if="hide" class="cht_bot_wrap">
            <div class="chtSend">
                <textarea v-model="message" placeholder="채팅하기" class="cht_input"></textarea>
                <button type="button" @click="chatSend" class="btnSend"> 보내기 </button>
            </div>
        </div>
    </div>
</template>



<style scoped>
.btn_ch_close {
    width: 42px;
    height: 42px;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 7px 0 0 7px;
    z-index: 10;
    margin-left: -42px;
}
.chat_area {
    -webkit-text-size-adjust: none;
    --animate-duration: 1s;
    --animate-delay: 1s;
    --animate-repeat: 1;
    --swiper-theme-color: #007aff;
    text-align: left;
    font-size: 16px;
    color: #222;
    line-height: 24px;
    font-family: Noto Sans KR, sans-serif;
    font-weight: 400;
    letter-spacing: -.5px;
    --main-color: #152348;
    --main-light-color: #e5edf8;
    --full-height: 817px;
    --full-width: 1301px;
    --video-ratio: 0.56338;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    position: fixed;
    top: 64px;
    bottom: 0;
    background: #fff;
    z-index: 50;
    right: 18px;
}

.channel_box {
    height: 100px;
    background: rgb(52, 42, 143);
}

.chat_box {
    -webkit-text-size-adjust: none;
    --animate-duration: 1s;
    --animate-delay: 1s;
    --animate-repeat: 1;
    --swiper-theme-color: #007aff;
    text-align: left;
    font-size: 16px;
    color: #222;
    line-height: 24px;
    font-family: Noto Sans KR, sans-serif;
    font-weight: 400;
    letter-spacing: -.5px;
    --main-color: #152348;
    --main-light-color: #e5edf8;
    --full-height: 817px;
    --full-width: 1301px;
    --video-ratio: 0.56338;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    position: relative;
    width: 320px;
    height: 100%;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    display: flex;
}

.chat_font_size_14 {
    -webkit-text-size-adjust: none;
    --animate-duration: 1s;
    --animate-delay: 1s;
    --animate-repeat: 1;
    --swiper-theme-color: #007aff;
    text-align: left;
    font-size: 16px;
    color: #222;
    line-height: 24px;
    font-family: Noto Sans KR, sans-serif;
    font-weight: 400;
    letter-spacing: -.5px;
    --main-color: #152348;
    --main-light-color: #e5edf8;
    --full-height: 817px;
    --full-width: 1301px;
    --video-ratio: 0.56338;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.cht_bot_wrap {
    -webkit-text-size-adjust: none;
    --animate-duration: 1s;
    --animate-delay: 1s;
    --animate-repeat: 1;
    --swiper-theme-color: #007aff;
    text-align: left;
    font-size: 16px;
    color: #222;
    line-height: 24px;
    font-family: Noto Sans KR, sans-serif;
    font-weight: 400;
    letter-spacing: -.5px;
    --main-color: #152348;
    --main-light-color: #e5edf8;
    --full-height: 817px;
    --full-width: 1301px;
    --video-ratio: 0.56338;
    margin: 0;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 12px 10px 10px;
    width: 100%;
    height: 110px;
    background: rgb(243, 232, 232);
    border-top: 1px solid rgb(228, 20, 20);
    border-bottom: 1px solid #eee;
    z-index: 100;
}

.cht_input {
    -webkit-text-size-adjust: none;
    --animate-duration: 1s;
    --animate-delay: 1s;
    --animate-repeat: 1;
    --swiper-theme-color: #007aff;
    --main-color: #152348;
    --main-light-color: #e5edf8;
    --full-height: 817px;
    --full-width: 1301px;
    --video-ratio: 0.56338;
    font-family: Noto Sans KR, sans-serif;
    background-color: #fff;
    vertical-align: middle;
    box-sizing: border-box;
    -webkit-appearance: none;
    margin: 1px 0;
    padding: 0 12px;
    width: 100%;
    height: 40px;
    font-size: 14px;
    color: #777;
    border: 0;
    overflow: hidden;
    border-radius: 0;
    line-height: 40px;
}

.btnSend {
    -webkit-text-size-adjust: none;
    --animate-duration: 1s;
    --animate-delay: 1s;
    --animate-repeat: 1;
    --swiper-theme-color: #007aff;
    --main-color: #152348;
    --main-light-color: #e5edf8;
    --full-height: 817px;
    --full-width: 1301px;
    --video-ratio: 0.56338;
    font-family: Noto Sans KR, sans-serif;
    vertical-align: middle;
    box-sizing: border-box;
    border-radius: 0;
    -webkit-appearance: none;
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 40px;
    font-size: 14px;
    color: #333;
    background: none;
    border: 1;
}

</style>
