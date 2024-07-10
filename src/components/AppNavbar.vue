<!-- src/components/Navbar.vue -->
<template>
    <nav class="navbar navbar-expand-lg navbar-light custom-navbar">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">MyApp</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <span class="nav-link">Logged in as: {{ username }}</span>
                    </li>
                    <li class="nav-item">
                        <button class="btn btn-outline-light" @click="logout">Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const username = computed(() => auth.username);

const logout = () => {
    auth.logout();
    router.push('/login');
};

onMounted(() => {
    if (auth.accessToken) {
        auth.fetchUserDetails();
    }
});
</script>

<style scoped>
.custom-navbar {
    background-color: #007bff;
    /* Color azul */
}

.navbar .nav-link,
.navbar .navbar-brand {
    color: #ffffff;
    /* Color del texto blanco */
}

.navbar .btn-outline-light {
    color: #ffffff;
    border-color: #ffffff;
}

.navbar .btn-outline-light:hover {
    background-color: #ffffff;
    color: #007bff;
}
</style>