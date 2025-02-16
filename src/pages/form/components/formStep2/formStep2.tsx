import styles from "../../styles.module.scss";
import { AdType, CarData, RealEstateData, ServiceData } from "../../types.ts";
import { FieldErrors } from "react-hook-form";
import {
    deleteDraft,
    postCreateItem,
    updateDataById,
} from "../../../../api/api.ts";
import { GetFormData } from "../../hooks/getFormData.ts";
import { useNavigate } from "react-router-dom";
import { IForm2Props } from "./formStep2Types.ts";
import categoriesData from "../../../../assets/categories.json";

export const FormStep2 = ({
    errors,
    handleSubmit,
    reset,
    message,
    photoState,
    watch,
    register,
}: IForm2Props) => {
    const realEstateErrors = errors as FieldErrors<RealEstateData>;
    const carErrors = errors as FieldErrors<CarData>;
    const serviceErrors = errors as FieldErrors<ServiceData>;

    const navigate = useNavigate();
    const selectedType = watch("type");
    const currentFormData = watch();

    const onSubmit = () => {
        console.log(
            message === undefined
                ? postCreateItem(GetFormData(photoState, currentFormData))
                : updateDataById(
                      message,
                      GetFormData(photoState, currentFormData),
                  ),
        );
        console.log(deleteDraft());
        reset();
        navigate("/list");
    };

    return (
        <form
            id={"formStep2"}
            onSubmit={handleSubmit(onSubmit)}
            className={styles.Form}
        >
            {selectedType === AdType.RealEstate && (
                <>
                    <label>Тип недвижимости</label>
                    <select {...register("propertyType")}>
                        <option value="">Выберите</option>
                        {categoriesData.realEstateTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
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
                        <option value="">Выберите</option>
                        {categoriesData.carBrands.map((brand) => (
                            <option key={brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                    <p>{carErrors.brand?.message}</p>

                    <label>Модель</label>
                    <input {...register("model")} type="text" />
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
                        <option value="">Выберите</option>
                        {categoriesData.serviceTypes.map((service) => (
                            <option key={service} value={service}>
                                {service}
                            </option>
                        ))}
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
        </form>
    );
};
