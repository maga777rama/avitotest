export const GetFormData = (photoUrl: string, data: any) => {
    return { ...data, photo: photoUrl };
};
