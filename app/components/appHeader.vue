<template>
    <header class="app-header">

        <NuxtLink to="/dashboard" class="logo"> CommunityHub </NuxtLink>

        <nav>
            <NuxtLink v-for="item in visibleItems" :key="item.path" :to="item.path"> {{ item.name }} </NuxtLink>
        </nav>

        <div class="profile">
            <button class="profile-button" @click="showMenu = !showMenu">
                <img v-if="user?.urlPhoto" :src="user.urlPhoto" :alt="user.displayName" class="avatar">
                <div v-else class="avatar-placeholder"> 👤 </div>
                <span class="arrow"> ▼ </span>
            </button>

            <div v-if="showMenu" class="dropdown">
                <NuxtLink to="/profile"> Mi perfil </NuxtLink>
                <button @click="logout">Cerrar sesión </button>
            </div>

        </div>
    </header>

</template>
<script setup>

import { useAuth } from "../composables/useAuth"

const { visibleItems } = useMenu()
const showMenu = ref(false)

const { user } = useAuth()
const logout = () => {
    console.log("Logout DE MENTIDAS")
    showMenu.value = false
}

</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.app-header {
    height: 75px;
    background: linear-gradient(135deg,
            #1f2937,
            #111827);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    color: white;
    font-family: 'Inter', sans-serif;
    box-shadow: 0 4px 20px rgba(0, 0, 0, .25);
    border-bottom: 1px solid rgba(255, 255, 255, .08);
}

.logo {
    color: white;
    text-decoration: none;
    font-size: 1.35rem;
    font-weight: 800;
    letter-spacing: -0.5px;
    white-space: nowrap;
    transition: .25s;
}

.logo:hover {
    color: #60a5fa;
}

nav {
    display: flex;
    align-items: center;
    gap: .25rem;
}

nav a {
    color: #cbd5e1;
    text-decoration: none;
    padding: .65rem .85rem;
    border-radius: 8px;
    font-size: .92rem;
    font-weight: 500;
    transition: .25s;
    position: relative;
}

nav a:hover {
    color: white;
    background: rgba(255, 255, 255, .08);
}

nav a.router-link-active {
    color: #60a5fa;
    background: rgba(96, 165, 250, .12);
}

.profile {
    position: relative;
}

.profile-button {
    border: none;
    background: rgba(255, 255, 255, .06);
    padding: .35rem .75rem;
    border-radius: 30px;
    color: white;
    display: flex;
    align-items: center;
    gap: .75rem;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    transition: .25s;
}

.profile-button:hover {
    background: rgba(255, 255, 255, .12);
}

.avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #60a5fa;
}

.avatar-placeholder {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #374151;
    font-size: 1.2rem;
}

.arrow {
    font-size: .75rem;
    color: #cbd5e1;
}

.dropdown {
    position: absolute;
    right: 0;
    top: 60px;
    width: 230px;
    background: white;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 15px 40px rgba(0, 0, 0, .25);
    display: flex;
    flex-direction: column;
    z-index: 1000;
}

.dropdown a,
.dropdown button {
    padding: 1rem;
    text-align: left;
    border: none;
    background: white;
    cursor: pointer;
    text-decoration: none;
    color: #374151;
    font-family: 'Inter', sans-serif;
    font-size: .95rem;
    font-weight: 500;
    transition: .2s;
}

.dropdown a:hover,
.dropdown button:hover {
    background: #f3f4f6;
}

header {
    margin-bottom: 30px;
}
</style>