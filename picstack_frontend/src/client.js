import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';


 export const client=sanityClient({
    projectId:import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset:"production",
    apiVersion:"2022-10-24",
    useCdn:true,
    token:import.meta.env.VITE_SANITY_CLIENT_TOKEN 
})
const builder= imageUrlBuilder(client)
export const urlfor=(source)=>(builder.image(source))