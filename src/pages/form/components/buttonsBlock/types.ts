import { DeepPartial, FieldPath } from "react-hook-form";
import { FullFormData } from "../../types.ts";

interface ResetOptions {
    keepErrors?: boolean;
    keepDirty?: boolean;
    keepValues?: boolean;
    keepDefaultValues?: boolean;
    keepIsSubmitted?: boolean;
    keepTouched?: boolean;
    keepDirtyValues?: boolean;
    keepSubmitCount?: boolean;
}

export interface IButtonsProps {
    step: number;
    setStep: (step: number) => void;
    trigger: (
        name?: FieldPath<FullFormData> | FieldPath<FullFormData>[],
        options?: { shouldFocus?: boolean },
    ) => Promise<boolean>;
    photo: string;

    reset: (
        values?: DeepPartial<FullFormData | undefined>,
        options?: ResetOptions | undefined,
    ) => void;
    message: number | undefined;
}
