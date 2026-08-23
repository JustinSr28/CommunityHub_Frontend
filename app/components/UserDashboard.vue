<template>
  <div class="dashboard">
    <h1 class="dashboard-title">Mi panel</h1>

    <p v-if="loading" class="state-message">Cargando...</p>
    <p v-else-if="error" class="state-message error">{{ error }}</p>

    <template v-else-if="userStats">
      <section class="panel-section">
        <h2 class="section-title">Próximas actividades</h2>
        <div v-if="userStats.upcoming.length" class="event-list">
          <div v-for="event in userStats.upcoming" :key="event.id" class="event-card">
            <span class="event-title">{{ event.title }}</span>
            <span class="event-date">{{ event.date }}</span>
          </div>
        </div>
        <p v-else class="empty-message">No tienes actividades próximas.</p>
      </section>

      <section class="panel-section">
        <h2 class="section-title">Actividades inscritas</h2>
        <div v-if="userStats.registered.length" class="event-list">
          <div v-for="event in userStats.registered" :key="event.id" class="event-card">
            <span class="event-title">{{ event.title }}</span>
          </div>
        </div>
        <p v-else class="empty-message">No estás inscrito en ninguna actividad.</p>
      </section>

      <section class="panel-section">
        <h2 class="section-title">Favoritos</h2>
        <div v-if="userStats.favorites.length" class="event-list">
          <div v-for="event in userStats.favorites" :key="event.id" class="event-card">
            <span class="event-title">{{ event.title }}</span>
          </div>
        </div>
        <p v-else class="empty-message">No tienes favoritos guardados.</p>
      </section>

      <section class="panel-section">
        <h2 class="section-title">Historial</h2>
        <div v-if="userStats.history.length" class="event-list">
          <div v-for="event in userStats.history" :key="event.id" class="event-card muted">
            <span class="event-title">{{ event.title }}</span>
            <span class="event-date">{{ event.date }}</span>
          </div>
        </div>
        <p v-else class="empty-message">Sin historial todavía.</p>
      </section>

      <section class="panel-section">
        <h2 class="section-title">Notificaciones</h2>
        <div class="event-card pending-card">
          <span class="pending-badge">Próximamente</span>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
const { userStats, loading, error, loadUserStats } = useDashboard()

onMounted(() => {
  loadUserStats()
})
</script>

<style scoped>
.dashboard {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 24px;
}

.dashboard-title {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 24px;
  color: #0f172a;
}

.state-message {
  color: #64748b;
  font-size: 0.95rem;
}

.state-message.error {
  color: #dc2626;
}

.panel-section {
  margin-bottom: 28px;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e2e8f0;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.event-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 14px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.15s ease;
}

.event-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.event-card.muted {
  background: #f8fafc;
  color: #64748b;
}

.event-title {
  font-weight: 600;
  color: #0f172a;
}

.event-card.muted .event-title {
  font-weight: 500;
  color: #64748b;
}

.event-date {
  font-size: 0.85rem;
  color: #64748b;
  white-space: nowrap;
  margin-left: 16px;
}

.empty-message {
  color: #94a3b8;
  font-size: 0.9rem;
  padding: 14px 18px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px dashed #e2e8f0;
}

.pending-card {
  background: #f8fafc;
  border-style: dashed;
  justify-content: flex-start;
  gap: 12px;
}

.pending-badge {
  background: #e0e7ff;
  color: #4338ca;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 4px 10px;
  border-radius: 999px;
}

.muted-text {
  color: #94a3b8;
  font-weight: 400;
  font-style: italic;
}
</style>