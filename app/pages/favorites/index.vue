<template>

  <ReloadButton :loading="loading" @reload="loadMyFavoriteEvents" />

  <div class="favorites-page">

    <h1>Mis favoritos</h1>

    <div v-if="loading" class="state-message"> Cargando eventos favoritos... </div>
    <div v-else-if="favoriteEvents.length === 0" class="state-message">Aún no has marcado eventos como favoritos. </div>
    <div v-else class="events-grid">
      
      <div v-for="event in favoriteEvents" :key="event.id" class="event-item">
        <EventsCard :event="event" modo="favoritos" />
      </div>

    </div>
  </div>
</template>

<script setup>

definePageMeta({
  middleware: ["auth", "role"],
  roles: ["user"]
})


import { useAuth } from "~/composables/useAuth"
import { useUsers } from "~/composables/useUsers"
import { useEvents } from "~/composables/useEvents"

const { user } = useAuth()
const { loadFavoriteEvents } = useUsers()
const { events, loading,error,loadEvents } = useEvents()

const favoriteEvents = ref([])

const loadMyFavoriteEvents = async () => {
  if (!user.value?.id) {
    favoriteEvents.value = []
    return
  }
  try {
   
    await loadEvents()
    const favoriteIds = await loadFavoriteEvents( user.value.id )
    favoriteEvents.value = events.value.filter( event => favoriteIds.includes(event.id) )

  } catch (err) {
    console.log( "Error cargando eventos favoritos:",err )
    favoriteEvents.value = []
  }
}

onMounted(async () => {
  await loadMyFavoriteEvents()
})

</script>

<style scoped>
.favorites-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
}

h1 {
  margin-bottom: 30px;
  text-align: center;
  color: #1f2937;
  font-size: 2rem;
  font-weight: 700;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill,
      minmax(300px, 1fr));
  gap: 24px;
}

.event-item {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.event-item:hover {
  transform: translateY(-4px);
}

.state-message {
  max-width: 600px;
  margin: 40px auto;
  padding: 25px;
  text-align: center;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 14px;
  color: #64748b;
  font-size: 1rem;
}
</style>