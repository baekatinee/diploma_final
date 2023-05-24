import { $authHost } from "./index";

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type',  type)
    return data
}
export const fetchTypes = async () => {
    const { data } = await $authHost.get('api/type')
    return data
}
export const fetchOneType = async (id) => {
    const { data } = await $authHost.get('api/type/' + id )
    return data
}
export const updateType = async (id, updatedData) => {
    const { data } = await $authHost.post(`api/type/${id}`, updatedData)
    return data
}
export const deleteType = async (id) => {
    const { data } = await $authHost.delete(`api/type/${id}`)
    return data
}