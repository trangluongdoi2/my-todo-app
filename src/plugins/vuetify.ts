import { App } from "vue";
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import { mdi } from "vuetify/iconsets/mdi";
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { customSVGs } from '@/core/components/icons/svg/customIcons';

const defineVuetifyPlugin = (app: App) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'dark',
    },
    icons: {
      defaultSet: 'mdi',
      sets: {
        mdi,
        custom: customSVGs as any,
      },
    },
  });
  app.use(vuetify);
};
export default defineVuetifyPlugin;