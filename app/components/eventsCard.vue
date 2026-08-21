<script setup>
const props = defineProps({
  event: Object,
  showActions: {
    type: Boolean,
    default: true
  },
  modo: {
    type: String,
    default: "disponibles"
  },
  esFavorito: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["ver", "editar", "eliminar", "ver-usuarios", "inscribir", "cancelar-inscripcion", "toggle-favorito"])

const { user } = useAuth()
const rol = computed(() => user.value?.role)

</script>

<template>

  <article class="event-card">

    <div class="event-card__header">
      <h2>{{ event.title }}</h2>
  
      <button v-if="rol === 'user'" class="favorite" :class="{ 'favorite--active': esFavorito }" @click="$emit('toggle-favorito', event)"
        :aria-label="esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'"> {{ esFavorito ? '⭐' : '☆' }}
      </button>
    </div>

    <div class="event-info">

      <div class="info-item">
        <span>Fecha</span>
        <strong>{{ event.date }}</strong>
      </div>

      <div class="info-item">
        <span>Hora</span>
        <strong>{{ event.time }}</strong>
      </div>

      <div class="info-item">
        <span>Ubicación</span>
        <strong>{{ event.location }}</strong>
      </div>

    </div>

    <div v-if="showActions && (rol === 'admin' || rol === 'organizer')" class="event-actions">
      <button class="btn-view" @click="$emit('ver', event.id)"> 👁️ </button>
      <button class="btn-edit" @click="$emit('editar', event)"> ✏️ </button>
      <button class="btn-delete" @click="$emit('eliminar', event.id)"> 🗑️ </button>
    </div>

    <div v-if="showActions && rol === 'user'" class="event-actions">
      <button v-if="modo === 'disponibles'" class="btn-register" @click="$emit('inscribir', event.id)"> 📝 Inscribirse
      </button>
      <button v-if="modo === 'mis-eventos'" class="btn-delete" @click="$emit('cancelar-inscripcion', event.id)">Cancelar inscripción</button>
    </div>

    <button v-if="showActions && rol === 'organizer'" class="btn-users" @click="$emit('ver-usuarios', event.id)"> 👥 Ver usuarios </button>
  
  </article>

</template>

<style scoped lang="scss">
.event-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 18px;
  border: 1px solid #e2e8f0;
  box-shadow:
    0 8px 25px rgba(15, 42, 74, .08);
  transition: .25s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow:
      0 14px 35px rgba(15, 42, 74, .15);
  }
}

.event-card__header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  min-height: 50px;
}

.favorite {
  position: absolute;
  right: 0;
  top: 0;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #94a3b8;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  transition:
    transform .2s ease,
    background .2s ease,
    border-color .2s ease,
    box-shadow .2s ease;
}

.favorite:hover {
  transform: scale(1.1);
  background: #fff7ed;
  border-color: #fed7aa;
  box-shadow: 0 4px 12px rgba(0, 0, 0, .08);
}

.favorite:active {
  transform: scale(.9);
}

.favorite--active {
  background: #fff7ed;
  border-color: #fbbf24;
  color: #f59e0b;
  box-shadow: 0 4px 12px rgba(245, 158, 11, .18);
}

.favorite--active:hover {
  background: #ffedd5;
  border-color: #f59e0b;
  transform: scale(1.12);
}

.event-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
}

h2 {
  text-align: center;
  color: #12355b;
  font-size: 1.5rem;
  margin: 15px 45px 20px;
  font-weight: 800;
}

.event-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;

  span {
    color: #64748b;
    font-size: .9rem;
    font-weight: 600;
  }

  strong {
    color: #12355b;
    font-size: .95rem;
    font-weight: 700;
    text-align: right;
  }
}

.event-actions {
  display: flex;
  gap: 12px;
  margin-top: 25px;
}

.btn-view {
  flex: 1;
  padding: 11px 15px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  background: #e8eef7;
  color: #12355b;
  font-weight: 700;
  cursor: pointer;
  transition: all .2s;

  &:hover {
    background: #12355b;
    color: white;
    border-color: #12355b;
  }

  &:active {
    transform: scale(.96);
  }
}

.btn-edit {
  flex: 1;
  padding: 11px 15px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  background: #e8eef7;
  color: #12355b;
  font-weight: 700;
  cursor: pointer;
  transition: all .2s;

  &:hover {
    background: #12355b;
    color: white;
    border-color: #12355b;
  }

  &:active {
    transform: scale(.96);
  }
}

.btn-delete {
  flex: 1;
  padding: 11px 15px;
  border-radius: 10px;
  border: 1px solid #fecaca;
  background: #fff1f2;
  color: #dc2626;
  font-weight: 700;
  cursor: pointer;
  transition: all .2s;

  &:hover {
    background: #dc2626;
    color: white;
    border-color: #dc2626;
  }

  &:active {
    transform: scale(.96);
  }
}

.btn-users {
  width: 100%;
  margin-top: 12px;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background: #ebeef3;
  color: rgb(2, 8, 34);
  font-weight: 700;
  cursor: pointer;
  transition: .2s;

  &:hover {
    transform: translateY(-2px);
  }
}

.btn-register {
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  font-size: .9rem;
  font-weight: 700;
  cursor: pointer;
  background: #e8eef7;
  color: #12355b;
  border: 1px solid #cbd5e1;
  transition: .2s;

  &:hover {
    background: #12355b;
    color: white;
  }
}
</style>