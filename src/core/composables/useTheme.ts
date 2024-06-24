import { ref, watch } from 'vue';

export type ThemeMode = 'dark' | 'light' | 'browser';

const useTheme = () => {
  const theme = ref<ThemeMode>();
  const isDarkModeSytem = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

  const getTheme = () => {
    if (!localStorage.getItem('theme')) {
      setThemeToStorage('dark');
    }
    theme.value = localStorage.getItem('theme') as ThemeMode || 'dark';
  };

  const setTheme = (themeVal: ThemeMode) => {
    theme.value = themeVal;
  };

  const setThemeClassToDocument = (mode: 'dark' | 'light') => {
    setThemeToStorage(mode);
    if (mode === 'dark') {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      return;
    }
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  };

  const setThemeToStorage = (theme: ThemeMode) => {
    localStorage.setItem('theme', theme);
  };

  // onMounted(() => {
  //   getTheme();
  // });

  watch(theme, () => {
    switch(theme.value) {
      case 'dark':
        setThemeClassToDocument('dark');
        break;
      case 'light':
        setThemeClassToDocument('light');
        break;
      case 'browser':
      default:
        if (isDarkModeSytem()) {
          setThemeClassToDocument('dark');
        } else {
          setThemeClassToDocument('light');
        }
        break;
    }
  }, { deep: true, immediate: true });


  return {
    theme,

    setTheme,
    getTheme,
  };
};

export default useTheme;