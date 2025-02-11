import { ItemBlock } from "../shared/components/ItemBlock.tsx";
import { Pagination } from "../shared/components/pagination.tsx";
import { usePaginationStore } from "../stores/paginationStore.ts";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../api/api.ts";
import { Item } from "../types/types.ts";
import { Link } from "react-router-dom";
import { CompleteServer } from "../../server/CompletionServer.ts";

export const List = () => {
    const currentPage = usePaginationStore((state) => state.page);

    const { data, error, isLoading } = useQuery({
        queryKey: ["ite"],
        queryFn: getData,
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Пиздец</div>;
    }

    const lastIndex = 5 * currentPage;
    const firstIndex = lastIndex - 5;
    const slicesData = data.slice(firstIndex, lastIndex);
    console.log(slicesData);

    return (
        <main>
            <Link to={"/form"}>Разместить объявление</Link>
            <div>
                {slicesData.map((item: Item) => (
                    <ItemBlock
                        key={item.id}
                        name={item.name}
                        photo={item.photo}
                        description={item.description}
                        location={item.location}
                    />
                ))}
            </div>
            <Pagination count={data.length} />

            <div>
                <button onClick={CompleteServer}>
                    ДОБАВИТЬ ТЕСТОВЫЕ ДАННЫЕ
                </button>
            </div>
        </main>
    );
};
