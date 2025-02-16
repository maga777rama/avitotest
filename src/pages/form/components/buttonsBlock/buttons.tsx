import { IButtonsProps } from "./types.ts";
import { useNavigate } from "react-router-dom";
import styles from "../../styles.module.scss";
import { deleteDraft, deletePhoto } from "../../../../api/api.ts";

export const Buttons = ({
    step,
    setStep,
    trigger,
    reset,
    photo,
    message,
}: IButtonsProps) => {
    const navigate = useNavigate();

    return (
        <div className={styles.buttons}>
            {step === 1 && (
                <button
                    type="button"
                    onClick={async () => {
                        const isValid = await trigger([
                            "name",
                            "description",
                            "location",
                            "type",
                        ]);
                        if (isValid) setStep(2);
                    }}
                    className={styles.buttons__next}
                >
                    Далее
                </button>
            )}

            {step === 2 && (
                <>
                    <button
                        form={"formStep2"}
                        type="submit"
                        value="Разместить"
                        className={styles.buttons__submit}
                    >
                        Разместить
                    </button>
                    <button type="button" onClick={() => setStep(1)}>
                        Назад
                    </button>
                </>
            )}
            <button
                onClick={() => {
                    reset();
                    if (message === undefined) {
                        console.log(message);
                        deletePhoto(photo);
                    }
                    deleteDraft();
                    navigate(
                        message === undefined ? "/list" : `/item/${message}`,
                    );
                }}
                className={styles.buttons__cansel}
            >
                Отмена
            </button>
        </div>
    );
};
