import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDataById, postDataToCrateAd } from "../api/api.ts";
import styles from "../styles/styles.module.scss";

export const ItemDetailed = () => {
    const params = useParams();
    const navigate = useNavigate();

    const { data, error, isLoading } = useQuery({
        queryKey: ["itemDetailed"],
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
            const item = await postDataToCrateAd(data, true);
            console.log(item);
        })();
        navigate("/form", { state: { id: data.id } });
    };

    console.log(data.photo);

    return (
        <main>
            <Link to={"/list"} className={styles.LinkReact}>
                На главную
            </Link>
            <div className={styles.itemDetailed}>
                <img src={data.photo} alt="image" />
                <div>
                    <p>Название {data.name}</p>
                    <p>Описание {data.description}</p>
                    <p>Локация {data.location}</p>
                    <p>Тип {data.type}</p>
                    {data.propertyType && <p>{data.propertyType}</p>}
                    {data.area && <p>{data.area}</p>}
                    {data.rooms && <p>{data.rooms}</p>}
                    {data.price && <p>{data.price}</p>}
                    {data.brand && <p>{data.brand}</p>}
                    {data.model && <p>{data.model}</p>}
                    {data.year && <p>{data.year}</p>}
                    {data.mileage && <p>{data.mileage}</p>}
                    {data.serviceType && <p>{data.serviceType}</p>}
                    {data.experience && <p>{data.experience}</p>}
                    {data.cost && <p>{data.cost}</p>}
                    {data.workSchedule && <p>{data.workSchedule}</p>}
                    <button onClick={handleClick}>РЕДАКТИРОВАТЬ</button>
                </div>
            </div>
        </main>
    );
};
