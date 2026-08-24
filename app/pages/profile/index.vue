<template>

  <ReloadButton :loading="loading" @reload="recargarPerfil" />

  <form @submit.prevent="guardarPerfil" class="profile-form">

    <h1 class="title">Mi perfil</h1>

    <div class="form-grupo profile-photo">

      <div class="profile-image">
        <img :src="previewPhoto || formulario.urlPhoto || '/images/default-user.png'" :alt="formulario.name">
      </div>


    </div>

    <div class="form-grupo">
      <label>Nombre</label>
      <input v-model="formulario.name" type="text" placeholder="Ingrese su nombre" required>
    </div>

    <div class="form-grupo">
      <label>Apellido</label>
      <input v-model="formulario.lastName" type="text" placeholder="Ingrese su apellido" required>
    </div>

    <div class="form-grupo">
      <label>Correo</label>
      <input :value="formulario.email" type="email" disabled>
    </div>

    <div class="form-grupo">
      <label>Contraseña</label>
      <input v-model="formulario.password" type="password" placeholder="Ingrese su contraseña" required>
    </div>


    <div class="form-grupo">
      <label>Foto de perfil</label>
      <input type="file" accept="image/*" @change="handlePhotoChange">
      <span v-if="photoError" class="error"> {{ photoError }} </span>
    </div>

    <div class="form-acciones">
      <button type="submit" class="btn-primary"> Guardar cambios</button>
    </div>

  </form>

</template>

<script setup>
definePageMeta({
  middleware: ["auth", "role"],
  roles: ["user", "organizer", "admin"]
})

const { user } = useAuth()

const {
  user: userData,
  loading,
  loadUser,
  editUser
} = useUsers()

const {
  selectedPhoto,
  previewPhoto,
  loadingPhoto,
  photoError,
  handlePhotoChange,
  uploadPhoto,
  clearPhoto
} = useSupabase()

const formulario = ref({
  name: "",
  lastName: "",
  email: "",
  password: "",
  urlPhoto: ""
})

const imagenDefault = "/images/default-user.png"

const cargarPerfil = async () => {

  if (!user.value) return

  await loadUser(user.value.id)

  if (userData.value) {

    formulario.value = {
      name: userData.value.name || "",
      lastName: userData.value.lastName || "",
      email: userData.value.email || "",
      password: "",
      urlPhoto: userData.value.urlPhoto || imagenDefault
    }
  }
}

const recargarPerfil = async () => {
  clearPhoto()
  await cargarPerfil()
}

const guardarPerfil = async () => {

  if (!userData.value) return

  try {

    let photoUrl = formulario.value.urlPhoto || imagenDefault
    if (selectedPhoto.value) {

      photoUrl = await uploadPhoto()

      if (!photoUrl) {
        photoUrl = imagenDefault
      }
    }

    await editUser(
      userData.value.id,
      {
        name: formulario.value.name,
        lastName: formulario.value.lastName,
        password: formulario.value.password,
        urlPhoto: photoUrl
      }
    )
    
    formulario.value.urlPhoto = photoUrl

    clearPhoto()

    alert("Perfil actualizado correctamente.")

  } catch (error) {

    console.error("Error actualizando perfil:", error)

  }
}

onMounted(async () => {
  await cargarPerfil()
})
</script>

<style scoped>
.profile-form {
  max-width: 650px;
  margin: 40px auto;
  padding: 35px;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  box-shadow:
    0 15px 35px rgba(15, 23, 42, .08);
  font-family: 'Inter', sans-serif;
}

.title {
  margin-bottom: 30px;
  text-align: center;
  color: #12355b;
  font-size: 2rem;
  font-weight: 800;
}

.form-grupo {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-bottom: 22px;
}

.form-grupo label {
  color: #334155;
  font-size: .9rem;
  font-weight: 600;
}

.form-grupo input {
  padding: 13px 15px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #0f172a;
  font-size: .95rem;
  font-family: 'Inter', sans-serif;
  transition: .25s;
}

.form-grupo input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow:
    0 0 0 3px rgba(59, 130, 246, .15);
}

.form-grupo input:disabled {
  background: #f1f5f9;
  color: #64748b;
  cursor: not-allowed;
  border-color: #e2e8f0;
}

.profile-photo {
  align-items: center;
}

.profile-photo label {
  align-self: flex-start;
}

.profile-image {
  display: flex;
  justify-content: center;
  margin: 15px 0 20px;
}

.profile-image img {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #dbeafe;
  padding: 3px;
  background: white;
  box-shadow:
    0 8px 20px rgba(37, 99, 235, .15);
}

.form-acciones {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}

.btn-primary {
  padding: 13px 25px;
  border-radius: 10px;
  border: none;
  background: #2f3f63;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: .95rem;
  font-weight: 600;
  cursor: pointer;
  transition: .25s;
}

.btn-primary:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow:
    0 8px 20px rgba(37, 99, 235, .25);
}

.btn-primary:active {
  transform: scale(.97);
}
</style>