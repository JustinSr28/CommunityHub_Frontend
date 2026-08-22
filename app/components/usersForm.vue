<script setup>

const props = defineProps({
    userInicial: Object
})

const emit = defineEmits(["guardar", "cancelar"])

const esEdicion = computed(() => !!props.userInicial)

const { user } = useAuth()
const esAdmin = computed(() => { return user.value?.role === "admin" })

const { formulario, cargar, limpiar } = useForm({
    name: "", lastName: "", email: "", password: "", urlPhoto: "", role: "user",
    status: "active"
})

const { errores, validar, limpiarErrores } = useValidation(
    formulario,
    {
        name: "Ingrese el nombre del usuario",
        lastName: "Ingrese el apellido del usuario",
        email: "Ingrese el correo electrónico",
        password: "Ingrese la contraseña",
        urlPhoto: "Ingrese la URL de la foto",
        role: "Seleccione un rol",
        status: "Seleccione el estado del usuario"
    }
)

watch(
    () => props.userInicial,
    (user) => {
        if (user) {
            cargar(user)
        } else {
            limpiar()
        }
        limpiarErrores()
    },
    {
        immediate: true
    }
)

const enviarFormulario = () => {
    if (!validar()) {
        return
    }
    emit("guardar", {
        ...formulario
    })
}

const cancelar = () => {
    limpiar()
    limpiarErrores()
    emit("cancelar")
}
</script>

<template>

    <form @submit.prevent="enviarFormulario" class="user-form">

        <div class="form-grupo">
            <label>Nombre</label>
            <input v-model="formulario.name" :class="{ 'input-error': errores.name }" type="text" placeholder="Ej: Sheyla">
            <span v-if="errores.name" class="error">{{ errores.name }}</span>
        </div>

        <div class="form-grupo">
            <label>Apellido</label>
            <input v-model="formulario.lastName" :class="{ 'input-error': errores.lastName }" type="text" placeholder="Ej: Murillo">
            <span v-if="errores.lastName" class="error">{{ errores.lastName }}</span>
        </div>

        <div class="form-grupo">
            <label>Correo electrónico</label>
            <input v-model="formulario.email" :class="{ 'input-error': errores.email }" type="email" placeholder="Ej: sheyla@example.com">
            <span v-if="errores.email" class="error">{{ errores.email }}</span>
        </div>

        <div class="form-grupo">
            <label>Contraseña</label>
            <input v-model="formulario.password" :class="{ 'input-error': errores.password }" type="password" placeholder="Ingrese una contraseña">
            <span v-if="errores.password" class="error">{{ errores.password }}</span>
        </div>

        <div class="form-grupo">
            <label>Foto de perfil</label>
            <input v-model="formulario.urlPhoto" :class="{ 'input-error': errores.urlPhoto }" type="text" placeholder="URL de la foto">
            <span v-if="errores.urlPhoto" class="error">{{ errores.urlPhoto }}</span>
        </div>

        <div v-if="esAdmin" class="form-grupo">
            <label>Rol</label>
            <select v-model="formulario.role" :class="{ 'input-error': errores.role }">
                <option value="">Seleccione un rol</option>
                <option value="user">Usuario</option>
                <option value="organizer">Organizador</option>
                <option value="admin">Administrador</option>
            </select>
            <span v-if="errores.role" class="error">{{ errores.role }}</span>
        </div>

        <div v-if="esAdmin" class="form-grupo">
            <label>Estado</label>
            <select v-model="formulario.status" :class="{ 'input-error': errores.status }">
                <option value="">Seleccione un estado</option>
                <option value="active">activo</option>
                <option value="inactive">inactivo</option>
            </select>
            <span v-if="errores.status" class="error">{{ errores.status }}</span>
        </div>

        <div class="form-acciones">
            <button class="btn-primary" type="submit"> {{ esEdicion ? 'Actualizar' : 'Crear' }} </button>
            <button type="button" class="btn-secondary" @click="cancelar">Cancelar </button>
        </div>

    </form>
</template>

<style scoped lang="scss">
.user-form {
    max-width: 600px;
    margin: 30px auto;
    padding: 30px;
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    box-shadow:
        0 8px 25px rgba(15, 42, 74, 0.08);
}
.form-grupo {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.3rem;
    label {
        font-weight: 700;
        color: #1e293b;
        font-size: .95rem;
    }
    input,
    select,
    textarea {
        width: 100%;
        padding: .75rem .9rem;
        border: 1px solid #cbd5e1;
        border-radius: 10px;
        font-size: .95rem;
        font-family: inherit;
        outline: none;
        background: #fff;
        color: #334155;
        transition: .2s;
        &:focus {
            border-color: #12355b;
            box-shadow:
                0 0 0 3px rgba(18, 53, 91, .12);
        }
        &::placeholder {
            color: #94a3b8;
        }
    }
    textarea {
        resize: vertical;
        min-height: 100px;
    }
}
.form-acciones {
    display: flex;
    justify-content: flex-end;
    gap: .8rem;
    margin-top: 25px;
    padding-top: 20px;
    border-top: 1px solid #e2e8f0;
}
.btn-primary {
    padding: .75rem 1.5rem;
    border-radius: 10px;
    border: none;
    background: #12355b;
    color: white;
    font-weight: 700;
    cursor: pointer;
    transition: .2s;
    &:hover {
        background: #0f2a4a;
    }
    &:active {
        transform: scale(.97);
    }
}
.btn-secondary {
    padding: .75rem 1.5rem;
    border-radius: 10px;
    background: #f1f5f9;
    color: #334155;
    border: 1px solid #cbd5e1;
    font-weight: 600;
    cursor: pointer;
    transition: .2s;
    &:hover {
        background: #e2e8f0;
    }
    &:active {
        transform: scale(.97);
    }
}
.error {
    color: #dc2626;
    font-size: .85rem;
    margin-top: .25rem;
}
.input-error {
    border-color: #dc2626 !important;
    &:focus {
        border-color: #dc2626 !important;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, .12);
    }
}
</style>