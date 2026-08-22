<template>
  <ReloadButton :loading="cargandoMisEventos" @reload="loadMyEvents" />
  <div class="events-page">
    <h1 class="title">EVENTS</h1>

    <div v-if="esOrganizador" class="actions">
      <button @click="mostrarFormulario = !mostrarFormulario" class="btn-primary">
        {{ mostrarFormulario ? 'Cancelar' : '+ Nuevo Evento' }}
      </button>
    </div>


    <Transition name="fade">
      <div v-if="esOrganizador && mostrarFormulario" class="formulario-seccion">
        <EventsForm :event-inicial="eventEnEdicion" @guardar="guardarEvent" @cancelar="cancelarFormulario" />
      </div>
    </Transition>


    <div class="toolbar">
      <input v-model="busqueda" class="search-input" type="text" placeholder="🔍 Buscar evento...">
    </div>

    <div class="filters">

      <select v-model="filters.category">
        <option value=""> Categoría </option>
        <option v-for="category in categories" :key="category.id" :value="category.id"> {{ category.name }} </option>
      </select>

      <input v-model="filters.date" type="date">

      <select v-model="filters.location">
        <option value="">Ubicación </option>
        <option v-for="location in locations" :key="location" :value="location"> {{ location }} </option>
      </select>

      <select v-if="!esUsuario" v-model="filters.availability">
        <option value="">Disponibilidad</option>
        <option value="Disponible">Disponible</option>
        <option value="Lleno">Lleno</option>
      </select>

      <select v-if="!esOrganizador" v-model="filters.organizer">
        <option value=""> Organizador </option>
        <option v-for="organizer in organizers" :key="organizer.id" :value="organizer.id">
          {{ organizer.name }} {{ organizer.lastName }}
        </option>
      </select>

      <button class="btn-search" @click="applyFilters"> Buscar</button>
      <button class="btn-clear" @click="clearFilters"> Limpiar</button>
    </div>

    <p v-if="cargandoMisEventos" class="message"> Cargando eventos... </p>

    <p v-else-if="error" class="message error"> {{ error }} </p>

    <p v-else-if="resultadosFiltrados.length === 0" class="message">
      No se encontraron eventos.
    </p>

    <div v-else class="events-grid">
      <div v-for="event in resultadosFiltrados" :key="event.id" class="event-item">
        <EventsCard :event="event" @eliminar="confirmarEliminar" @editar="iniciarEdicion" @ver="verEvents"
          @ver-usuarios="verUsuarios" @inscribir="inscribir" @toggle-favorito="handleToggleFavorito" />
      </div>
    </div>

    <p v-if="operationError" class="message error"> {{ operationError }} </p>

    <div class="event-stats">
      <span> Total: {{ eventsAMostrar.length }} eventos</span>
      <span>Mostradas: {{ resultadosFiltrados.length }}</span>
    </div>

  </div>
</template>

<script setup>

definePageMeta({
  middleware: ["auth", "role"],
  roles: ["user", "organizer"]
})

import { useEvents } from "~/composables/useEvents"
import { useRegistrations } from "~/composables/useRegistrations"
import { useCategories } from "~/composables/useCategories"
import { useUsers } from "~/composables/useUsers"
const router = useRouter()

const { user } = useAuth()

const rol = computed(() => {  return user.value?.role })
const esOrganizador = computed(() => {return rol.value === "organizer" })
const esUsuario = computed(() => {return rol.value === "user"})

const handleToggleFavorito = async (event) => { }

const { events,loading,error,loadEvents,addEvent,editEvent,removeEvent,getEventsByOrganizer,getAvailableEventsForUser,
  loadLocations,filterEvents, operationError } = useEvents()

const {categories,loadCategories } = useCategories()

const {loadOrganizers } = useUsers()

const {userRegistrations,loadRegistrationsByUser,addRegistration } = useRegistrations()

const mostrarFormulario = ref(false)
const eventEnEdicion = ref(null)

const eventsAMostrar = computed(() => {return events.value })
const { busqueda, resultadosFiltrados} = useFiltro(  eventsAMostrar,["title"] )

