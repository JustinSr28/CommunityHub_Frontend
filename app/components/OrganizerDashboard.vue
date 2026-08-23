<template>
  <div>
    <h1>Panel de organizador</h1>

    <p v-if="loading">Cargando estadísticas...</p>
    <p v-else-if="error">{{ error }}</p>

    <div v-else-if="organizerStats" class="stats-grid">
      <div class="stat-card">
        <span class="stat-value">{{ organizerStats.totalCreated }}</span>
        <span class="stat-label">Actividades creadas</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{{ organizerStats.upcoming }}</span>
        <span class="stat-label">Actividades próximas</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{{ organizerStats.cancelled }}</span>
        <span class="stat-label">Actividades canceladas</span>
      </div>
    </div>

    <table v-if="organizerStats" class="events-table">
      <thead>
        <tr>
          <th>Actividad</th>
          <th>Fecha</th>
          <th>Participantes</th>
          <th>Capacidad disponible</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in organizerStats.events" :key="event.id">
          <td>{{ event.title }}</td>
          <td>{{ event.date }}</td>
          <td>{{ event.participantCount }}</td>
          <td>{{ event.availableCapacity }}</td>
          <td>{{ event.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const { organizerStats, loading, error, loadOrganizerStats } = useDashboard()

onMounted(() => {
  loadOrganizerStats()
})
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin: 24px 0;
}

.stat-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 20px;
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: 700;
}

.stat-label {
  display: block;
  color: #64748b;
  font-size: 0.9rem;
  margin-top: 4px;
}

.events-table {
  width: 100%;
  border-collapse: collapse;
}

.events-table th,
.events-table td {
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #e5e7eb;
}
</style>