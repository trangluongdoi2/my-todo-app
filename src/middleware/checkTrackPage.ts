import { RouteLocationNormalized } from 'vue-router';

let trackPages: {[key: string]: object} = {};

export const clearTrackPages = () => {
  trackPages = {};
};

export default async function checkTrackPages(to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) {
  const prefix = to.meta.prefix as any;
  if (!to.hash && prefix !== from.meta.prefix && trackPages[prefix]) {
    const redirect = trackPages[prefix];
    delete trackPages[prefix];
    return next(redirect);
  }
  trackPages[prefix] = {
    name: to.name,
    query: to.query,
    params: to.params,
  };
  return next();
}
