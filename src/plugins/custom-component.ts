import { App, Component } from "vue";
import AppButton from '@/core/components/AppButton.vue';
import AppIcon from '@/core/components/AppIcon.vue';
import AppSkeletonItem from '@/core/components/skeleton/AppSkeletonItem.vue';
import AppSkeletonImage from '@/core/components/skeleton/AppSkeletonImage.vue';
import AppSkeletonButton from '@/core/components/skeleton/AppSkeletonButton.vue';
import AppSkeletonTable from "@/core/components/skeleton/AppSkeletonTable.vue";
import AppToast from "@/core/components/AppToast.vue";

const listCustomComponents: { [key: string]: Component } = {
  'app-icon': AppIcon,
  'app-button': AppButton,
  'app-skeleton-item': AppSkeletonItem,
  'app-skeleton-image': AppSkeletonImage,
  'app-skeleton-button': AppSkeletonButton,
  'app-skeleton-table': AppSkeletonTable,
  'app-toast': AppToast,
};

export default function loadCustomComponent(app: App) {
  Object.keys(listCustomComponents).forEach((key: string) => {
    app.component(key, listCustomComponents[key]);
  });
};