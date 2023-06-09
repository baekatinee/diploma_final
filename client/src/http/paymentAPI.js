import { $authHost, $host } from "./index";

export const createPayment = async (payment) => {
  const { data } = await $authHost.post('api/payment', payment)
  return data
}
export const fetchPayments = async (page, limit = 5) => {
  const { data } = await $authHost.get('api/payment', {
    params: {
      page, limit
    }
  })
  return data
}
export const fetchOnePayment = async (id) => {
  const { data } = await $authHost.get('api/payment/' + id)
  return data
}
export const updatePayment = async (id, updatedData) => {
  const { data } = await $authHost.put(`api/payment/${id}`, updatedData);
  return data;
}
export const deletePayment = async (id) => {
  const { data } = await $authHost.delete(`api/payment/${id}`)
  return data
}