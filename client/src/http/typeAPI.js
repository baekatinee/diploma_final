import { $authHost, $host } from "./index";

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', { type})
    return data
}
export const fetchTypes = async () => {
    const { data } = await $authHost.get('api/type')
    return data
}
export const updateType = async (id, updatedData) => {
    const { data } = await $authHost.post(`api/type/${id}`, updatedData)
    return data
}