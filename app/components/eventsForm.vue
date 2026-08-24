<script setup>

const props = defineProps({
    eventInicial: Object
})

const emit = defineEmits(["guardar", "cancelar"])

const { user } = useAuth()
const { loadOrganizers } = useUsers()
const { categories, loadCategories } = useCategories()
const {
    selectedPhoto,
    previewPhoto,
    loadingPhoto,
    photoError,
    handlePhotoChange,
    uploadPhoto,
    clearPhoto
} = useSupabase()
const rol = computed(() => user.value?.role)
const esAdmin = computed(() => rol.value === "admin")

const fechaMinima = new Date().toISOString().split('T')[0]

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
        category: "Ingrese una categoría",
        date: "Ingrese la fecha de la actividad",
        time: "Ingrese la hora de la actividad",
        location: "Ingrese la ubicación de la actividad",
        max_capacity: "Ingrese la capacidad máxima",
       

    }
)

const organizers = ref([])

const cargarOrganizers = async () => {

    if (!esAdmin.value) { return}

    try {
        organizers.value = await loadOrganizers()
    } catch (error) {
        console.error("Error al cargar organizadores:", error)
    }
}

const cargarCategorias = async () => {
    try {
        await loadCategories()
    } catch (error) {
        console.error("Error al cargar categorías:", error)
    }
}

watch(
    () => props.eventInicial,
    (event) => {
        clearPhoto()
        if (event) {
            cargar({
                ...event,
                date: event.date
                    ? event.date.split("T")[0]
                    : ""
            })
        } else {
            limpiar()
        }

        limpiarErrores()
    },
    {
        immediate: true
    }
)

onMounted(async () => {

    await Promise.all([
        cargarOrganizers(),
        cargarCategorias()
    ])

})

const enviarFormulario = async () => {

    if (!validar()) {
        console.log( "Errores:", errores)
        return
    }
    try {
        let imageUrl = formulario.image || ""
        if (selectedPhoto.value) {
            imageUrl = await uploadPhoto()
            console.log("Imagen subida:",imageUrl )
        }
        else if (!esEdicion.value) {
            imageUrl = "/images/default-event.png"
        }

        const data = {
            ...formulario,
            image: imageUrl
        }

        emit(
            "guardar",
            data
        )

    } catch (error) {
        console.error( " Error al guardar evento:", error )
    }
}

const cancelar = () => {
     clearPhoto()

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
                <option value="">Seleccione una categoría </option>

                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }} </option>
            </select>

            <span v-if="errores.category" class="error">{{ errores.category }}</span>
        </div>

        <div class="form-grupo">
            <label>Fecha</label>
            <input v-model="formulario.date" :class="{ 'input-error': errores.date }" type="date" :min="fechaMinima" >
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
            <label>Capacidad</label>
            <input v-model="formulario.max_capacity" :class="{ 'input-error': errores.max_capacity }" type="number" min="0" placeholder="Ej: 30">
            <span v-if="errores.max_capacity" class="error">{{ errores.max_capacity }}</span>
        </div>

        <div class="form-grupo">

    <label>Imagen de la actividad</label>

    <input
        type="file"
        accept="image/*"
        @change="handlePhotoChange"
    >

    <!-- Vista previa de nueva imagen -->
    <div
        v-if="previewPhoto"
        class="photo-preview"
    >

        <img
            :src="previewPhoto"
            alt="Vista previa de la actividad"
        >

    </div>

    <!-- Imagen actual al editar -->
    <div
        v-else-if="formulario.image"
        class="photo-preview"
    >

        <img
            :src="formulario.image"
            alt="Imagen actual de la actividad"
        >

    </div>

    <span
        v-if="photoError"
        class="error"
    >
        {{ photoError }}
    </span>

    <span
        v-if="loadingPhoto"
        class="uploading"
    >
        Subiendo imagen...
    </span>

    <span
        v-if="errores.image && !formulario.image && !selectedPhoto"
        class="error"
    >
        {{ errores.image }}
    </span>

</div>

        <div class="form-grupo">
            <label>Estado</label>
            <select v-model="formulario.status">
                <option value="activo">
                    Activo
                </option>
                <option value="cancelado">
                    cancelado
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
                <option v-for="organizer in organizers" :key="organizer.id" :value="organizer.id"> {{ organizer.name }}
                    {{ organizer.lastName }}
                </option>
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
.photo-preview {
    margin-top: 10px;

    width: 160px;
    height: 120px;

    border-radius: 10px;

    overflow: hidden;

    border: 1px solid #cbd5e1;

    background: #f8fafc;

    box-shadow:
        0 4px 10px rgba(15, 42, 74, 0.08);
}

.photo-preview img {
    width: 100%;
    height: 100%;

    display: block;

    object-fit: cover;
}

.uploading {
    display: block;

    margin-top: 5px;

    color: #64748b;

    font-size: 0.85rem;
}
</style>