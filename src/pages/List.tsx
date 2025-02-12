import { ItemBlock } from "../shared/components/ItemBlock.tsx";
import { Pagination } from "../shared/components/pagination.tsx";
import { usePaginationStore } from "../stores/paginationStore.ts";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../api/api.ts";
import { Item } from "../types/types.ts";
import { Link } from "react-router-dom";
import { CompleteServer } from "../../server/CompletionServer.ts";
import { useSearchStore } from "../stores/searchStore.ts";
import { useDebounce } from "use-debounce";
import { useEffect } from "react";
import { FormData2 } from "./form/types.ts";
import styles from "../styles/styles.module.scss";
import { Filtering } from "../shared/components/filtering.tsx";

export const List = () => {
    const currentPage = usePaginationStore((state) => state.page);
    const { searchText } = useSearchStore();
    const [debouncedSearchText] = useDebounce(searchText, 800);
    const setPage = usePaginationStore((state) => state.setPage);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearchText, setPage]);

    const { data, error, isLoading } = useQuery({
        queryKey: ["ite"],
        queryFn: getData,
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Возникла ошибка при загрузке данных</div>;
    }

    // TODO
    // исправить логику пагинации и поиска
    // работает,но по ублюдски
    let data1 = null;

    if (debouncedSearchText !== "") {
        data1 = data.filter((item: FormData2) =>
            item.name.toLowerCase().includes(debouncedSearchText.toLowerCase()),
        );
    } else {
        data1 = data;
    }

    const lastIndex = 5 * currentPage;
    const firstIndex = lastIndex - 5;
    const slicesData = data1.slice(firstIndex, lastIndex);

    return (
        <main className={styles.List}>
            <Link
                to={"/form"}
                className={`${styles.LinkReact} ${styles.List__placeAdButton}`}
            >
                Разместить объявление
            </Link>
            <div className={styles.List__content}>
                <div className={styles.List__items}>
                    {slicesData.map((item: Item) => (
                        <ItemBlock
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            photo={item.photo}
                            location={item.location}
                            type={item.type}
                        />
                    ))}
                </div>
                <Filtering />
            </div>

            {data.length > 5 && <Pagination count={data.length} />}

            <div>
                <button onClick={CompleteServer}>
                    ДОБАВИТЬ ТЕСТОВЫЕ ДАННЫЕ
                </button>
            </div>
        </main>
    );
};
