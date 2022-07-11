<script setup lang="ts">

</script>

<template>
<QRCodeVue3 class="about"
          value="Simple QR code"
        />
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>