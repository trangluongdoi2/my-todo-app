import { h } from "vue";
import { IconAliases, IconProps } from "vuetify";
import AppIcon from '@/core/components/AppIcon.vue';

// @ts-ignore
// const aliases: IconAliases = {
//   notifications: <AppIcon name="mdi-bell" />,
//   settings: 'mdi-settings',
// };

// @ts-expect-error
const customSVGs: IconAliases = {
  component: (props: IconProps) => h(AppIcon, { name: props.icon as string })
};

export { customSVGs };
