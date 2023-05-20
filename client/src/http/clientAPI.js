import { $authHost, $host } from "./index";

export const createClient = async (client) => {
    const { data } = await $authHost.post('api/client', client )
    return data
}
export const fetchOneClient = async (id) => {
    const { data } = await $authHost.get('api/client', { id })
    return data
}
export const updateClient = async (id, updatedData) => {
    const { data } = await $authHost.put(`api/client/${id}`, updatedData);
    return data;
}
export const deleteClient = async (id) => {
    const { data } = await $authHost.delete(`api/client/${id}`)
    return data
}
export const fetchClients = async () => {
    const { data } = await $authHost.get('api/client')
    return data
}
