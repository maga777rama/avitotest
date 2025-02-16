import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./styles.module.scss";
import { FullFormData } from "./types.ts";
import { useLocation } from "react-router-dom";

import { Buttons } from "./components/buttonsBlock/buttons.tsx";
import { FormStep1 } from "./components/formStep1/formStep1.tsx";
import { FormStep2 } from "./components/formStep2/formStep2.tsx";
import { yupSchemes } from "./validation/YupSchemes.ts";
import { useValidation } from "./hooks/useValidation.ts";
import { usePhotoUpload } from "./hooks/usePhotoUpload.ts";
import { useAutoSave } from "./hooks/useAutoSave.ts";
import { useDraft } from "./hooks/useDraft.ts";

export const Form = () => {
    const [step, setStep] = useState(1);
    const schema = useRef<yup.AnyObjectSchema>(yupSchemes.schemaMain);

    // если есть айди то режим редактирования, иначе создание нового объявления
    const location = useLocation();
    const message = location.state?.id;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        trigger,
        reset,
    } = useForm<FullFormData>({
        resolver: yupResolver(schema.current),
        mode: "onSubmit",
    });

    // начальная загрузка данных из черновика
    const { photoState, setPhotoState } = useDraft(reset);

    // обновляем схему в зависимости от выбранного типа объявления
    const schema1 = useValidation(watch);
    schema.current = schema1.current;

    // сохраняет форму в черновик либо создает
    useAutoSave(photoState, watch);

    // обработчик загрузки фотки
    usePhotoUpload(setPhotoState, watch);

    return (
        <main className={styles.form}>
            {message === undefined ? (
                <h1>Новое объявление</h1>
            ) : (
                <h1>Редактирование объявления</h1>
            )}

            {step === 1 && (
                <FormStep1
                    register={register}
                    errors={errors}
                    photoState={photoState}
                    setPhotoState={setPhotoState}
                />
            )}

            {step === 2 && (
                <FormStep2
                    errors={errors}
                    handleSubmit={handleSubmit}
                    reset={reset}
                    message={message}
                    register={register}
                    photoState={photoState}
                    watch={watch}
                />
            )}
            <Buttons
                step={step}
                setStep={setStep}
                trigger={trigger}
                reset={reset}
                photo={photoState}
                message={message}
            />
        </main>
    );
};
