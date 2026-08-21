<template>

  <ReloadButton :loading="loading" @reload="loadParticipants" />

  <div class="participants-page">

    <div class="page-header">
      <NuxtLink to="/events" class="btn-back">← Volver a eventos </NuxtLink>
      <h1 class="title">Participantes</h1>
    </div>

    <div v-if="loading" class="state-message"> Cargando participantes... </div>
    <div v-else-if="participants.length === 0" class="state-message"> No hay participantes inscritos. </div>

    <div v-else class="table-container">

      <table class="participants-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo electrónico</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(participant, index) in participants" :key="participant.id">
            <td class="number"> {{ index + 1 }} </td>
            <td>
              <div class="participant-name">
                <div class="avatar"> {{ participant.name?.charAt(0) }} </div>
                <strong>{{ participant.name }}</strong>
              </div>
            </td>
            <td> {{ participant.lastName }}</td>
            <td class="email"> {{ participant.email }} </td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>

</template>

<script setup>

definePageMeta({
  middleware: ["auth", "role"],
  roles: ["organizer"]
})

const route = useRoute()
const eventId = route.params.id

const { loadRegistrationsByEvent, loading: loadingRegistrations } = useRegistrations()
const { users,loadUsers,loading: loadingUsers } = useUsers()

const participants = ref([])

const loading = computed(() => loadingRegistrations.value || loadingUsers.value )

const loadParticipants = async () => {
  await loadUsers()
  const registrations = await loadRegistrationsByEvent(eventId)

  participants.value = registrations
    .map(registration =>
      users.value.find(
        user => user.id == registration.user
      )
    )
    .filter(Boolean)
}

onMounted(async () => {
  await loadParticipants()
})

</script>

<style scoped>
.participants-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 30px 25px;
  font-family: 'Inter', sans-serif;
}

.title {
  margin-bottom: 25px;
  text-align: center;
  color: #12355b;
  font-size: 2rem;
  font-weight: 800;
}

/* ==========================
   TABLA
========================== */
.table-container {
  width: 100%;
  overflow-x: auto;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow:
    0 8px 25px rgba(15, 42, 74, .08);
}

.participants-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 650px;
}

/* ==========================
   ENCABEZADO
========================== */
.participants-table thead {
  background: #12355b;
}

.participants-table th {
  padding: 16px 18px;
  color: #ffffff;
  font-size: .85rem;
  font-weight: 700;
  text-align: left;
  white-space: nowrap;
}

.participants-table th:first-child {
  width: 60px;
  text-align: center;
}

/* ==========================
   FILAS
========================== */
.participants-table tbody tr {
  border-bottom: 1px solid #e5e7eb;
  transition: .2s ease;
}

.participants-table tbody tr:last-child {
  border-bottom: none;
}

.participants-table tbody tr:hover {
  background: #f8fafc;
}

.participants-table td {
  padding: 15px 18px;
  color: #475569;
  font-size: .9rem;
}

.number {
  text-align: center;
  color: #94a3b8 !important;
  font-weight: 700;
}

/* ==========================
   NOMBRE
========================== */
.participant-name {
  display: flex;
  align-items: center;
  gap: 10px;
}

.participant-name strong {
  color: #12355b;
  font-weight: 700;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e8eef7;
  color: #12355b;
  font-size: .85rem;
  font-weight: 800;
}

/* ==========================
   CORREO
========================== */
.email {
  color: #64748b !important;
}

/* ==========================
   MENSAJES
========================== */
.state-message {
  padding: 25px;
  text-align: center;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 14px;
  color: #64748b;
}

.page-header {
  position: relative;
  margin-bottom: 25px;
}

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 15px;
  padding: 9px 15px;
  background: #e8eef7;
  color: #12355b;
  border: 1px solid #cbd5e1;
  border-radius: 9px;
  font-size: .9rem;
  font-weight: 700;
  text-decoration: none;
  transition: all .2s ease;
}

.btn-back:hover {
  background: #12355b;
  color: white;
  border-color: #12355b;
  transform: translateX(-2px);
}

.btn-back:active {
  transform: scale(.97);
}

/* ==========================
   RESPONSIVE
========================== */
@media (max-width: 700px) {
  .participants-page {
    padding: 20px 15px;
  }

  .title {
    font-size: 1.6rem;
  }

  .table-container {
    border-radius: 12px;
  }
}
</style>