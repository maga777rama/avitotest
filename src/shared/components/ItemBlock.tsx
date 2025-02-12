import styles from "../../styles/styles.module.scss";
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
            <img src={photo} alt={`${name}__image`} />
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
