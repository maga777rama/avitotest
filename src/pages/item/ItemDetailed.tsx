import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDataById, postCreateDraft } from "../../api/api.ts";
import styles from "./styles.module.scss";

export const ItemDetailed = () => {
    const params = useParams();
    const navigate = useNavigate();

    const { data, error, isLoading } = useQuery({
        queryKey: ["itemDetailed", { params }],
        queryFn: () => getDataById(Number(params.id)),
    });

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Произошла ошибка при загрузке данных</div>;
    }

    const handleClick = () => {
        (async () => {
            const item = await postCreateDraft(data);
            if (item) {
                navigate("/form", { state: { id: data.id } });
            }
        })();
    };

    const getYearLabel = (years: number) => {
        if (years % 10 === 1 && years % 100 !== 11) return "год";
        if (
            years % 10 >= 2 &&
            years % 10 <= 4 &&
            (years % 100 < 10 || years % 100 >= 20)
        )
            return "года";
        return "лет";
    };

    return (
        <main className={styles.container}>
            <Link to={"/list"} className={styles.LinkReact}>
                На главную
            </Link>
            <div className={styles.itemDetailed}>
                <div className={styles.headerTop}>
                    <span className={styles.name}>{data.name}</span>
                    <div className={styles.headerRight}>
                        {data.cost && (
                            <span className={styles.price}>{data.cost} ₽</span>
                        )}
                        <span className={styles.type}>{data.type}</span>
                    </div>
                </div>
                <img
                    src={
                        !data.photo
                            ? "http://localhost:3000/uploads/5af9a2365df92f907485e990846f99ff"
                            : data.photo
                    }
                    alt="image"
                    className={styles.largeImage}
                />
                <div className={styles.details}>
                    <p>Описание: {data.description}</p>
                    <p>Локация: {data.location}</p>
                    {data.propertyType && (
                        <p>Тип недвижимости: {data.propertyType}</p>
                    )}
                    {data.area && <p>Площадь: {data.area} м²</p>}
                    {data.rooms && <p>Комнат: {data.rooms}</p>}
                    {data.brand && <p>Бренд: {data.brand}</p>}
                    {data.model && <p>Модель: {data.model}</p>}
                    {data.year && <p>Год: {data.year}</p>}
                    {data.mileage && <p>Пробег: {data.mileage} км</p>}
                    {data.serviceType && <p>Тип услуги: {data.serviceType}</p>}
                    {data.experience && (
                        <p>
                            Опыт работы: {data.experience}{" "}
                            {getYearLabel(data.experience)}
                        </p>
                    )}

                    {data.workSchedule && (
                        <p>График работы: {data.workSchedule}</p>
                    )}
                </div>
                <button onClick={handleClick}>Редактировать</button>
            </div>
        </main>
    );
};
