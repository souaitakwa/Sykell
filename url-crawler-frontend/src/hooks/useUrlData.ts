import { useEffect, useState } from "react";
import api from "../utils/axios";
import type { UrlData } from "../types/UrlData";

export default function useUrlData(): { urls: UrlData[]; refetch: () => Promise<void> } {
    const [urls, setUrls] = useState<UrlData[]>([]);

    const fetchData = async () => {
        try {
            const response = await api.get("/urls");
            if (Array.isArray(response.data)) {
                setUrls(response.data);
            } else {
                console.error("Unexpected API response:", response.data);
                setUrls([]);
            }
        } catch (err) {
            console.error("Error fetching URLs:", err);
            setUrls([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { urls, refetch: fetchData };
}
