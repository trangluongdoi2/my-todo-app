import { createApp, h } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';
import defineVuetifyPlugin from '@/plugins/vuetify';
import loadCustomComponent from '@/plugins/custom-component';
import { lazyLoading } from '@/directives/lazyLoading';

export default function registerVueModule(
  defineComponent: any,
  plugins: any,
  modules: any = [],
) {
  const pinia = createPinia();
  const app = createApp({
    setup() {
    },
    render() {
      return (h(defineComponent));
    },
  });

  defineVuetifyPlugin(app);
  modules.map((Module: any) => new Module(router).install(app));
  app.directive('lazy-loading', lazyLoading);
  app.use(router);
  app.use(pinia);
  loadCustomComponent(app);
  Object.values(plugins).forEach((plugin: any) => app.use(plugin));
  app.mount('#app');
}