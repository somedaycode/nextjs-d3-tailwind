import { createHttpClient } from '@/lib';

const myFetch = createHttpClient().setBaseUrl('/api').build();

export default myFetch;
