<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import io from "socket.io-client"
import { ref } from "vue";

const props = defineProps({
})

interface channel_item {
    name: String,
};

let items: channel_item[];

</script>

<template>
    <div class="channel_list">
        <div v-for="item in items"> {{`${item.name} 입니다`}} </div>
    </div>
</template>



<style scoped>

.channel_list {
    margin-left: -500px;
    width: 500px;
    height: 500px;
    border-radius: 8px;
    background-color: aqua;
    float: left;
}
</style>
