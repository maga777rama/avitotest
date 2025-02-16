import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FullFormData } from "../../types.ts";

export interface IForm1Props {
    register: UseFormRegister<FullFormData>;
    errors: FieldErrors<FullFormData>;
    photoState: string;
    setPhotoState: (state: string) => void;
}
export interface IPreviewProps {
    register: UseFormRegister<FullFormData>;
    photoState: string;
    setPhotoState: (state: string) => void;
}
