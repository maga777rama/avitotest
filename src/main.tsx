import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { List } from "./pages/List.tsx";
import "./styles/global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient.ts";

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Routes>
                <Route path="/list/" element={<List />} />
            </Routes>
        </BrowserRouter>
    </QueryClientProvider>,
);
