import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { List } from "./pages/List.tsx";
import "./styles/global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient.ts";
import { Form } from "./pages/form/Form.tsx";
import { ItemDetailed } from "./pages/ItemDetailed.tsx";

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={"/list"} replace />} />
                <Route path="/list/" element={<List />} />
                <Route path="/form/" element={<Form />} />
                <Route path="/item/:id" element={<ItemDetailed />} />
            </Routes>
        </BrowserRouter>
    </QueryClientProvider>,
);
