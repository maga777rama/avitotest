import axios from "axios";
import { FormData } from "../pages/form/Form.tsx";

const BASE_URL = "http://localhost:3000/";
export const getData = async () => {
    try {
        const response = await axios(`${BASE_URL}items`, {
            method: "GET",
        });
        return await response.data;
    } catch (err) {
        console.error(err);
    }
};

export const postDataToCrateAd = async (data: FormData) => {
    try {
        const response = await axios(`${BASE_URL}items`, {
            method: "POST",
            data,
            headers: {
                contentType: "application/json",
            },
        });
        return await response.data;
    } catch (err) {
        console.error(err);
    }
};

export const getDataById = async (id: number) => {
    try {
        const response = await axios(`${BASE_URL}items/${id}`, {
            method: "GET",
        });
    } catch (err) {
        console.error(err);
    }
};
