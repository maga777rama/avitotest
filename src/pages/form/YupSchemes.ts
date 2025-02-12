import * as yup from "yup";
import { AdType } from "./types";

export const schemaMain = yup.object({
    name: yup
        .string()
        .required("Название обязательно")
        .max(30, "Максимальное число символов - 30"),
    description: yup.string().required("Описание обязательно"),
    location: yup.string().required("Локация обязательна"),
    photo: yup.mixed().notRequired(),
    type: yup
        .string()
        .oneOf(Object.values(AdType), "Выберите корректную категорию")
        .required("Категория обязательна"),
});

export const schemaRealEstate = schemaMain.concat(
    yup.object({
        propertyType: yup.string().required("Выберите тип недвижимости"),
        area: yup
            .number()
            .typeError("Площадь должна быть числом")
            .positive("Площадь должна быть больше 0")
            .required("Площадь обязательна"),
        rooms: yup
            .number()
            .typeError("Количество комнат должно быть числом")
            .integer("Количество комнат должно быть целым числом")
            .positive("Количество комнат должно быть больше 0")
            .required("Количество комнат обязательно"),
        price: yup
            .number()
            .typeError("Цена должна быть числом")
            .positive("Цена должна быть больше 0")
            .required("Цена обязательна"),
    }),
);

export const schemaAuto = schemaMain.concat(
    yup.object({
        brand: yup.string().required("Выберите марку"),
        model: yup.string().required("Введите модель"),
        year: yup
            .number()
            .typeError("Год выпуска должен быть числом")
            .integer("Год выпуска должен быть целым числом")
            .min(1900, "Год выпуска не может быть меньше 1900")
            .max(
                new Date().getFullYear(),
                "Год выпуска не может быть больше текущего",
            )
            .required("Год выпуска обязателен"),
        mileage: yup
            .number()
            .typeError("Пробег должен быть числом")
            .positive("Пробег не может быть отрицательным")
            .nullable(),
    }),
);

export const schemaService = schemaMain.concat(
    yup.object({
        serviceType: yup.string().required("Выберите тип услуги"),
        experience: yup
            .number()
            .typeError("Опыт работы должен быть числом")
            .integer("Опыт работы должен быть целым числом")
            .positive("Опыт работы должен быть больше 0")
            .required("Опыт работы обязателен"),
        cost: yup
            .number()
            .typeError("Стоимость должна быть числом")
            .positive("Стоимость должна быть больше 0")
            .required("Стоимость обязательна"),
        workSchedule: yup.string().nullable(),
    }),
);
