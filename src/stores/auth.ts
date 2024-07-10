// src/stores/auth.ts
import { defineStore } from "pinia";
import apiClient from "../services/api";
// import { useRouter } from 'vue-router';

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: localStorage.getItem("access_token") || "",
    username: "",
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await apiClient.post("/login", {
          username,
          password,
        });
        this.accessToken = response.data.access_token;
        localStorage.setItem("access_token", this.accessToken);
        await this.fetchUserDetails();
        // Redirige usando router directamente en el componente
        // const router = useRouter();
        // router.push('/products');
      } catch (error) {
        console.error("Login failed", error);
      }
    },
    async fetchUserDetails() {
      if (!this.accessToken) return;

      try {
        const response = await apiClient.get("/user", {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });
        this.username = response.data.username;
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    },
    logout() {
      this.accessToken = '';
      this.username = '';
      localStorage.removeItem('access_token');
    },
  },
});
