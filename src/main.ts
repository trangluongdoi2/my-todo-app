import registerVueModule from '@/plugins/vue-module';
import { amplifyConfigure } from './aws-config';
import '@/styles/main.scss';
import App from '@/App.vue';

amplifyConfigure();
registerVueModule(App, []);