import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Input } from "antd";
import { getData } from "../../api/api.ts";
import { usePaginationStore } from "../../stores/paginationStore.ts";
import { useSearchStore } from "../../stores/searchStore.ts";
import { ItemBlock } from "./components/ItemBlock.tsx";
import { FullFormDataWithId } from "../form/types.ts";
import { Pagination } from "./components/pagination.tsx";
import { CategoryFilterType } from "./types.ts";
import { CategoryFilter } from "./components/categoryFilter.tsx";
import styles from "./styles.module.scss";
import { queryClient } from "../../api/queryClient.ts";

export const List = () => {
    const currentPage = usePaginationStore((state) => state.page);
    const { searchText, setSearchText } = useSearchStore();
    const [debouncedSearchText] = useDebounce(searchText, 800);
    const setPage = usePaginationStore((state) => state.setPage);
    const [categoryFilter, setCategoryFilter] =
        useState<CategoryFilterType>(null);

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ["items"] });
    }, [queryClient]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearchText, setPage]);

    const { data, error, isLoading } = useQuery({
        queryKey: ["items"],
        queryFn: getData,
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Возникла ошибка при загрузке данных</div>;
    }

    let filteredData = data;

    // Фильтрация по поиску
    if (debouncedSearchText !== "") {
        filteredData = filteredData.filter((item: FullFormDataWithId) =>
            item.name.toLowerCase().includes(debouncedSearchText.toLowerCase()),
        );
    }

    if (categoryFilter) {
        filteredData = filteredData.filter((item: FullFormDataWithId) =>
            Object.entries(categoryFilter).every(([key, value]) =>
                key in item
                    ? item[key as keyof FullFormDataWithId] === value
                    : true,
            ),
        );
    }

    const lastIndex = 5 * currentPage;
    const firstIndex = lastIndex - 5;
    const slicedData = filteredData.slice(firstIndex, lastIndex);

    return (
        <main className={styles.List}>
            <Input
                className={` ${location.href !== "/" && "invisible"}`}
                placeholder="Поиск"
                style={{
                    maxWidth: "500px",
                    fontSize: "17px",
                    margin: "0 20px 0 20px",
                    fontWeight: 500,
                }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />

            <div className={styles.List__content}>
                <div className={styles.List__items}>
                    <Link
                        to={"/form"}
                        className={`${styles.LinkReact} ${styles.List__placeAdButton}`}
                    >
                        Разместить объявление
                    </Link>
                    {data.length !== 0 ? (
                        (filteredData.length > 5
                            ? slicedData
                            : filteredData
                        ).map((item: FullFormDataWithId) => (
                            <ItemBlock key={item.id} {...item} />
                        ))
                    ) : (
                        <div className={styles.List__empty}>
                            Нет объявлений(
                        </div>
                    )}
                </div>
                <div>
                    <h2>Фильтры</h2>
                    <CategoryFilter onFilterChange={setCategoryFilter} />
                </div>
            </div>

            {filteredData.length > 5 && (
                <Pagination count={filteredData.length} />
            )}
        </main>
    );
};
