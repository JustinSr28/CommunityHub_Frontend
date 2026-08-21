<template>

  <div class="login-page">

    <div class="login-card">

      <h1>Iniciar sesión</h1>
      
      <div class="form-grupo">
        <label for="email">Correo electrónico</label>
        <input id="email" v-model="email" type="email" placeholder="correo@example.com">
      </div>
      
      <div class="form-grupo">
        <label for="password">Contraseña</label>
        <input id="password" v-model="password" type="password" placeholder="Ingrese su contraseña">
      </div>
      
      <button @click="loginFunction" class="login-btn">Iniciar sesión </button>
      
      <div class="separator">
        <span>o</span>
      </div>
     

      <p class="register-text">
        ¿No tienes una cuenta?
        <NuxtLink to="/registerUser" class="register-link">
          Regístrate
        </NuxtLink>
      </p>

    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "auth"
})
const { login } = useAuth()

const email = ref("")
const password = ref("")

const loginFunction = () => {
  navigateTo("/dashboard")
}

</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8fafc;
}

.login-card {
  width: 380px;
  background: white;
  padding: 3rem;
  border-radius: 24px;
  text-align: center;
  border: 1px solid #e2e8f0;
  box-shadow:
    0 20px 50px rgba(15, 23, 42, .08);
}

.login-card h1 {
  margin-bottom: 2rem;
  color: #0f172a;
  font-size: 2rem;
}

.form-grupo {
  text-align: left;
  margin-bottom: 1.2rem;
}

.form-grupo label {
  display: block;
  margin-bottom: .5rem;
  color: #334155;
  font-weight: 600;
}

.form-grupo input {
  width: 100%;
  box-sizing: border-box;
  padding: .9rem 1rem;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  outline: none;
  transition: .25s;
}

.form-grupo input:focus {
  border-color: #64748b;
  box-shadow: 0 0 0 3px rgba(100, 116, 139, .12);
}

.login-btn {
  width: 100%;
  padding: .9rem 1.2rem;
  margin-top: .5rem;
  border: none;
  border-radius: 12px;
  background: #0f172a;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: .25s;
}

.login-btn:hover {
  background: #1e293b;
  transform: translateY(-2px);
}

.separator {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 1.5rem 0;
  color: #94a3b8;
}

.separator::before,
.separator::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

.separator span {
  font-size: .9rem;
}

.google-btn {
  width: 100%;
  padding: .9rem 1.2rem;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  background: white;
  color: #334155;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: .25s;
}

.google-btn:hover {
  background: #f8fafc;
  border-color: #94a3b8;
  transform: translateY(-2px);
  box-shadow:
    0 8px 18px rgba(0, 0, 0, .08);
}

.google-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4285f4;
  font-weight: 700;
}

.register-text {
  margin-top: 1.8rem;
  color: #64748b;
  font-size: .95rem;
}

.register-link {
  margin-left: 5px;
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>