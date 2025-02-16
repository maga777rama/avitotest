import { useEffect } from "react";
import { uploadPhoto } from "../../../api/api";
import { UseFormWatch } from "react-hook-form";
import { FullFormData } from "../types.ts";

export const usePhotoUpload = (
    setPhotoState: (url: string) => void,
    watch: UseFormWatch<FullFormData>,
) => {
    const photo = watch("photo");

    useEffect(() => {
        if (
            photo !== undefined &&
            photo?.length > 0 &&
            typeof photo !== "string"
        ) {
            const formData = new FormData();
            formData.append("photo", photo[0]);
            (async () => {
                const data = await uploadPhoto(formData);
                setPhotoState(data.photoUrl);
            })();
        }
    }, [photo]);
};
