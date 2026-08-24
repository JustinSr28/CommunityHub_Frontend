<template>
  <NuxtPwaManifest />
<div v-if="isOffline" class="offline-banner" >Sin conexión. Mostrando actividades guardadas. </div>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>

import { useOffline} from "~/composables/useOffline"
const { isOffline } = useOffline()


</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

html,
body {
  font-family: 'Inter', sans-serif;
}
.offline-banner {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  margin-bottom: 20px;

  background: #fff3cd;
  border: 1px solid #ffda6a;
  border-radius: 10px;

  color: #664d03;
  font-size: 14px;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

</style>