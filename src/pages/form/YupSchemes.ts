// import * as yup from "yup";
//
// interface MainFormValues {
//     name: string;
//     description: string;
//     location: string;
//     type: string;
// }
//
// export const schemaMain = yup.object({
//     name: yup.string().required("Обязательное поле"),
//     description: yup.string().required("Обязательное поле"),
//     location: yup.string().required("Обязательное поле"),
//     type: yup.string().required("Обязательное поле"),
// });
//
// export const schemaRealEstate = yup.object({
//     propertyType: yup.string().required("Обязательное поле"),
//     area: yup
//         .number()
//         .required("Площадь обязательна")
//         .positive("Площадь должна быть больше 0"),
//     rooms: yup
//         .number()
//         .required("Количество комнат обязательно")
//         .min(1, "Должно быть хотя бы 1 комната"),
//     price: yup
//         .number()
//         .required("Цена обязательна")
//         .positive("Цена должна быть больше 0"),
// });
//
// export const schemaAuto = yup.object({
//     brand: yup.string().required("Марка обязательна"),
//     model: yup.string().required("Модель обязательна"),
//     year: yup
//         .number()
//         .required("Год обязательный")
//         .min(1900, "Год выпуска не может быть раньше 1900"),
//     mileage: yup
//         .number()
//         .positive("Пробег не может быть отрицательным")
//         .optional(),
// });
//
// export const schemaService = yup.object({
//     serviceType: yup.string().required("Тип услуги обязательный"),
//     experience: yup
//         .number()
//         .required("Опыт обязателен")
//         .min(0, "Опыт не может быть меньше 0 лет"),
//     cost: yup
//         .number()
//         .required("Стоимость обязательна")
//         .positive("Стоимость должна быть больше 0"),
//     workSchedule: yup.string().optional(),
// });

import * as yup from "yup";
import { AdType } from "./types";

export const schemaMain = yup.object({
    name: yup.string().required("Название обязательно"),
    description: yup.string().required("Описание обязательно"),
    location: yup.string().required("Локация обязательна"),
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
