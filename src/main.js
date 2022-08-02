import { createApp } from 'vue';
import App from './App.vue';
import './styles/index.css';
import { router } from './router';

// const app = createApp(App).use(router)
// app.mount('#app')

createApp(App).use(router).mount('#app');