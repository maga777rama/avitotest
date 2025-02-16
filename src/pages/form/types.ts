export enum AdType {
    RealEstate = "Недвижимость",
    Car = "Авто",
    Service = "Услуги",
}

export interface BaseFormData {
    name: string;
    description: string;
    location: string;
    photo: string;
    type: AdType;
}

export interface RealEstateData {
    type: AdType.RealEstate;
    propertyType: string;
    area: number;
    rooms: number;
    price: number;
}

export interface CarData {
    type: AdType.Car;
    brand: string;
    model: string;
    year: number;
    mileage: number;
}

export interface ServiceData {
    type: AdType.Service;
    serviceType: string;
    experience: number;
    cost: number;
    workSchedule: string;
}

export type FullFormData = BaseFormData &
    (RealEstateData | CarData | ServiceData);

export type FullFormDataWithId = FullFormData & { id: number };
