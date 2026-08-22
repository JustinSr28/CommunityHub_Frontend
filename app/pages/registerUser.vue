<template>
  
  <div class="events-page">
    
    <h1 class="title"> Register </h1>
    
    <div class="formulario-seccion">
      <Transition name="fade">
        <div class="formulario-seccion">
          <UsersForm :user-inicial="null" @guardar="guardarUser" />
        </div>
      </Transition>
    </div>

    <button type="button" class="volver-login" @click="volverLogin">Volver al login</button>
  </div>
</template>
<script setup>

definePageMeta({
  layout: "auth"
})

const router = useRouter()

const { register } = useAuth()

const volverLogin = () => {
  router.push("/")
}

const guardarUser = async (data) => {

  try {

    await register(data)

    alert("Usuario registrado correctamente.")

    router.push("/")

  } catch (error) {

    console.log(
      "Error al registrar usuario:",
      error
    )

    alert(
      error?.data?.message ||
      "No se pudo registrar el usuario."
    )
  }
}

</script>

<style scoped>
.events-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
}

.title {
  margin-bottom: 25px;
  text-align: center;
}

.formulario-seccion {
  max-width: 650px;
  margin: 0 auto;
  padding: 25px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.volver-login {
  display: block;
  margin: 20px auto 0;
  padding: 10px 18px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background: white;
  color: #334155;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s;
}

.volver-login:hover {
  background: #f8fafc;
  border-color: #94a3b8;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
}

.volver-login:active {
  transform: translateY(0);
}
</style>