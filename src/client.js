import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: import.meta.env.VITE_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: true,
    token: import.meta.env.VITE_APP_SANITY_TOKEN_ID
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

