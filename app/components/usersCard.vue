<script setup>

const props = defineProps({
  user: Object,
  showActions: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits([ "ver", "editar", "eliminar"])
const { user: authUser } = useAuth()
const rol = computed(() =>  authUser.value?.role)

</script>

<template>
  <article class="user-card">

    <div class="user-card__header">
      <h2>{{ user.name }} {{ user.lastName }}</h2>
    </div>

    <div class="user-info">

      <div class="info-item">
        <span>Email</span>
        <strong>{{ user.email}}</strong>
      </div>

      <div class="info-item">
        <span>Rol</span>
        <strong>{{ user.role }}</strong>
      </div>

    </div>

    <div v-if="showActions && rol === 'admin'" class="user-actions">
      <button class="btn-edit" @click="$emit('editar', user)"> ✏️ </button>
      <button class="btn-delete" @click="$emit('eliminar', user.id)"> 🗑 </button>
    </div>

  </article>
</template>

<style scoped lang="scss">
.user-card {
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
.user-card__header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}
.user-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
}
h2 {
  text-align: center;
  color: #12355b;
  font-size: 1.5rem;
  margin: 15px 0 20px;
  font-weight: 800;
}
.user-info {
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
.user-actions {
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
</style>