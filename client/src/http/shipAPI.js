import { $authHost} from "./index";

export const createShip = async (ship) => {
    const { data } = await $authHost.post('api/ship', { ship})
    return data
}
export const fetchShips = async (typeId, page, limit=5) => {
    const { data } = await $authHost.get('api/ship', {params:{
        typeId,  page, limit
    }})
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