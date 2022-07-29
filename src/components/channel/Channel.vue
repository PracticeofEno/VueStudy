<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import io from "socket.io-client"
import { ref } from "vue";
import ChList from "./ChList.vue";

const props = defineProps({
    hide: Boolean
})

</script>

<template>
    <ChList/>
    <div v-if="hide" class="channel_box">
        <button type="button" class="channel_create"> 채널 보기</button>
        <button type="button" class="channel_create"> 채널 생성 </button>
    </div>
</template>



<style scoped>

.channel_create {
    margin-left: 20px;
    width: 25%;
    height: 40px;
    border-radius: 8px;
}

.channel_box {
    margin-top: -42px;
    height: 100px;
    background: rgb(52, 42, 143);
}




</style>
