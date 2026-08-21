<script setup>

const props = defineProps({
    eventInicial: Object
})

const emit = defineEmits(["guardar", "cancelar"])

const { user } = useAuth()
const rol = computed(() => user.value?.role)
const esAdmin = computed(() => rol.value === "admin")

const esEdicion = computed(() => !!props.eventInicial)

const { formulario, cargar, limpiar } = useForm({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    location: "",
    max_capacity: 0,
    image: "",
    organizer: "",
    status: "pendiente"
})

const { errores, validar, limpiarErrores } = useValidation(
    formulario,
    {
        title: "Ingrese el título de la actividad",
        description: "Ingrese la descripción de la actividad",
        category: "Seleccione una categoría",
        date: "Ingrese la fecha de la actividad",
        time: "Ingrese la hora de la actividad",
        location: "Ingrese la ubicación de la actividad",
        max_capacity: "Ingrese la capacidad máxima",
        image: "Ingrese una imagen"
    }
)

const organizers = ref([])

const cargarOrganizers = async () => {
    if (!esAdmin.value) {
        return
    }
   
    organizers.value = [
        {
            id: 1,
            name: "Sheyla Murillo"
        },
        {
            id: 2,
            name: "Carlos Rodríguez"
        },
        {
            id: 3,
            name: "María López"
        }
    ]
}

watch(
    () => props.eventInicial,
    (event) => {
        if (event) {
            cargar(event)
        } else {
            limpiar()
            formulario.status = "pendiente"
        }
        limpiarErrores()
    },
    {
        immediate: true
    }
)

onMounted(async () => {
    await cargarOrganizers()
})

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
    <form @submit.prevent="enviarFormulario" class="event-form">
       
        <div class="form-grupo">
            <label>Título de la actividad</label>
            <input v-model="formulario.title" :class="{ 'input-error': errores.title }" type="text" placeholder="Ej: Workshop de Node.js">
            <span v-if="errores.title" class="error"> {{ errores.title }} </span>
        </div>

        <div class="form-grupo">
            <label>Descripción</label>
            <textarea v-model="formulario.description" :class="{ 'input-error': errores.description }" placeholder="Describa la actividad..." rows="4"></textarea>
            <span v-if="errores.description" class="error">{{ errores.description }}</span>
        </div>

        <div class="form-grupo">
            <label>Categoría</label>
            <select v-model="formulario.category" :class="{ 'input-error': errores.category }">
                <option value="">
                    Seleccione una categoría
                </option>
                <option value="Tecnología">
                    Tecnología
                </option>
                <option value="Deportes">
                    Deportes
                </option>
                <option value="Cultura">
                    Cultura
                </option>
                <option value="Educación">
                    Educación
                </option>
                <option value="Arte">
                    Arte
                </option>
                <option value="Comunidad">
                    Comunidad
                </option>
            </select>

            <span v-if="errores.category" class="error"> {{ errores.category }}</span>
        </div>

        <div class="form-grupo">
            <label>Fecha</label>
            <input v-model="formulario.date" :class="{ 'input-error': errores.date }" type="date">
            <span v-if="errores.date" class="error">{{ errores.date }} </span>
        </div>

        <div class="form-grupo">
            <label>Hora</label>
            <input v-model="formulario.time" :class="{ 'input-error': errores.time }" type="time">
            <span v-if="errores.time" class="error">{{ errores.time }}</span>
        </div>

        <div class="form-grupo">
            <label>Ubicación</label>
            <input v-model="formulario.location" :class="{ 'input-error': errores.location }" type="text" placeholder="Ej: UTN San Carlos">
            <span v-if="errores.location" class="error">{{ errores.location }}</span>
        </div>

        <div class="form-grupo">
            <label>Capacidad máxima</label>
            <input v-model="formulario.max_capacity" :class="{ 'input-error': errores.max_capacity }" type="number" min="1" placeholder="Ej: 30">
            <span v-if="errores.max_capacity" class="error">{{ errores.max_capacity }}</span>
        </div>

        <div class="form-grupo">
            <label>Imagen</label>
            <input v-model="formulario.image" :class="{ 'input-error': errores.image }" type="text" placeholder="URL de la imagen">
            <span v-if="errores.image" class="error">{{ errores.image }} </span>
        </div>
        
        <div class="form-grupo">
            <label>Estado</label>
            <select v-model="formulario.status">
                <option value="pendiente">
                    Pendiente
                </option>
                <option value="activo">
                    Activo
                </option>
                <option value="finalizado">
                    Finalizado
                </option>
            </select>
        </div>

        <div v-if="esAdmin" class="form-grupo">
            <label>Organizador</label>
            <select v-model="formulario.organizer">
                <option value=""> Seleccione un organizador </option>
                <option v-for="organizer in organizers" :key="organizer.id" :value="organizer.id"> {{ organizer.name }} </option>
            </select>
        </div>

        <div class="form-acciones">
            <button class="btn-primary" type="submit"> {{ esEdicion ? 'Actualizar' : 'Crear' }} </button>
            <button type="button" class="btn-secondary" @click="cancelar"> Cancelar</button>
        </div>

    </form>

</template>

<style scoped lang="scss">
.event-form {
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