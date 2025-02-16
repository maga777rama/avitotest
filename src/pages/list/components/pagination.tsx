import { ConfigProvider } from "antd";
import { Pagination as AntPagination } from "antd";
import { usePaginationStore } from "../../../stores/paginationStore.ts";

export const Pagination = ({ count }: { count: number }) => {
    const page = usePaginationStore((state) => state.page);
    const setPage = usePaginationStore((state) => state.setPage);
    return (
        <nav
            aria-label="pagination"
            className={"flex justify-center items-center  h-10 w-full "}
        >
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "rgb(39, 43, 51)",
                        borderRadius: 2,
                    },
                }}
            >
                <AntPagination
                    current={page}
                    defaultPageSize={5}
                    total={count}
                    showSizeChanger={false}
                    onChange={(newPage: number) => setPage(newPage)}
                />
            </ConfigProvider>
        </nav>
    );
};
