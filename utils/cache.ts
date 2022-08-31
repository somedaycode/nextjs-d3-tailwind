export type CacheStore = {
  [key: string]: any;
};

const createCache = () => {
  let cache: CacheStore = {};

  const setCache = (key: string, data: unknown) => {
    cache[key] = data;
  };

  const getCache = (key: string) => cache[key] ?? undefined;

  return { setCache, getCache };
};

const cacheStore = createCache();
export { cacheStore };
