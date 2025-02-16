import { AdType } from "../form/types";

export interface RealEstateFilter {
    type: AdType.RealEstate;
    propertyType?: string;
    area?: number;
    rooms?: number;
    price?: number;
}

export interface CarFilter {
    type: AdType.Car;
    brand?: string;
    model?: string;
    year?: number;
    mileage?: number;
}

export interface ServiceFilter {
    type: AdType.Service;
    serviceType?: string;
    experience?: number;
    cost?: number;
    workSchedule?: string;
}

// Общий тип фильтрации, который объединяет все возможные категории
export type CategoryFilterType =
    | RealEstateFilter
    | CarFilter
    | ServiceFilter
    | null;
