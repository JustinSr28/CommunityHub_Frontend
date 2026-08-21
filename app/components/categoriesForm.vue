<script setup>
const props = defineProps({
    categoryInicial: Object
})

const emit = defineEmits(["guardar", "cancelar"])

const esEdicion = computed(() => !!props.categoryInicial)

const { formulario, cargar, limpiar } = useForm({ name: "", description: "" })

const { errores, validar, limpiarErrores } = useValidation(
    formulario,
    {
        name: "Ingrese el nombre de la categoría",
        description: "Ingrese la descripción de la categoría"
    }
)

watch(
    () => props.categoryInicial,
    (category) => {
        if (category) {
            cargar(category)
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
    <form @submit.prevent="enviarFormulario" class="category-form">

        <div class="form-grupo">
            <label>Nombre</label>
            <input v-model="formulario.name" :class="{ 'input-error': errores.name }" type="text" placeholder="Ej: Deportes">
            <span v-if="errores.name" class="error"> {{ errores.name }} </span>
        </div>

        <div class="form-grupo">
            <label>Descripción</label>
            <textarea v-model="formulario.description" :class="{ 'input-error': errores.description }" placeholder="Ej: Eventos y actividades deportivas" rows="4"></textarea>
            <span v-if="errores.description" class="error"> {{ errores.description }}</span>
        </div>

        <div class="form-acciones">
            <button class="btn-primary" type="submit"> {{ esEdicion ? 'Actualizar' : 'Crear' }} </button>
            <button type="button" class="btn-secondary" @click="cancelar">Cancelar </button>
        </div>

    </form>
</template>

<style scoped lang="scss">
.category-form {
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