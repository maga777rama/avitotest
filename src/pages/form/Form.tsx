import { useEffect, useRef, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import formStyles from "./formStyles.module.scss";
import {
    AdType,
    CarData,
    FullFormData,
    RealEstateData,
    ServiceData,
} from "./types";
import {
    schemaMain,
    schemaRealEstate,
    schemaAuto,
    schemaService,
} from "./YupSchemes.ts";
import { useLocation, useNavigate } from "react-router-dom";
import {
    deleteDraft,
    getDraft,
    postDataToCrateAd,
    updateDataById,
    uploadPhoto,
} from "../../api/api.ts";
import { useDebouncedCallback } from "use-debounce";
import { GetFormData } from "./getFormData.ts";
import { CloseOutlined } from "@ant-design/icons";
import { Image } from "antd";

export const Form = () => {
    console.log("RENDER!!!!!");
    const [step, setStep] = useState(1);
    const schema = useRef<yup.AnyObjectSchema>(schemaMain);
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.id;
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

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        trigger,
        reset,
        // setValue,
    } = useForm<FullFormData>({
        resolver: yupResolver(schema.current),
        mode: "onSubmit",
    });

    const realEstateErrors = errors as FieldErrors<RealEstateData>;
    const carErrors = errors as FieldErrors<CarData>;
    const serviceErrors = errors as FieldErrors<ServiceData>;

    const selectedType = watch("type");

    // меняем схемы валидации
    useEffect(() => {
        switch (selectedType) {
            case AdType.RealEstate:
                schema.current = schemaRealEstate;
                break;
            case AdType.Car:
                schema.current = schemaAuto;
                break;
            case AdType.Service:
                schema.current = schemaService;
                break;
            default:
                schema.current = schemaMain;
        }
    }, [selectedType]);

    const currentFormData = watch();

    const a = useDebouncedCallback(() => {
        (async () => {
            const item = await postDataToCrateAd(
                GetFormData(photoState, currentFormData),
                true,
            );
            setPhotoState(item.photo);
            console.log(item);
            console.log(watch("photo"));
        })();
    }, 1200);

    useEffect(() => {
        a();
    }, [currentFormData]);

    const photo = watch("photo");

    useEffect(() => {
        if (
            photo !== undefined &&
            photo?.length > 0 &&
            typeof photo !== "string"
        ) {
            console.log(11111111111);
            const formData = new FormData();
            formData.append("photo", photo[0]);
            (async () => {
                const data = await uploadPhoto(formData);
                setPhotoState(data.photoUrl);

                // setValue("photo", data.photoUrl);
            })();
        }
    }, [photo]);

    const onSubmit = () => {
        console.log(
            message === undefined
                ? postDataToCrateAd(
                      GetFormData(photoState, currentFormData),
                      false,
                  )
                : updateDataById(
                      message,
                      GetFormData(photoState, currentFormData),
                  ),
        );
        console.log(deleteDraft());
        reset();
        navigate("/list");
    };

    console.log(photoState);
    return (
        <main className={formStyles.Form}>
            {message === undefined ? (
                <h1>Новое объявление</h1>
            ) : (
                <h1>Редактирование объявления</h1>
            )}

            <button
                onClick={() => {
                    reset();
                    console.log("button cancels");
                    console.log(deleteDraft());
                    navigate("/list");
                }}
            >
                Отмена
            </button>

            {step === 1 && (
                <form>
                    <label>Название</label>
                    <input {...register("name")} type="text" />
                    <p>{errors.name?.message}</p>
                    <label>Описание</label>
                    <textarea {...register("description")} />
                    <p>{errors.description?.message}</p>
                    <label>Локация</label>
                    <input {...register("location")} type="text" />
                    <p>{errors.location?.message}</p>
                    <label>Фото</label>
                    <div className={formStyles.preview}>
                        <input
                            id={"imageInput"}
                            {...register("photo")}
                            type="file"
                            accept="image/*"
                        />
                        <label htmlFor="imageInput">
                            {photoState === "" ? (
                                "+"
                            ) : (
                                <>
                                    <Image
                                        className={formStyles.image}
                                        width={100}
                                        height={100}
                                        src={photoState}
                                        onClick={(e) => e.preventDefault()}
                                        preview={{
                                            src: photoState,
                                        }}
                                    />
                                    <CloseOutlined
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPhotoState("");
                                        }}
                                        className={
                                            formStyles.preview__deleteIcon
                                        }
                                    />
                                </>
                            )}
                        </label>
                    </div>
                    <p>{errors.photo?.message}</p>

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
                            if (isValid) setStep(2);
                        }}
                    >
                        Далее
                    </button>
                </form>
            )}

            {step === 2 && (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={formStyles.Form}
                >
                    {selectedType === AdType.RealEstate && (
                        <>
                            <label>Тип недвижимости</label>
                            <select {...register("propertyType")}>
                                <option value="">{""}</option>
                                <option value="Квартира">Квартира</option>
                                <option value="Дом">Дом</option>
                                <option value="Коттедж">Коттедж</option>
                            </select>
                            <p>{realEstateErrors.propertyType?.message}</p>

                            <label>Площадь</label>
                            <input {...register("area")} type="number" />
                            <p>{realEstateErrors.area?.message}</p>

                            <label>Количество комнат</label>
                            <input {...register("rooms")} type="number" />
                            <p>{realEstateErrors.rooms?.message}</p>

                            <label>Цена</label>
                            <input {...register("price")} type="number" />
                            <p>{realEstateErrors.price?.message}</p>
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
                            <p>{carErrors.brand?.message}</p>

                            <label>Модель</label>
                            <input {...register("model")} />
                            <p>{carErrors.model?.message}</p>

                            <label>Год выпуска</label>
                            <input {...register("year")} type="number" />
                            <p>{carErrors.year?.message}</p>

                            <label>Пробег</label>
                            <input {...register("mileage")} type="number" />
                            <p>{carErrors.mileage?.message}</p>
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
                            <p>{serviceErrors.serviceType?.message}</p>

                            <label>Опыт работы</label>
                            <input {...register("experience")} type="number" />
                            <p>{serviceErrors.experience?.message}</p>

                            <label>Стоимость</label>
                            <input {...register("cost")} type="number" />
                            <p>{serviceErrors.cost?.message}</p>
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
