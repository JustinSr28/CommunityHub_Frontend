<template>

  <div class="favorites-page">
    <div class="favorites-header">
      <div>
        <h1>Mis favoritos</h1>
      </div>
      <ReloadButton :loading="loadingFavoritos"@reload="loadMyFavoriteEvents" />
    </div>

   
    <div v-if="loadingFavoritos" class="state-message loading-state">
      <h2>Cargando favoritos...</h2>
      <p>Estamos buscando tus eventos guardados.</p>
    </div>


    <div v-else-if="favoriteEvents.length === 0" class="state-message empty-state">
      <h2>Aún no tienes favoritos</h2>
    </div>

    <div v-else class="events-grid">
      <div v-for="event in favoriteEvents" :key="event.id" class="event-item">
        <EventsCard :event="event" modo="favoritos" :es-favorito="true" @toggle-favorito="handleToggleFavorito"/>
      </div>
    </div>

  </div>
</template>

<script setup>

definePageMeta({
  middleware: ["auth", "role"],
  roles: ["user"]
})

const {
  favoriteEvents,
  loadingFavoritos,
  loadMyFavorites,
  handleToggleFavorito
} = useFavorites()

const loadMyFavoriteEvents = async () => {
  await loadMyFavorites()
}

onMounted(async () => {
  await loadMyFavoriteEvents()
})

</script>

<style scoped>

.favorites-page {
  width: 100%;
  max-width: 1250px;
  margin: 0 auto;
  padding: 35px 30px 50px;
}


.favorites-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 25px;
  border-bottom: 1px solid #e5e7eb;
}

.favorites-subtitle {
  display: block;
  margin-bottom: 6px;
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.favorites-header h1 {
  margin: 0;
  color: #111827;
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.favorites-header h1 span {
  font-size: 1.8rem;
}

.favorites-header p {
  margin: 8px 0 0;
  color: #64748b;
  font-size: 0.95rem;
}

.favorites-counter {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  padding: 10px 18px;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 12px;
}

.counter-icon {
  font-size: 1.3rem;
}

.favorites-counter div {
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.favorites-counter strong {
  color: #c2410c;
  font-size: 1.1rem;
}

.favorites-counter span {
  color: #9a3412;
  font-size: 0.9rem;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(300px, 1fr)
  );
  gap: 24px;
}

.event-item {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.event-item:hover {
  transform: translateY(-5px);
}


.state-message {
  max-width: 600px;
  margin: 60px auto;
  padding: 45px 30px;
  text-align: center;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  box-shadow: 0 8px 25px rgba(15, 23, 42, 0.06);
}

.state-message h2 {
  margin: 15px 0 8px;
  color: #1f2937;
  font-size: 1.3rem;
  font-weight: 700;
}

.state-message p {
  max-width: 420px;
  margin: 0 auto;
  color: #64748b;
  line-height: 1.6;
}



.empty-state {
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  box-shadow: none;
}

.empty-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 75px;
  margin: 0 auto;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #94a3b8;
  font-size: 2.4rem;
}


.loading-state {
  background: #f8fafc;
}

.loading-icon {
  font-size: 2rem;
  animation: pulse 1.2s ease-in-out infinite;
}

</style>