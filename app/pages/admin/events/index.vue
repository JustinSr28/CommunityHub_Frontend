<template>
  
  <ReloadButton  :loading="loading"  @reload="loadEvents"/>
  
  <div class="events-page">
  
    <h1 class="title">EVENTS </h1>
  
    <div class="actions">
      <button @click="mostrarFormulario = !mostrarFormulario" class="btn-primary"> {{ mostrarFormulario ? 'Cancelar' : '+ Nuevo Evento' }} </button>
    </div>
  
    <Transition name="fade">
      <div v-if="mostrarFormulario" class="formulario-seccion">
        <EventsForm :event-inicial="eventEnEdicion" @guardar="guardarEvent" @cancelar="cancelarFormulario" />
      </div>
    </Transition>
  
    <div class="toolbar">
      <input v-model="busqueda" class="search-input" type="text" placeholder="🔍 Buscar evento...">
    </div>
   
    <p v-if="loading" class="message"> Cargando eventos... </p>
    <p v-else-if="error" class="message error"> {{ error }} </p>
    <p v-else-if="resultadosFiltrados.length === 0" class="message"> No se encontraron eventos. </p>
   
    <div v-else class="events-grid">
      <div v-for="event in resultadosFiltrados" :key="event.id" class="event-item">
        <EventsCard :event="event" @eliminar="confirmarEliminar(event.id)" @editar="iniciarEdicion(event)" @ver="verEvents" />
      </div>
    </div>
     <p v-if="operationError" class="message error">{{ operationError }}</p>
    
    <div class="event-stats">
      <span> Total: {{ events.length }} eventos </span>
      <span> Mostradas: {{ resultadosFiltrados.length }} </span>
    </div>
  </div>

</template>

<script setup>

definePageMeta({
  middleware: ["auth", "role"],
  roles: ["admin"]
})

import { useEvents } from "~/composables/useEvents"

const router = useRouter()

const { events,loading, error,operationError,loadEvents, addEvent, editEvent,removeEvent } = useEvents()

const mostrarFormulario = ref(false)
const eventEnEdicion = ref(null)

const { busqueda,resultadosFiltrados } = useFiltro( events, ["title"] )


const iniciarEdicion = (event) => {
  eventEnEdicion.value = event
  mostrarFormulario.value = true
}

const cancelarFormulario = () => {
  eventEnEdicion.value = null
  mostrarFormulario.value = false
}

const guardarEvent = async (data) => {
  
  try {
    if (eventEnEdicion.value) {
      await editEvent(
        eventEnEdicion.value.id,
        data
      )
    } else {
      await addEvent(data)
    }
    await loadEvents()
    cancelarFormulario()
  } catch (error) {
    console.log(error)
  }
}

const verEvents = (id) => {
   router.push(`/events/${id}`)
}

const confirmarEliminar = async (id) => {

  try {

    await removeEvent(id)
    await loadEvents()

  } catch (error) {  console.log("Error al eliminar evento:",error)
  }

}

onMounted(async () => {  await loadEvents() })

</script>

<style scoped lang="scss">
.events-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 25px;
}
.title {
  text-align: center;
  color: #12355b;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 30px;
  letter-spacing: .5px;
}
.actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 25px;
}
.btn-primary {
  background: #12355b;
  color: white;
  border: none;
  padding: .75rem 1.5rem;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: .2s;
  &:hover {
    background: #0f2a4a;
    transform: translateY(-2px);
  }
}
.formulario-seccion {
  margin-bottom: 35px;
}
.fade-enter-active,
.fade-leave-active {
  transition: .3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
.toolbar {
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  margin-bottom: 30px;
  box-shadow:
    0 5px 15px rgba(15, 42, 74, .06);
}
.search-input {
  flex: 1;
  padding: .75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: .95rem;
  outline: none;
  &:focus {
    border-color: #12355b;
    box-shadow:
      0 0 0 3px rgba(18, 53, 91, .12);
  }
}
.toolbar select {
  padding: .75rem 1rem;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  background: white;
  color: #334155;
  cursor: pointer;
}
.btn-search {
  background: #12355b;
  color: white;
  border: none;
  border-radius: 10px;
  padding: .75rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: #0f2a4a;
  }
}
.btn-clear {
  background: #f1f5f9;
  color: #334155;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: .75rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: #e2e8f0;
  }
}
.events-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}
.event-item {
  transition: .25s;
  &:hover {
    transform: translateY(-4px);
  }
}
.message {
  text-align: center;
  padding: 40px;
  background: #fff;
  border-radius: 14px;
  color: #64748b;
  border: 1px solid #e2e8f0;
  margin-top: 20px;
}
.error {
  color: #dc2626;
  border-color: #fecaca;
  background: #fef2f2;
}
.event-stats {
  margin-top: 35px;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  color: #475569;
  font-weight: 600;
}
</style>