const filters = reactive({
  category: "",
  date: "",
  location: "",
  availability: "",
  organizer: ""
})

const organizers = ref([])
const locations = ref([])


const cargarDatosFiltros = async () => {
  try {
    const [ organizersData, locationsData] = await Promise.all([
      loadOrganizers(),
      loadLocations()
    ])

    organizers.value = organizersData || []
    locations.value = locationsData || []
    await loadCategories()
  } catch (error) {
    console.error( "Error al cargar filtros:",error)
  }
}

const applyFilters = async () => {
  try {
    const filtros = {
      category: filters.category,
      date: filters.date,
      location: filters.location,
      availability: filters.availability
    }
    
    if (esOrganizador.value && user.value?.id) {
      filtros.organizer = user.value.id
    } else if (filters.organizer) {
      filtros.organizer = filters.organizer
    }

    await filterEvents(filtros)
  } catch (error) {
    console.error("Error al aplicar filtros:",error )
  }
}
const clearFilters = async () => {
  busqueda.value = ""
  filters.category = ""
  filters.date = ""
  filters.location = ""
  filters.availability = ""
  filters.organizer = ""
  await loadMyEvents()
}

const verEvents = (id) => {
  router.push(`/events/${id}`)
}

const iniciarEdicion = (event) => {
  eventEnEdicion.value = event
  mostrarFormulario.value = true
}

const cancelarFormulario = () => {
  eventEnEdicion.value = null
  mostrarFormulario.value =false
}

const guardarEvent = async (data) => {
  try {
    if (eventEnEdicion.value) {
      await editEvent( eventEnEdicion.value.id, data)
    } else {
      await addEvent(data)
    }
    await loadMyEvents()
    cancelarFormulario()

  } catch (error) {
    console.log("Error al guardar evento:",error)
  }
}

const confirmarEliminar = async (id) => {
  try {
    await removeEvent(id)
    await loadMyEvents()
  } catch (error) {
    console.log("Error al eliminar evento:",error)
  }
}

const verUsuarios = (id) => {
  router.push(`/events/${id}/users`)
}

const inscribir = async (eventId) => {
  try {
    const userId = user.value?.id
   
    if (!eventId) {  return }
    if (!userId) {return}
    await addRegistration(eventId,userId)
    
    await loadRegistrationsByUser(userId)
    await loadMyEvents()
  } catch (error) { console.error( "Error al inscribirse:",error
    )
  }
}

const cargandoMisEventos = ref(true)

const loadMyEvents = async () => {

  cargandoMisEventos.value = true
  try {

    if ( esOrganizador.value && user.value?.id) {
      events.value = await getEventsByOrganizer(user.value.id)
    } 
    else if ( esUsuario.value &&user.value?.id) {
      events.value = await getAvailableEventsForUser( user.value.id )
      await loadRegistrationsByUser(user.value.id)
    } 
    else { await loadEvents()}
    
  } catch (error) {
    console.error("Error al cargar eventos:",error )
  } finally {
    cargandoMisEventos.value =false
  }
}

onMounted(async () => {
  await Promise.all([
    loadMyEvents(),
    cargarDatosFiltros()
  ])
})
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

.filters {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(160px, 1fr));
  gap: 15px;
  padding: 20px;
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  margin-bottom: 35px;
  box-shadow:
    0 5px 15px rgba(15, 42, 74, .06);
}

.filters select,
.filters input {
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  background: white;
  color: #334155;
  outline: none;
}

.filters select:focus,
.filters input:focus {
  border-color: #12355b;
}

/* BOTONES FILTRO */
.filters button {
  border: none;
  border-radius: 10px;
  padding: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: .2s;
}

.btn-search {
  background: #12355b;
  color: white;

  &:hover {
    background: #0f2a4a;
    transform: translateY(-2px);
  }
}

.btn-clear {
  background: #f1f5f9;
  color: #334155;
  border: 1px solid #cbd5e1 !important;

  &:hover {
    background: #e2e8f0;
  }
}
</style>