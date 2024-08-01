import { createApp, h } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';
import defineVuetifyPlugin from '@/plugins/vuetify';
import { lazyLoading } from '@/directives/lazyLoading';
import AppButton from '@/core/components/AppButton.vue';
import AppIcon from '@/core/components/AppButton.vue';

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
  app.component('app-button', AppButton);
  app.component('app-icon', AppIcon);
  Object.values(plugins).forEach((plugin: any) => app.use(plugin));
  app.mount('#app');
}