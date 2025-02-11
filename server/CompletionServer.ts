import data from "./data.json" with { type: "json" };
import axios from "axios";

export const CompleteServer = async () => {
    console.log(data.data);
    for (const item of data.data) {
        try {
            const response = await axios.post(
                "http://localhost:3000/items",
                item,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    }
};
