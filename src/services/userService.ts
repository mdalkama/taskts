import axios from "axios";
import type { JSONPlaceholderUser } from "../types/userType";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const userService = {
    fetchUsers: async (): Promise<JSONPlaceholderUser[]> => {
        const response = await axios.get<JSONPlaceholderUser[]>(
            `${BASE_URL}/users`,
        );
        return response.data;
    },
};
