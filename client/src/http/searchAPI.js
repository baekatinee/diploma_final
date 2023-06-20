import { $authHost } from "./index";

export const searchAll = async (query) => {
    try {
        const { data } = await $authHost.get("api/search", {
            params: {
                query,
            },
        });
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};