import { $authHost, $host } from "./index";

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', { type})
    return data
}
export const fetchTypes = async () => {
    const { data } = await $authHost.get('api/type')
    return data
}
