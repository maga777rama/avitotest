export enum AdType {
    RealEstate = "Недвижимость",
    Car = "Авто",
    Service = "Услуги",
}

export interface Default {
    name?: string;
    description?: string;
    location?: string;
    photo?: string;
    type?: AdType;
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
}

export interface FormData1 {
    name: string;
    description: string;
    location: string;
    photo: string | File;
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
}

export interface FormData2 extends FormData1 {
    id: number;
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
