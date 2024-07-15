import { Post } from "../models/base-models";

export const getPostDataFromAPI = (): Promise<Post[]> => {
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts`

    return fetch(url).then((rawResponse) => {
        return rawResponse.ok ? rawResponse.json() : []
    })
}