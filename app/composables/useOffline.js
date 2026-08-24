export const useOffline = () => {

    const isOffline = ref(false)

    const actualizarEstado = () => {
        isOffline.value = !navigator.onLine
    }

    onMounted(() => {
        actualizarEstado()
        window.addEventListener("online", actualizarEstado )
        window.addEventListener("offline",actualizarEstado)
    })

    onUnmounted(() => {

        window.removeEventListener("online",actualizarEstado)
        window.removeEventListener( "offline", actualizarEstado)
    })

    return {
        isOffline
    }
}