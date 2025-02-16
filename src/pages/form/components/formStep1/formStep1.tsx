import { Preview } from "./preview.tsx";
import { IForm1Props } from "./types.ts";
import { AdType } from "../../types.ts";

export const FormStep1 = ({
    register,
    errors,
    photoState,
    setPhotoState,
}: IForm1Props) => {
    return (
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
            <Preview
                register={register}
                photoState={photoState}
                setPhotoState={setPhotoState}
            />
            <p>{errors.photo?.message}</p>

            <label>Тип объявления</label>
            <select {...register("type")}>
                <option value="">{""}</option>
                <option value={AdType.RealEstate}>{AdType.RealEstate}</option>
                <option value={AdType.Car}>{AdType.Car}</option>
                <option value={AdType.Service}>{AdType.Service}</option>
            </select>
            <p>{errors.type?.message}</p>
        </form>
    );
};
