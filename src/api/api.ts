import axios from "axios";

const BASE_URL = "http://localhost:3000/";
export const getData = async () => {
    try {
        const response = await axios(`${BASE_URL}items`, {
            method: "GET",
            headers: {
                contentType: "application/json",
            },
        });
        return await response.data;
    } catch (err) {
        console.error(err);
    }
};
