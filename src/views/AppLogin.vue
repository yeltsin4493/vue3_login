<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card w-100" style="max-width: 400px;">
            <div class="card-body">
                <h3 class="card-title text-center mb-4">Login</h3>
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input v-model="username" type="text" class="form-control" id="username"
                            placeholder="Enter your username" />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input v-model="password" type="password" class="form-control" id="password"
                            placeholder="Enter your password" />
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const username = ref('');
const password = ref('');

const login = async () => {
    await auth.login(username.value, password.value);
    if (auth.accessToken) {
        router.push('/products');
    }
};

</script>

<style scoped>
.container {
    padding: 15px;
}

.card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>