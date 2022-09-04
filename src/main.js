import { createApp } from 'vue';

import App from './App.vue';

// export const eventBus = new Vue({
//   methods: {
//     changeDate(newDate) {
//       eventBus.$emit('datechange', newDate);
//     },
//   },
// });

const app = createApp(App);

app.mount('#app');
