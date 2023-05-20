import { $authHost, $host } from "./index";
import { fetchShips } from "./shipAPI";

export const createRental = async (rental) => {
    const { data } = await $authHost.post('api/rental', rental)
    return data
}
export const fetchRentals = async () => {
    const { data } = await $authHost.get('api/rental')
    return data
}
export const getAvailableShips = async () => {
    try {
      // Шаг 1: Запросить все активные аренды
      const response = await fetchRentals()
  
      // Шаг 2: Собрать все суда, задействованные в активных арендах
      const rentedShipIds = response.data.map(rental => rental.shipId);
  
      // Шаг 3: Запросить все суда из сервера, исключая те, которые уже задействованы в арендах
      const allShipsResponse = await fetchShips()
      const availableShips = allShipsResponse.data.filter(ship => !rentedShipIds.includes(ship.id));
  
      // Шаг 4: Вернуть список доступных судов
      return availableShips;
    } catch (error) {
      throw new Error('Не удалось получить доступные суда для аренды');
    }
  };