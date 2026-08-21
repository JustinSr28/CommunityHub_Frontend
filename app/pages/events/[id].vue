<template>

  <div v-if="route.path === `/events/${route.params.id}`">

    <ReloadButton :loading="loading" @reload="loadEvent(route.params.id)" />
    <div v-if="loading" class="message"> Cargando... </div>
    <div v-else-if="!event" class="message"> Evento no encontrado. </div>

    <div v-else class="event-detail">
      <div class="contenido-detalle">
       
        <div class="header">
          <div class="event-icon"> 📅 </div>

          <div>
            <h1>{{ event.title }}</h1>
            <span class="status">{{ event.status }} </span>
          </div>

        </div>
       
        <div class="description">
          <h2>Descripción</h2>
          <p> {{ event.description }} </p>
        </div>
     
        <div class="detalle">

          <div class="info">
            <span>Categoría</span>
            <strong>{{ event.category }} </strong>
          </div>

          <div class="info">
            <span>Fecha</span>
            <strong>{{ event.date }}</strong>
          </div>

          <div class="info">
            <span>Hora</span>
            <strong> {{ event.time }}  </strong>
          </div>

          <div class="info">
            <span>Ubicación</span>
            <strong> {{ event.location }} </strong>
          </div>

          <div class="info">
            <span>Capacidad máxima</span>
            <strong> {{ event.max_capacity }} personas </strong>
          </div>

          <div class="info">
            <span>Organizador</span>
            <strong> {{ organizerName || 'Sin información' }} </strong>
          </div>

        </div>
       
        <NuxtLink to="/events" class="btn-back"> ← Volver </NuxtLink>
      </div>
    </div>
  </div>
  <NuxtPage />
</template>

<script setup>
definePageMeta({
  middleware: ["auth", "role"],
  roles: ["organizer", "admin"]
})

const route = useRoute()

const { event, loading,error,loadEvent } = useEvents()
const { users,loadUsers } = useUsers()

const organizerName = ref("")

const loadOrganizer = async () => {
  await loadUsers()
  if (!event.value?.organizer) {
    return
  }
  const organizer = users.value.find(
    user => user.id == event.value.organizer
  )
  if (organizer) {
    organizerName.value =
      `${organizer.name} ${organizer.lastName}`
  }
}

onMounted(async () => {
  await loadEvent(route.params.id)
  await loadOrganizer() 
})

</script>

<style scoped>
.event-detail {
  max-width: 900px;
  margin: 30px auto;
  padding: 0 20px;
}
.contenido-detalle {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 35px;
  box-shadow: 0 10px 30px rgba(15, 42, 74, .08);
}
.header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 25px;
  margin-bottom: 25px;
  border-bottom: 1px solid #e5e7eb;
}

.header h1 {
  margin: 0 0 10px;
  color: #12355b;
  font-size: 2rem;
  font-weight: 800;
}

.event-icon {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: #e8eef7;
  font-size: 2rem;
}

.status {
  display: inline-block;
  padding: 5px 13px;
  border-radius: 999px;
  background: #e8eef7;
  color: #12355b;
  font-size: .8rem;
  font-weight: 700;
}

.description {
  margin-bottom: 25px;
  padding: 20px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}

.description h2 {
  margin: 0 0 10px;
  color: #12355b;
  font-size: 1.1rem;
}

.description p {
  margin: 0;
  color: #64748b;
  line-height: 1.6;
}

.detalle {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}

.info span {
  color: #64748b;
  font-size: .85rem;
  font-weight: 600;
}

.info strong {
  color: #12355b;
  font-size: .95rem;
  font-weight: 700;
}


.btn-back {
  display: inline-block;
  margin-top: 30px;
  padding: 11px 20px;
  border-radius: 10px;
  background: #e8eef7;
  border: 1px solid #cbd5e1;
  color: #12355b;
  font-weight: 700;
  text-decoration: none;
  transition: .2s;
}

.btn-back:hover {
  background: #12355b;
  color: white;
  border-color: #12355b;
  transform: translateY(-2px);
}

.message {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  color: #64748b;
}

</style>