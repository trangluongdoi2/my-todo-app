import { Directive } from 'vue';

export const lazyLoading: Directive = {
  mounted(el) {
    function loadImage() {
      const imageElement = Array.from(el.children).find(
        (el: HTMLElement) => el.nodeName === 'IMG'
      ) as HTMLImageElement;
      if (imageElement) {
        imageElement.addEventListener('load', () => {
          setTimeout(() => el.classList.add('loaded'), 100);
        });
        imageElement.addEventListener('error', () => {
          console.log('error');
        });
        imageElement.src = imageElement.dataset.url;
      }
    }
    function handleIntersect(entries: any, observer: any) {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          loadImage();
          observer.unobserve(el);
        }
      });
    }
    function createObserver() {
      const options = {
        root: null,
        threshold: '0',
      };
      const observer = new IntersectionObserver(handleIntersect, options as any);
      observer.observe(el);
    }
    if (window['IntersectionObserver']) {
      createObserver();
    } else {
      loadImage();
    }
  }
};
