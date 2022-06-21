import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri:"https://api-sa-east-1.graphcms.com/v2/cl4o7v19r0y8z01xrbd1i2qvo/master",
    cache: new InMemoryCache()
})