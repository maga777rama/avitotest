export enum AdType {
    RealEstate = "Недвижимость",
    Car = "Авто",
    Service = "Услуги",
}

// export enum AdType {
//     RealEstate = "Недвижимость",
//     Car = "Авто",
//     Service = "Услуги",
// }
//
// export interface BaseAd {
//     name: string;
//     description: string;
//     location: string;
//     type: AdType;
// }
//
// export interface RealEstateAd extends BaseAd {
//     type: AdType.RealEstate;
//     propertyType: string;
//     area: number;
//     rooms: number;
//     price: number;
// }
//
// export interface CarAd extends BaseAd {
//     type: AdType.Car;
//     brand: string;
//     model: string;
//     year: number;
//     mileage?: number;
// }
//
// export interface ServiceAd extends BaseAd {
//     type: AdType.Service;
//     serviceType: string;
//     experience: number;
//     cost: number;
//     workSchedule?: string;
// }
//
// export type FormInput = CarAd | ServiceAd | RealEstateAd;
//
// //
// //
// // interface IMain {
// //     name: string;
// //     description: string;
// //     location: string;
// //     type: AdType;
// // }
// // interface IRealSt {
// //     propertyType?: string;
// //     area: number;
// //     rooms: number;
// //     price: number;
// // }
// // interface IAuto {
// //     brand: string;
// //     model: string;
// //     year: number;
// //     mileage?: number;
// // }
// // interface IService {
// //     serviceType: string;
// //     experience: number;
// //     cost: number;
// //     workSchedule?: string;
// // }
