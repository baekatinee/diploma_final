import { $authHost, $host } from "./index";

export const createPayment = async (payment) => {
    const { data } = await $authHost.post('api/payment',  payment)
    return data
}
export const fetchPayments = async () => {
    const { data } = await $authHost.get('api/payment')
    return data
}
