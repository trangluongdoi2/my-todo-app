import { App, Component } from "vue";
import AppButton from '@/core/components/AppButton.vue';
import AppIcon from '@/core/components/AppIcon.vue';
import AppSkeletonItem from '@/core/components/skeleton/AppSkeletonItem.vue';
import AppSkeletonImage from '@/core/components/skeleton/AppSkeletonImage.vue';
import AppSkeletonButton from '@/core/components/skeleton/AppSkeletonButton.vue';
import AppSkeletonTable from "@/core/components/skeleton/AppSkeletonTable.vue";
import AppToast from "@/core/components/AppToast.vue";
import AppModal from "@/core/components/AppModal.vue";
import AppInput from "@/core/components/AppInput.vue";
import AppTextArea from "@/core/components/AppTextArea.vue";
import AppSelect from "@/core/components/AppSelect.vue";
import AppBreadcrumbs from "@/core/components/AppBreadcrumbs.vue";
import AppEditable from "@/core/components/AppEditable.vue";
import AppSelectEditable from "@/core/components/AppSelectEditable.vue";

const listCustomComponents: { [key: string]: Component } = {
  'app-icon': AppIcon,
  'app-input': AppInput,
  'app-text-area': AppTextArea,
  'app-button': AppButton,
  'app-select': AppSelect,
  'app-skeleton-item': AppSkeletonItem,
  'app-skeleton-image': AppSkeletonImage,
  'app-skeleton-button': AppSkeletonButton,
  'app-skeleton-table': AppSkeletonTable,
  'app-toast': AppToast,
  'app-modal': AppModal,
  'app-breadcrumbs': AppBreadcrumbs,
  'app-editable': AppEditable,
  'app-select-editable': AppSelectEditable,
};

export default function loadCustomComponent(app: App) {
  Object.keys(listCustomComponents).forEach((key: string) => {
    app.component(key, listCustomComponents[key]);
  });
};