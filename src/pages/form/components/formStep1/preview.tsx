import { CloseOutlined } from "@ant-design/icons";
import { Image } from "antd";
import styles from "../../styles.module.scss";
import { IPreviewProps } from "./types.ts";
import { deletePhoto } from "../../../../api/api.ts";

export const Preview = ({
    register,
    photoState,
    setPhotoState,
}: IPreviewProps) => {
    return (
        <div className={styles.preview}>
            <input
                id={"imageInput"}
                {...register("photo")}
                type="file"
                accept="image/*"
            />
            <label htmlFor="imageInput">
                {photoState === "" ? (
                    "+"
                ) : (
                    <>
                        <Image
                            className={styles.preview__img}
                            width={100}
                            height={100}
                            src={photoState}
                            onClick={(e) => e.preventDefault()}
                            preview={{
                                src: photoState,
                            }}
                        />
                        <CloseOutlined
                            onClick={(e) => {
                                e.preventDefault();
                                console.log(deletePhoto(photoState));
                                setPhotoState("");
                            }}
                            className={styles.preview__deleteIcon}
                        />
                    </>
                )}
            </label>
        </div>
    );
};
