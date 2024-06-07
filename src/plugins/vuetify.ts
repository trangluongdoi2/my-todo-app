import { App } from "vue";
// import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const defineVuetifyPlugin = (app: App) => {
  const vuetify = createVuetify({
    components,
    directives,
  });
  app.use(vuetify);
};
export default defineVuetifyPlugin;