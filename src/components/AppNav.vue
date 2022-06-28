<script setup lang="ts">
import router from '@/router';

</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/">채널</RouterLink>
        <RouterLink to="/">대전</RouterLink>
        <RouterLink to="/">전적</RouterLink>
        <RouterLink to="/info">내정보</RouterLink>
        <RouterLink to="/about">채팅창</RouterLink>
      </nav>
  </header>
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
@media (min-width: 1024px) {
  nav {
    text-align: left;
    margin-left:0;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 0;
  }
}
</style>