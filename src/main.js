import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'; // Import the router instance
import { createPinia } from 'pinia';


// Use the router instance

createApp(App).use(router).use(createPinia()).mount('#app')
// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router/index'; // Import the router instance
// import { createPinia } from 'pinia'; // Import the Pinia function

// const app = createApp(App)

// // Use the router instance
// app.use(router);

// // Use Pinia
// app.use(createPinia());

// app.mount('#app')

