import { useEffect, useRef } from "react";
import * as yup from "yup";
import { yupSchemes } from "../validation/YupSchemes.ts";
import { AdType, FullFormData } from "../types.ts";
import { UseFormWatch } from "react-hook-form";

export const useValidation = (watch: UseFormWatch<FullFormData>) => {
    const schema = useRef<yup.AnyObjectSchema>(yupSchemes.schemaMain);
    const selectedType = watch("type");
    useEffect(() => {
        switch (selectedType) {
            case AdType.RealEstate:
                schema.current = yupSchemes.schemaRealEstate;
                break;
            case AdType.Car:
                schema.current = yupSchemes.schemaAuto;
                break;
            case AdType.Service:
                schema.current = yupSchemes.schemaService;
                break;
            default:
                schema.current = yupSchemes.schemaMain;
        }
    }, [selectedType]);

    return schema;
};
