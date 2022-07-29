<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { ref } from "vue";
import { useCookies } from 'vue3-cookies';

</script>

<template>
    <table class="rankingList">
        <colgroup>
            <col style="width: 60px;"> 
            <col style="width: 120px;"> 
            <col> 
            <col> 
            <col style="width: 150px;"> 
            <col style="width: 150px;"> 
            <col style="width: 150px;"> 
            <col style="width: 80px;"> 
            <col style="width: 80px;"> 
            <col style="width: 80px;">
        </colgroup>
        <thead>
            <tr>
                <th scope="col"></th> 
                <th scope="col">순위</th> 
                <th scope="col" colspan="2">레이팅</th> 
                <th scope="col">승</th> 
                <th scope="col">패</th> 
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</template>

<style scoped>
@media (min-width: 1024px) {}

.rankingList {
    -webkit-text-size-adjust: none;
    --animate-duration: 1s;
    --animate-delay: 1s;
    --animate-repeat: 1;
    --swiper-theme-color: #007aff;
    text-align: left;
    color: #222;
    line-height: 30px;
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
    font-size: 16px;
    border-top: 1px solid #3e4452;
    table-layout: fixed;
}


</style>