import { supabase } from "~/services/supabaseServices"

export const useSupabase = () => {

    const selectedPhoto = ref(null)
    const previewPhoto = ref(null)
    const loadingPhoto = ref(false)
    const photoError = ref(null)

    const handlePhotoChange = (event) => {

        const file = event.target.files?.[0]

        if (!file) return

        photoError.value = null

        if (!file.type.startsWith("image/")) {
            photoError.value = "Solo se permiten imágenes."
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            photoError.value = "La imagen no puede superar los 5 MB."
            return
        }

        selectedPhoto.value = file
        previewPhoto.value = URL.createObjectURL(file)
    }

    const uploadPhoto = async () => {

        if (!selectedPhoto.value) {
            return ""
        }

        loadingPhoto.value = true
        photoError.value = null

        try {

            const file = selectedPhoto.value
            const extension = file.name
                .split(".")
                .pop()
                .toLowerCase()

            const fileName = `${crypto.randomUUID()}.${extension}`
            const filePath = fileName
            const { error } = await supabase.storage
                .from("communityhub")
                .upload(filePath, file, {
                    cacheControl: "3600",
                    upsert: false,
                    contentType: file.type
                })

            if (error) {
                console.error("Error subiendo imagen:", error)
                throw error
            }

            const { data } = supabase.storage
                .from("communityhub")
                .getPublicUrl(filePath)

            return data.publicUrl

        } catch (error) {

            photoError.value =
                error.message || "No se pudo subir la imagen."

            throw error

        } finally {

            loadingPhoto.value = false
        }
    }

    const clearPhoto = () => {

        if (previewPhoto.value) {
            URL.revokeObjectURL(previewPhoto.value)
        }

        selectedPhoto.value = null
        previewPhoto.value = null
        photoError.value = null
    }

    return {
        selectedPhoto,
        previewPhoto,
        loadingPhoto,
        photoError,
        handlePhotoChange,
        uploadPhoto,
        clearPhoto
    }
}