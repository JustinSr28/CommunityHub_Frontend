<template>
  <div>
    <h1>Panel de administración</h1>

    <p v-if="loading">Cargando estadísticas...</p>
    <p v-else-if="error">{{ error }}</p>

    <div v-else-if="adminStats" class="stats-grid">
      <div class="stat-card">
        <span class="stat-value">{{ adminStats.totalUsers }}</span>
        <span class="stat-label">Usuarios registrados</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{{ adminStats.totalOrganizers }}</span>
        <span class="stat-label">Organizadores</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{{ adminStats.totalEvents }}</span>
        <span class="stat-label">Actividades</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{{ adminStats.totalRegistrations }}</span>
        <span class="stat-label">Inscripciones</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{{ adminStats.activeEvents }}</span>
        <span class="stat-label">Actividades activas</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{{ adminStats.finishedEvents }}</span>
        <span class="stat-label">Actividades finalizadas</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const { adminStats, loading, error, loadAdminStats } = useDashboard()

onMounted(() => {
  loadAdminStats()
})
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 24px;
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
</style>