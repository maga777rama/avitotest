import {
    DeepPartial,
    FieldErrors,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormWatch,
} from "react-hook-form";
import { FullFormData } from "../../types.ts";

export interface ResetOptions {
    keepErrors?: boolean;
    keepDirty?: boolean;
    keepValues?: boolean;
    keepDefaultValues?: boolean;
    keepIsSubmitted?: boolean;
    keepTouched?: boolean;
    keepDirtyValues?: boolean;
    keepSubmitCount?: boolean;
}

export interface IForm2Props {
    errors: FieldErrors<FullFormData>;
    handleSubmit: UseFormHandleSubmit<FullFormData>;
    reset: (
        values?: DeepPartial<FullFormData | undefined>,
        options?: ResetOptions | undefined,
    ) => void;
    message: number;
    register: UseFormRegister<FullFormData>;
    photoState: string;
    watch: UseFormWatch<FullFormData>;
}
