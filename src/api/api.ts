import axios from "axios";
import { FullFormData } from "../pages/form/types.ts";



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

export const postDataToCrateAd = async (data: FullFormData, mode: boolean) => {
    try {
        const response = await axios(`${BASE_URL}items`, {
            method: "POST",
            data,
            headers: {
                contentType: "multipart/form-data",
                mode: mode,
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
        return await response.data;
    } catch (err) {
        console.error(err);
    }
};

export const updateDataById = async (id: number, data: FullFormData) => {
    try {
        const response = await axios(`${BASE_URL}items/${id}`, {
            method: "PUT",
            data,
            headers: {
                contentType: "multipart/form-data",
            },
        });
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const uploadPhoto = async (data: FormData) => {
    try {
        const response = await axios(`${BASE_URL}uploadPhoto`, {
            method: "POST",
            data,
            headers: {
                ContentType: "multipart/form-data",
            },
        });
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const getDraft = async () => {
    try {
        const response = await axios(`${BASE_URL}draft`, {
            method: "GET",
        });
        return await response.data;
    } catch (err) {
        console.error(err);
    }
};

export const deleteDraft = async () => {
    try {
        const response = await axios(`${BASE_URL}draft`, {
            method: "DELETE",
        });
        return await response.data;
    } catch (err) {
        console.error(err);
    }
};
