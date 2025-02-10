// Общий интерфейс для всех объявлений
export interface BaseItem {
    id: number;
    name: string;
    description: string;
    location: string;
    photo: string;
    type: "Недвижимость" | "Авто" | "Услуги";
}

// Интерфейс для недвижимости
export interface RealEstateItem extends BaseItem {
    type: "Недвижимость";
    propertyType: string;
    area: number;
    rooms: number;
    price: number;
}

// Интерфейс для автомобилей
export interface AutoItem extends BaseItem {
    type: "Авто";
    brand: string;
    model: string;
    year: number;
    mileage?: number;
}

// Интерфейс для услуг
export interface ServiceItem extends BaseItem {
    type: "Услуги";
    serviceType: string;
    experience: number;
    cost: number;
    schedule?: string; // График работы необязательный
}

// Универсальный тип для объявления (объединяет все варианты)
export type Item = RealEstateItem | AutoItem | ServiceItem;

// Интерфейс для структуры JSON-файла
export interface DataResponse {
    data: Item[];
}
