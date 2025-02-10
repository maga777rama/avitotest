import styles from "../../styles/styles.module.scss";

export interface IPropsItemBlock {
    name: string;
    photo: string;
    description: string;
    location: string;
}

export const ItemBlock = ({
    name,
    photo,
    description,
    location,
}: IPropsItemBlock) => {
    return (
        <div className={styles.item}>
            <img src={photo} alt={`${name}__image`} />
            <div>
                <h1>{name}</h1>
                <p>{description}</p>
                <p>{location}</p>
            </div>
        </div>
    );
};
