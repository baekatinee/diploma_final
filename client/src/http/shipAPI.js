import { $authHost, $host } from "./index";

export const createShip = async (ship) => {
    const { data } = await $authHost.post('api/ship', { ship})
    return data
}
export const fetchShips = async () => {
    const { data } = await $authHost.get('api/ship')
    return data
}
