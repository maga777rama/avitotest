import styles from "../styles.module.scss";
import { Link } from "react-router-dom";
export interface IPropsItemBlock {
    id: number;
    name: string;
    photo: string;
    location: string;
    type: string;
}

export const ItemBlock = ({
    id,
    name,
    photo,
    location,
    type,
}: IPropsItemBlock) => {
    return (
        <div className={styles.item}>
            <img
                src={
                    !photo
                        ? "http://localhost:3000/uploads/5af9a2365df92f907485e990846f99ff"
                        : photo
                }
                alt={`${name}__image`}
            />
            <div className={styles.item__info}>
                <h2>{name}</h2>
                <p>{type}</p>
                <p>{location}</p>
            </div>
            <Link to={`/item/${id}`} className={styles.LinkReact}>
                Открыть
            </Link>
        </div>
    );
};
