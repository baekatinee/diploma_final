import { $authHost} from "./index";

export const createShip = async (ship) => {
    const { data } = await $authHost.post('api/ship', { ship})
    return data
}
export const fetchShips = async () => {
    const { data } = await $authHost.get('api/ship')
    return data
}
export const updateShip = async (id, updatedData) => {
    const { data } = await $authHost.put(`api/ship/${id}`, updatedData)
    return data
}
export const deleteShip = async (id) => {
    const { data } = await $authHost.delete(`api/ship/${id}`)
    return data
}