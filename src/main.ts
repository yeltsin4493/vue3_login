import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
// import { useAuthStore } from "./stores/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

// const auth = useAuthStore();
// if (auth.accessToken) {
//   auth.fetchUserDetails();
// }

app.mount("#app");
