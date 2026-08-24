<template>
  <div v-if="user">
    <AdminDashboard v-if="user.role === 'admin'" />
    <OrganizerDashboard v-else-if="user.role === 'organizer'" />
    <UserDashboard v-else-if="user.role === 'user'" />
  </div>
</template>

<script setup>

definePageMeta({
  middleware: ["auth", "role"],
  roles: ["user", "organizer", "admin"]
})

const { user } = useAuth()
</script>

<style scoped>
.message {
  max-width: 600px;
  margin: 50px auto;
  padding: 25px;
  text-align: center;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  color: #64748b;
}
</style>