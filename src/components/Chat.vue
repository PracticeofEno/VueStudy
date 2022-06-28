<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount } from "@vue/runtime-core";
import io from "socket.io-client"

const props = defineProps<{
  msg: any;
}>()

let socket: any;
let message: any;

onBeforeMount(async () => { 
    socket = props.msg;
    socket.on('connect', function() {
        console.log('Connected');
        socket.emit('events', { test: 'test' });
        socket.emit('identity', 999, response =>
          console.log('Identity:', response),
        );
      });
    socket.on('events', function(data) {
        console.log('event', data);
    });
})

async function chatSend() {
    console.log("chatsend start");
    socket = props.msg;
    socket.on('connect', function() {
        console.log('Connected');
        socket.emit('events', { test: 'test' });
        socket.emit('identity', 999, response =>
          console.log('Identity:', response),
        );
      });
    socket.on('events', function(data) {
        console.log('event', data);
    });
    console.log("chatsend end");
}

</script>

<template>
    <div class="live_right_area">
        <div class="live_right_box">
            <div class="liveTabCon_font_size_14">
                <div class="castChat" style="height: calc(100% - 196px);">
                    <div>
                        <div class="cht_al cht_al_co cht_al_4">
                            <div class="cht_box">abcedef</div>
                        </div>
                    </div>
                    <div>
                        <div class="cht_al cht_al_co cht_al_5">
                            <div class="cht_box">haha.</div>
                        </div>
                    </div>
                    <div>
                        <div class="cht_al cht_al_1">
                            <div class="cht_box">cc.</div>
                        </div>
                    </div>
                </div>
                <div class="cht_effect">
                    <!---->
                </div>
                <!---->
            </div>
        </div>
        <div class="cht_bot_wrap">
            <div class="chtSend">
                <textarea v-model="message" placeholder="채팅하기" class="cht_input"></textarea>
                <input type="button" @click="chatSend" value="보내기" class="btnSend">
            </div>
        </div>
    </div>
</template>



<style scoped>
.live_right_area {
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

.live_right_box {
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
}

.liveTabCon_font_size_14 {
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
    background: #fff;
    border-top: 1px solid #eee;
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
    resize: none;
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
    width: 55px;
    height: 40px;
    font-size: 14px;
    color: #333;
    background: none;
    border: 0;
}
</style>
