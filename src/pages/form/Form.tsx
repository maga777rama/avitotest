import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "../../styles/styles.module.scss";
import { AdType } from "./types";
import {
    schemaMain,
    schemaRealEstate,
    schemaAuto,
    schemaService,
} from "./YupSchemes.ts";
import { postDataToCrateAd } from "../../api/api.ts";
import { Link, useNavigate } from "react-router-dom";

export type FormData = {
    name: string;
    description: string;
    location: string;
    type: AdType;
    propertyType?: string;
    area?: number;
    rooms?: number;
    price?: number;
    brand?: string;
    model?: string;
    year?: number;
    mileage?: number;
    serviceType?: string;
    experience?: number;
    cost?: number;
    workSchedule?: string;
};

export const Form = () => {
    const [step, setStep] = useState(1);
    const [schema, setSchema] = useState<yup.AnyObjectSchema>(schemaMain);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        trigger,
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: "onBlur",
    });

    const selectedType = watch("type");

    useEffect(() => {
        switch (selectedType) {
            case AdType.RealEstate:
                setSchema(schemaRealEstate);
                break;
            case AdType.Car:
                setSchema(schemaAuto);
                break;
            case AdType.Service:
                setSchema(schemaService);
                break;
            default:
                setSchema(schemaMain);
        }
    }, [selectedType]);

    const onSubmit = (data: FormData) => {
        console.log(data);
        postDataToCrateAd(data);
        reset();
        navigate("/list");
    };

    return (
        <main>
            <Link to={"/list"}>Отмена</Link>

            {step === 1 && (
                <form className={styles.Form}>
                    <label>Название</label>
                    <input {...register("name")} type="text" />
                    <p>{errors.name?.message}</p>

                    <label>Описание</label>
                    <input {...register("description")} type="text" />
                    <p>{errors.description?.message}</p>

                    <label>Локация</label>
                    <input {...register("location")} type="text" />
                    <p>{errors.location?.message}</p>

                    <label>Тип объявления</label>
                    <select {...register("type")}>
                        <option value="">{""}</option>
                        <option value={AdType.RealEstate}>
                            {AdType.RealEstate}
                        </option>
                        <option value={AdType.Car}>{AdType.Car}</option>
                        <option value={AdType.Service}>{AdType.Service}</option>
                    </select>
                    <p>{errors.type?.message}</p>

                    <button
                        type="button"
                        onClick={async () => {
                            const isValid = await trigger([
                                "name",
                                "description",
                                "location",
                                "type",
                            ]);
                            console.log("Validation result:", isValid);
                            if (isValid) setStep(2);
                        }}
                    >
                        Далее
                    </button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
                    {selectedType === AdType.RealEstate && (
                        <>
                            <label>Тип недвижимости</label>
                            <select {...register("propertyType")}>
                                <option value="">{""}</option>
                                <option value="Квартира">Квартира</option>
                                <option value="Дом">Дом</option>
                                <option value="Коттедж">Коттедж</option>
                            </select>
                            <p>{errors.propertyType?.message}</p>

                            <label>Площадь</label>
                            <input {...register("area")} type="number" />
                            <p>{errors.area?.message}</p>

                            <label>Количество комнат</label>
                            <input {...register("rooms")} type="number" />
                            <p>{errors.rooms?.message}</p>

                            <label>Цена</label>
                            <input {...register("price")} type="number" />
                            <p>{errors.price?.message}</p>
                        </>
                    )}
                    {selectedType === AdType.Car && (
                        <>
                            <label>Марка</label>
                            <select {...register("brand")}>
                                <option value="">{""}</option>
                                <option value="BMW">BMW</option>
                                <option value="Toyota">Toyota</option>
                                <option value="Лада">Лада</option>
                            </select>
                            <p>{errors.brand?.message}</p>

                            <label>Модель</label>
                            <input {...register("model")} />
                            <p>{errors.model?.message}</p>

                            <label>Год выпуска</label>
                            <input {...register("year")} type="number" />
                            <p>{errors.year?.message}</p>

                            <label>Пробег</label>
                            <input {...register("mileage")} type="number" />
                            <p>{errors.mileage?.message}</p>
                        </>
                    )}
                    {selectedType === AdType.Service && (
                        <>
                            <label>Тип услуги</label>
                            <select {...register("serviceType")}>
                                <option value="">{""}</option>
                                <option value="Ремонт">Ремонт</option>
                                <option value="Уборка">Уборка</option>
                                <option value="Доставка">Доставка</option>
                            </select>
                            <p>{errors.serviceType?.message}</p>

                            <label>Опыт работы</label>
                            <input {...register("experience")} type="number" />
                            <p>{errors.experience?.message}</p>

                            <label>Стоимость</label>
                            <input {...register("cost")} type="number" />
                            <p>{errors.cost?.message}</p>
                        </>
                    )}

                    <button type="button" onClick={() => setStep(1)}>
                        Назад
                    </button>
                    <input type="submit" value="Отправить" />
                </form>
            )}
        </main>
    );
};
