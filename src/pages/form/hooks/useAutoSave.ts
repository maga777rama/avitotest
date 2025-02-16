import { useDebouncedCallback } from "use-debounce";

import { GetFormData } from "./getFormData.ts";
import { FullFormData } from "../types.ts";
import { useEffect } from "react";
import { postCreateDraft } from "../../../api/api.ts";
import { UseFormWatch } from "react-hook-form";

export const useAutoSave = (
    photoState: string,
    watch: UseFormWatch<FullFormData>,
) => {
    const currentFormData = watch();
    const debouncedSave = useDebouncedCallback(() => {
        (async () => {
            const item = await postCreateDraft(
                GetFormData(photoState, currentFormData),
            );
            console.log(item);
        })();
    }, 1200);

    useEffect(() => {
        debouncedSave();
    }, [currentFormData]);
};
