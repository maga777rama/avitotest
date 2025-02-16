import { useEffect, useState } from "react";

import { getDraft } from "../../../api/api.ts";
import { DeepPartial } from "react-hook-form";
import { FullFormData } from "../types.ts";
import { ResetOptions } from "../components/formStep2/formStep2Types.ts";

export const useDraft = (
    reset: (
        values?: DeepPartial<FullFormData | undefined>,
        options?: ResetOptions | undefined,
    ) => void,
) => {
    const [photoState, setPhotoState] = useState<string>("");

    useEffect(() => {
        (async () => {
            const data = await getDraft();
            const { id, ...dataWithoutId } = data;
            reset(dataWithoutId);
            if (dataWithoutId.photo) {
                setPhotoState(dataWithoutId.photo);
            }
        })();
    }, []);

    return { photoState, setPhotoState };
};
