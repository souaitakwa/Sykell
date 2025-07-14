
import  { useState, useCallback } from "react";
import api from "../Api/api";
import { usePolling } from "../hooks/usePolling";
import DataTable from "../components/DataTable";
import type {UrlData} from "../types";

export default function Dashboard() {
  const [data, setData] = useState<UrlData[]>([]);
  const fetchUrls = useCallback(() => {
    api.get("/urls").then(res => setData(res.data));
  }, []);

  usePolling(fetchUrls, 5000);

  return <div>
    <h1>URL Dashboard</h1>
    <DataTable data={data}
      onBulkReRun={(ids) => ids.forEach(id => api.post(`/urls/${id}/re-run`))}
      onBulkDelete={(ids) => ids.forEach(id => api.delete(`/urls/${id}`))} />
  </div>;
}
